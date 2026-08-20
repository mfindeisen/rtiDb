import express, { type Express, type Request, type Response } from 'express';
import {
  UPLOAD_MAX_CHUNK_SIZE_BYTES,
  type CompleteUploadRequest,
} from '@rtidb/shared/api/uploads';
import { createUploadSessionStore, UploadSessionError } from '../lib/uploadSessions.js';
import { isPngLatentMap, isParsedUploadError, type ParsedUploadFiles, type ParsedUploadFilesError } from '../lib/processingPipeline.js';
import { handleRtiUpload, validateRecordForUpload } from '../lib/rtiUploadHandler.js';
import { normalizeMetadata } from '../lib/metadataFields.js';
import { schemaForRecordTypeId } from '../lib/catalog.js';
import { resolveRecordFromParam } from '../lib/slug.js';
import { asyncHandler, sendError } from '../lib/httpErrors.js';
import type { ServerContext } from '../types/index.js';

function sendSessionError(res: Response, err: unknown): boolean {
  if (!(err instanceof UploadSessionError)) return false;
  res.status(err.status).json({ error: err.message, ...err.extra });
  return true;
}

function parseOffsetHeader(req: Request): number {
  const raw = req.header('x-upload-offset');
  if (raw == null || raw === '') return Number.NaN;
  return Number.parseInt(raw, 10);
}

async function filesFromSessions(
  store: ReturnType<typeof createUploadSessionStore>,
  userId: number,
  body: CompleteUploadRequest,
): Promise<ParsedUploadFiles | ParsedUploadFilesError> {
  const isNeural = body.uploadMode === 'neural';
  if (isNeural) {
    if (!body.latentMapSessionId || !body.weightsSessionId) {
      return { error: 'Both latentMap and weights upload sessions are required for Neural RTI.' };
    }
    const latentRow = store.getOwned(body.latentMapSessionId, userId);
    const weightsRow = store.getOwned(body.weightsSessionId, userId);
    if (latentRow.field !== 'latentMap' || weightsRow.field !== 'weights') {
      return { error: 'Neural upload sessions do not match latentMap and weights fields.' };
    }
    if (!isPngLatentMap({ originalname: latentRow.originalName })) {
      return { error: 'Neural latent maps must be PNG (JPEG drops the 4th channel).' };
    }
    const latent = await store.finalizeSession(body.latentMapSessionId, userId);
    const weights = await store.finalizeSession(body.weightsSessionId, userId);
    return {
      isNeural: true,
      originalFilePath: latent.finalPath!,
      weightsPath: weights.finalPath!,
      uploadedFileName: latent.originalName,
    };
  }

  if (!body.fileSessionId) {
    return { error: 'No file uploaded.' };
  }
  const fileRow = store.getOwned(body.fileSessionId, userId);
  if (fileRow.field !== 'file') {
    return { error: 'Upload session is not an RTI source file.' };
  }
  const file = await store.finalizeSession(body.fileSessionId, userId);
  return {
    isNeural: false,
    originalFilePath: file.finalPath!,
    weightsPath: null,
    uploadedFileName: file.originalName,
  };
}

export function registerUploadSessionRoutes(app: Express, ctx: ServerContext) {
  const {
    db,
    schema,
    uploadDir,
    config,
    authMiddleware,
    requirePermission,
  } = ctx;
  const store = createUploadSessionStore(db, schema, uploadDir, config.maxRtiUploadBytes);
  void store.sweepExpired();

  const rawChunk = express.raw({
    type: '*/*',
    limit: UPLOAD_MAX_CHUNK_SIZE_BYTES,
  });

  app.post('/api/uploads/sessions', authMiddleware, requirePermission('upload_rti'), asyncHandler(async (req, res) => {
    try {
      const session = await store.createSession({
        userId: req.user!.id,
        field: String(req.body?.field || ''),
        originalName: String(req.body?.originalName || ''),
        sizeBytes: Number(req.body?.sizeBytes),
      });
      res.status(201).json(session);
    } catch (err) {
      if (sendSessionError(res, err)) return;
      throw err;
    }
  }));

  app.get('/api/uploads/sessions/:id', authMiddleware, requirePermission('upload_rti'), (req, res) => {
    try {
      const session = store.getSession(String(req.params.id), req.user!.id);
      res.json(session);
    } catch (err) {
      if (sendSessionError(res, err)) return;
      throw err;
    }
  });

  app.put(
    '/api/uploads/sessions/:id',
    authMiddleware,
    requirePermission('upload_rti'),
    rawChunk,
    asyncHandler(async (req, res) => {
      try {
        const chunk = Buffer.isBuffer(req.body) ? req.body : Buffer.from(req.body || []);
        const offset = parseOffsetHeader(req);
        const session = await store.writeChunk(String(req.params.id), req.user!.id, offset, chunk);
        res.json(session);
      } catch (err) {
        if (sendSessionError(res, err)) return;
        throw err;
      }
    }),
  );

  app.delete('/api/uploads/sessions/:id', authMiddleware, requirePermission('upload_rti'), asyncHandler(async (req, res) => {
    try {
      await store.abortSession(String(req.params.id), req.user!.id);
      res.json({ success: true });
    } catch (err) {
      if (sendSessionError(res, err)) return;
      throw err;
    }
  }));

  app.post('/api/uploads/complete', authMiddleware, requirePermission('upload_rti'), asyncHandler(async (req, res) => {
    const body = (req.body || {}) as CompleteUploadRequest;
    let parsed: ParsedUploadFiles;
    try {
      const resolved = await filesFromSessions(store, req.user!.id, body);
      if (isParsedUploadError(resolved)) {
        sendError(res, 400, resolved.error);
        return;
      }
      parsed = resolved;
    } catch (err) {
      if (sendSessionError(res, err)) return;
      throw err;
    }

    if (body.recordId != null) {
      const record = resolveRecordFromParam(db, schema, body.recordId);
      if (!record) {
        sendError(res, 404, 'Record not found');
        return;
      }
      if (!validateRecordForUpload(record, res)) return;
      await handleRtiUpload(ctx, req, res, {
        recordId: record.id,
        existingMetadata: normalizeMetadata(record.metadata, schemaForRecordTypeId(db, schema, record.recordTypeId)),
        snapshotAction: 'upload_started',
        snapshotComment: 'RTI upload started',
      }, parsed);
      return;
    }

    await handleRtiUpload(ctx, req, res, {
      name: body.name,
      description: body.description,
      direction: body.direction,
      snapshotAction: 'created',
      snapshotComment: 'Record created with RTI upload',
    }, parsed);
  }));
}
