import path from 'path';
import type { Express } from 'express';
import {
  buildPublicRecord,
  buildRtiAssets,
  getBaseUrl,
  toClientRecordRow,
} from '../lib/records.js';
import { metadataOnlyPayload, SUPPORTED_EXPORT_FORMATS } from '../lib/export.js';
import { resolveRecordFromParam, recordPublicPath } from '../lib/slug.js';
import { getLatestRevision } from '../lib/recordRevisions.js';
import { getFolderStats, sendExport } from '../lib/recordHelpers.js';
import { ensureRecordViewAccess } from '../lib/recordAccess.js';
import { listAvailableSourceFiles, parseSourceFileKind, resolveSourceFilePath } from '../lib/originalFiles.js';
import { enqueueAutoAnnotate, getAutoAnnotateJob } from '../lib/autoAnnotateQueue.js';
import { consumeRateLimit } from '../lib/rateLimit.js';
import { routeParam } from '../lib/httpParams.js';
import { loadRecordTypeMap } from '../lib/catalog.js';
import type { ServerContext } from '../types/index.js';

export function registerRecordReadRoutes(app: Express, ctx: ServerContext) {
  const {
    db,
    schema,
    uploadDir,
    fetchRecordOr404,
    fetchAccessibleRecordOr404,
    authMiddleware,
    requireAdmin,
  } = ctx;

  app.get('/api/records/lookup/:identifier', authMiddleware, (req, res) => {
    const record = resolveRecordFromParam(db, schema, req.params.identifier);
    if (!record || !ensureRecordViewAccess(req, res, record)) return;
    res.json(buildPublicRecord(record, req));
  });

  app.get('/api/records/:id/metadata', authMiddleware, (req, res) => {
    const record = fetchAccessibleRecordOr404(req, res);
    if (!record) return;
    res.json(metadataOnlyPayload(record));
  });

  app.get('/api/records/:id/export', authMiddleware, (req, res) => {
    const record = fetchAccessibleRecordOr404(req, res);
    if (!record) return;
    const format = String(req.query.format || 'json').toLowerCase();
    try {
      sendExport(res, [record], format, req);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Export failed';
      res.status(400).json({ error: message, supported: SUPPORTED_EXPORT_FORMATS });
    }
  });

  app.get('/api/records/:id/rti', authMiddleware, (req, res) => {
    const record = fetchAccessibleRecordOr404(req, res);
    if (!record) return;

    const baseUrl = getBaseUrl(req);
    const assets = buildRtiAssets(record, baseUrl);
    const payload = {
      id: record.id,
      slug: record.slug || null,
      name: record.name,
      status: record.status,
      ...assets,
      viewerUrl: `${baseUrl}${recordPublicPath(record)}`,
      exportUrl: `${baseUrl}/api/records/${record.slug || record.id}/export`,
    };

    if (req.query.redirect === '1' && record.status === 'done') {
      const target = assets.tiffUrl || assets.folderUrl;
      if (target) return res.redirect(target);
      return res.status(404).json({ error: 'No RTI assets available' });
    }

    res.json({
      ...payload,
      originalDownloadUrl: record.originalFilePath
        ? `${baseUrl}/api/records/${record.slug || record.id}/original`
        : null,
      weightsDownloadUrl: record.weightsFilePath
        ? `${baseUrl}/api/records/${record.slug || record.id}/original?file=weights`
        : null,
    });
  });

  app.get('/api/records/:id/original', authMiddleware, async (req, res) => {
    const record = fetchAccessibleRecordOr404(req, res);
    if (!record) return;

    const kind = parseSourceFileKind(req.query.file);
    const resolved = await resolveSourceFilePath(record, uploadDir, kind);
    if (!resolved) {
      return res.status(404).json({ error: 'Original file is not available' });
    }

    res.download(resolved.absPath, resolved.fileName, (err) => {
      if (!err) return;
      console.error(`Original download failed for record ${record.id}:`, err);
      if (!res.headersSent) {
        res.status(404).json({ error: 'Original file is not available' });
      }
    });
  });

  app.get('/api/records/:id', authMiddleware, async (req, res) => {
    const record = fetchAccessibleRecordOr404(req, res);
    if (!record) return;

    let folderSize = 0;
    let fileCount = 0;
    if (record.status === 'done' && record.folderUrl) {
      const folderName = path.basename(record.folderUrl);
      const localPath = path.join(uploadDir, folderName);
      const stats = await getFolderStats(localPath);
      folderSize = stats.totalSize;
      fileCount = stats.fileCount;
    }
    res.json({
      ...toClientRecordRow(record, loadRecordTypeMap(db, schema)),
      folderSize,
      fileCount,
      revisionNumber: getLatestRevision(db, schema, record.id)?.revisionNumber ?? 0,
      sourceFiles: await listAvailableSourceFiles(record, uploadDir),
    });
  });

  app.post('/api/records/:id/auto-annotate', authMiddleware, requireAdmin, (req, res) => {
    const record = fetchRecordOr404(req, res);
    if (!record) return;

    if (process.env.AUTO_ANNOTATE_ENABLED === '0') {
      return res.status(503).json({ error: 'Auto-annotation is disabled on this server' });
    }

    const rate = consumeRateLimit(`auto-annotate:${req.user!.id}`, { max: 5, windowMs: 60 * 60 * 1000 });
    if (!rate.allowed) {
      return res.status(429).json({
        error: 'Auto-annotation rate limit exceeded (5 per hour)',
        retryAfterSeconds: Math.ceil(rate.retryAfterMs / 1000),
      });
    }

    const replace = req.body?.replace === true || req.query.replace === '1';

    try {
      const job = enqueueAutoAnnotate({
        db,
        schema,
        record,
        userId: req.user!.id,
        uploadDir,
        replace,
      });
      res.status(202).json(job);
    } catch (err) {
      console.error('Auto-annotate enqueue error:', err);
      res.status(500).json({ error: 'Could not queue auto-annotation' });
    }
  });

  app.get('/api/records/:id/auto-annotate/jobs/:jobId', authMiddleware, requireAdmin, (req, res) => {
    const job = getAutoAnnotateJob(routeParam(req.params.jobId));
    if (!job) {
      return res.status(404).json({ error: 'Job not found or expired' });
    }
    res.json(job);
  });
}
