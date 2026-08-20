import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import * as schema from '../schema.js';
import { hashPassword } from './auth/password.js';
import { createUploadSessionStore, UploadSessionError } from './uploadSessions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createTestDb() {
  const sqlite = new Database(':memory:');
  sqlite.pragma('foreign_keys = ON');
  const db = drizzle(sqlite, { schema });
  migrate(db, { migrationsFolder: path.join(__dirname, '..', 'migrations') });
  const user = db.insert(schema.users).values({
    username: 'editor',
    passwordHash: hashPassword('secret'),
    role: 'editor',
    permissions: ['upload_rti'],
  }).returning({ id: schema.users.id }).get();
  return { db, userId: user.id };
}

describe('upload sessions', () => {
  let uploadDir = '';

  beforeEach(async () => {
    uploadDir = await fs.mkdtemp(path.join(os.tmpdir(), 'rti-upload-'));
  });

  afterEach(async () => {
    await fs.rm(uploadDir, { recursive: true, force: true });
  });

  it('appends chunks and treats a full retry as idempotent', async () => {
    const { db, userId } = createTestDb();
    const store = createUploadSessionStore(db, schema, uploadDir, 64 * 1024);
    const session = await store.createSession({
      userId,
      field: 'file',
      originalName: 'seal.ptm',
      sizeBytes: 8,
    });

    const first = Buffer.from('abcd');
    const second = Buffer.from('efgh');
    await store.writeChunk(session.sessionId, userId, 0, first);
    const afterRetry = await store.writeChunk(session.sessionId, userId, 0, first);
    expect(afterRetry.offset).toBe(4);
    const done = await store.writeChunk(session.sessionId, userId, 4, second);
    expect(done.offset).toBe(8);

    const finalized = await store.finalizeSession(session.sessionId, userId);
    expect(finalized.status).toBe('complete');
    expect(await fs.readFile(finalized.finalPath!, 'utf8')).toBe('abcdefgh');
  });

  it('rejects a gap and reports the resume offset', async () => {
    const { db, userId } = createTestDb();
    const store = createUploadSessionStore(db, schema, uploadDir, 64 * 1024);
    const session = await store.createSession({
      userId,
      field: 'file',
      originalName: 'seal.ptm',
      sizeBytes: 8,
    });
    await store.writeChunk(session.sessionId, userId, 0, Buffer.from('abcd'));

    try {
      await store.writeChunk(session.sessionId, userId, 6, Buffer.from('gh'));
      throw new Error('expected gap error');
    } catch (err) {
      expect(err).toBeInstanceOf(UploadSessionError);
      expect((err as UploadSessionError).status).toBe(409);
      expect((err as UploadSessionError).extra.offset).toBe(4);
    }
  });

  it('refuses to complete a partial upload', async () => {
    const { db, userId } = createTestDb();
    const store = createUploadSessionStore(db, schema, uploadDir, 64 * 1024);
    const session = await store.createSession({
      userId,
      field: 'file',
      originalName: 'seal.ptm',
      sizeBytes: 8,
    });
    await store.writeChunk(session.sessionId, userId, 0, Buffer.from('abcd'));

    await expect(store.finalizeSession(session.sessionId, userId)).rejects.toMatchObject({
      status: 409,
      extra: { offset: 4, sizeBytes: 8 },
    });
  });

  it('aborts and deletes the temp file', async () => {
    const { db, userId } = createTestDb();
    const store = createUploadSessionStore(db, schema, uploadDir, 64 * 1024);
    const session = await store.createSession({
      userId,
      field: 'file',
      originalName: 'seal.ptm',
      sizeBytes: 4,
    });
    const row = store.getOwned(session.sessionId, userId);
    expect(await fs.stat(row.tempPath)).toBeTruthy();
    await store.abortSession(session.sessionId, userId);
    await expect(fs.stat(row.tempPath)).rejects.toThrow();
  });
});
