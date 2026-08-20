import path from 'path';
import fs from 'fs/promises';
import express, { type Router, type Request, Response, NextFunction } from 'express';
import { or, eq, like } from 'drizzle-orm';
import { userCanViewRecord, userCanManageRecords } from '@rtidb/shared/authorization';
import type { AppDb, AppSchema } from '../types/index.js';

function findRecordForStaticPath(db: AppDb, schema: AppSchema, urlPath: string) {
  const rel = urlPath.replace(/^\/static\/uploads\/?/, '').replace(/^\//, '');
  if (!rel) return null;

  const segments = rel.split('/');
  const top = segments[0]!;

  if (segments.length > 1) {
    const folderPrefix = `/static/uploads/${top}`;
    const byFolder = db.select()
      .from(schema.records)
      .where(like(schema.records.folderUrl, `${folderPrefix}%`))
      .get();
    if (byFolder) return byFolder;
  }

  const fileUrl = `/static/uploads/${rel}`;
  const byFile = db.select()
    .from(schema.records)
    .where(or(
      eq(schema.records.tiffUrl, fileUrl),
      eq(schema.records.thumbnailUrl, fileUrl),
      eq(schema.records.folderUrl, fileUrl),
    ))
    .get();
  if (byFile) return byFile;

  const topUrl = `/static/uploads/${top}`;
  return db.select()
    .from(schema.records)
    .where(or(
      eq(schema.records.tiffUrl, topUrl),
      eq(schema.records.thumbnailUrl, topUrl),
      like(schema.records.folderUrl, `${topUrl}%`),
    ))
    .get() ?? null;
}

export function createProtectedUploadsStatic(
  uploadDir: string,
  db: AppDb,
  schema: AppSchema,
): Router {
  const router = express.Router();
  const staticHandler = express.static(uploadDir, {
    setHeaders(res, filePath) {
      if (filePath.endsWith('.tif') || filePath.endsWith('.tiff')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        res.setHeader('Accept-Ranges', 'bytes');
      }
    },
  });

  router.use((req: Request, res: Response, next: NextFunction) => {
    const rel = req.path.replace(/^\//, '');
    if (rel.startsWith('search-temp/')) {
      return res.status(404).end();
    }
    if (rel.startsWith('incoming/')) {
      return res.status(404).end();
    }
    if (rel.startsWith('branding/')) {
      return staticHandler(req, res, next);
    }
    if (rel.startsWith('archive/')) {
      if (!req.user || !userCanManageRecords(req.user)) {
        if (!req.user) return res.status(404).end();
        return res.status(403).json({ error: 'Forbidden' });
      }
    }

    const fullPath = `/static/uploads${req.path.startsWith('/') ? req.path : `/${req.path}`}`;
    const record = findRecordForStaticPath(db, schema, fullPath);
    if (!record) {
      return res.status(404).end();
    }
    if (!userCanViewRecord(req.user, record)) {
      if (!req.user) {
        return res.status(404).end();
      }
      return res.status(403).json({ error: 'Forbidden' });
    }
    return staticHandler(req, res, next);
  });

  return router;
}

/** Move originals into archive/ instead of deleting when retention is enabled. */
export async function archiveOriginalFiles(
  originalFilePath: string,
  weightsPath: string | null,
  archiveDir: string,
): Promise<{ originalFilePath: string; weightsFilePath: string | null }> {
  await fs.mkdir(archiveDir, { recursive: true });

  const archivedOriginal = path.join(archiveDir, path.basename(originalFilePath));
  await fs.rename(originalFilePath, archivedOriginal);

  let archivedWeights: string | null = null;
  if (weightsPath) {
    archivedWeights = path.join(archiveDir, path.basename(weightsPath));
    await fs.rename(weightsPath, archivedWeights);
  }

  return { originalFilePath: archivedOriginal, weightsFilePath: archivedWeights };
}
