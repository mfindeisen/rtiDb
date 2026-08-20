import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import { and, eq, lt } from 'drizzle-orm';
import {
  UPLOAD_CHUNK_SIZE_BYTES,
  UPLOAD_FIELDS,
  UPLOAD_MAX_CHUNK_SIZE_BYTES,
  UPLOAD_SESSION_TTL_MS,
  type UploadFieldName,
  type UploadSession,
} from '@rtidb/shared/api/uploads';
import { sanitizeUploadFilename } from './uploads.js';
import type { AppDb, AppSchema } from '../types/index.js';

export class UploadSessionError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly extra: Record<string, unknown> = {},
  ) {
    super(message);
    this.name = 'UploadSessionError';
  }
}

export interface UploadSessionRow {
  id: string;
  userId: number;
  field: string;
  originalName: string;
  sizeBytes: number;
  receivedBytes: number;
  tempPath: string;
  finalPath: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

function nowIso(): string {
  return new Date().toISOString();
}

function incomingDir(uploadDir: string): string {
  return path.join(uploadDir, 'incoming');
}

function isUploadField(value: string): value is UploadFieldName {
  return (UPLOAD_FIELDS as readonly string[]).includes(value);
}

function toPublic(row: UploadSessionRow): UploadSession {
  return {
    sessionId: row.id,
    field: row.field as UploadFieldName,
    originalName: row.originalName,
    sizeBytes: row.sizeBytes,
    offset: row.receivedBytes,
    status: row.status as UploadSession['status'],
    chunkSize: UPLOAD_CHUNK_SIZE_BYTES,
  };
}

export function createUploadSessionStore(
  db: AppDb,
  schema: AppSchema,
  uploadDir: string,
  maxFileBytes: number,
) {
  const { uploadSessions } = schema;

  function getOwned(sessionId: string, userId: number): UploadSessionRow {
    const row = db.select().from(uploadSessions).where(eq(uploadSessions.id, sessionId)).get();
    if (!row || row.userId !== userId) {
      throw new UploadSessionError(404, 'Upload session not found');
    }
    return row;
  }

  async function createSession(input: {
    userId: number;
    field: string;
    originalName: string;
    sizeBytes: number;
  }): Promise<UploadSession> {
    if (!isUploadField(input.field)) {
      throw new UploadSessionError(400, 'field must be file, latentMap, or weights');
    }
    const sizeBytes = Number(input.sizeBytes);
    if (!Number.isInteger(sizeBytes) || sizeBytes <= 0) {
      throw new UploadSessionError(400, 'sizeBytes must be a positive integer');
    }
    if (sizeBytes > maxFileBytes) {
      throw new UploadSessionError(413, 'File exceeds the upload size limit');
    }

    const id = crypto.randomBytes(16).toString('hex');
    const originalName = sanitizeUploadFilename(input.originalName);
    await fs.mkdir(incomingDir(uploadDir), { recursive: true });
    const tempPath = path.join(incomingDir(uploadDir), `${id}.part`);
    await fs.writeFile(tempPath, Buffer.alloc(0));

    const createdAt = nowIso();
    db.insert(uploadSessions).values({
      id,
      userId: input.userId,
      field: input.field,
      originalName,
      sizeBytes,
      receivedBytes: 0,
      tempPath,
      status: 'receiving',
      createdAt,
      updatedAt: createdAt,
    }).run();

    return toPublic(getOwned(id, input.userId));
  }

  function getSession(sessionId: string, userId: number): UploadSession {
    return toPublic(getOwned(sessionId, userId));
  }

  async function writeChunk(sessionId: string, userId: number, offset: number, chunk: Buffer): Promise<UploadSession> {
    const row = getOwned(sessionId, userId);
    if (row.status !== 'receiving') {
      throw new UploadSessionError(409, 'Upload session is no longer receiving data', { offset: row.receivedBytes });
    }
    if (!Number.isInteger(offset) || offset < 0) {
      throw new UploadSessionError(400, 'X-Upload-Offset must be a non-negative integer');
    }
    if (chunk.length === 0) {
      throw new UploadSessionError(400, 'Empty chunk');
    }
    if (chunk.length > UPLOAD_MAX_CHUNK_SIZE_BYTES) {
      throw new UploadSessionError(413, 'Chunk exceeds the maximum size');
    }
    if (offset + chunk.length > row.sizeBytes) {
      throw new UploadSessionError(400, 'Chunk extends past the declared file size');
    }

    if (offset < row.receivedBytes) {
      if (offset + chunk.length <= row.receivedBytes) {
        return toPublic(row);
      }
      throw new UploadSessionError(409, 'Chunk overlaps received data; resume from offset', {
        offset: row.receivedBytes,
      });
    }
    if (offset > row.receivedBytes) {
      throw new UploadSessionError(409, 'Gap in upload; resume from offset', { offset: row.receivedBytes });
    }

    const fh = await fs.open(row.tempPath, 'r+');
    try {
      await fh.write(chunk, 0, chunk.length, offset);
    } finally {
      await fh.close();
    }

    const receivedBytes = offset + chunk.length;
    db.update(uploadSessions)
      .set({ receivedBytes, updatedAt: nowIso() })
      .where(and(eq(uploadSessions.id, sessionId), eq(uploadSessions.userId, userId)))
      .run();

    return toPublic(getOwned(sessionId, userId));
  }

  async function abortSession(sessionId: string, userId: number): Promise<void> {
    const row = getOwned(sessionId, userId);
    await fs.unlink(row.tempPath).catch(() => {});
    if (row.finalPath) {
      await fs.unlink(row.finalPath).catch(() => {});
    }
    db.update(uploadSessions)
      .set({ status: 'aborted', updatedAt: nowIso() })
      .where(eq(uploadSessions.id, sessionId))
      .run();
  }

  async function finalizeSession(sessionId: string, userId: number): Promise<UploadSessionRow> {
    const row = getOwned(sessionId, userId);
    if (row.status === 'complete' && row.finalPath) {
      return row;
    }
    if (row.status !== 'receiving') {
      throw new UploadSessionError(409, 'Upload session is not ready to complete', { offset: row.receivedBytes });
    }
    if (row.receivedBytes !== row.sizeBytes) {
      throw new UploadSessionError(409, 'Upload is incomplete', { offset: row.receivedBytes, sizeBytes: row.sizeBytes });
    }

    const finalPath = path.join(
      uploadDir,
      `${Date.now()}-${row.id.slice(0, 8)}-${sanitizeUploadFilename(row.originalName)}`,
    );
    await fs.rename(row.tempPath, finalPath);
    db.update(uploadSessions)
      .set({ status: 'complete', finalPath, updatedAt: nowIso() })
      .where(eq(uploadSessions.id, sessionId))
      .run();
    return getOwned(sessionId, userId);
  }

  async function sweepExpired(): Promise<void> {
    const cutoff = new Date(Date.now() - UPLOAD_SESSION_TTL_MS).toISOString();
    const stale = db.select()
      .from(uploadSessions)
      .where(and(eq(uploadSessions.status, 'receiving'), lt(uploadSessions.updatedAt, cutoff)))
      .all();

    for (const row of stale) {
      await fs.unlink(row.tempPath).catch(() => {});
      db.update(uploadSessions)
        .set({ status: 'aborted', updatedAt: nowIso() })
        .where(eq(uploadSessions.id, row.id))
        .run();
    }
  }

  return {
    createSession,
    getSession,
    writeChunk,
    abortSession,
    finalizeSession,
    sweepExpired,
    getOwned,
  };
}

export type UploadSessionStore = ReturnType<typeof createUploadSessionStore>;
