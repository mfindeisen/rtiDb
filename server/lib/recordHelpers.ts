import path from 'path';
import fs from 'fs/promises';
import { eq } from 'drizzle-orm';
import type { Express, Request, Response } from 'express';
import { createRecordRevision } from './recordRevisions.js';
import { resolveRecordFromParam } from './slug.js';
import { getExportContent } from './export.js';
import type { AppDb, AppSchema, DbRecord, RecordHelpersContext } from '../types/index.js';

export function createRecordHelpers({ db, schema }: { db: AppDb; schema: AppSchema }): RecordHelpersContext {
  function fetchRecordOr404(req: Request, res: Response): DbRecord | null {
    const record = resolveRecordFromParam(db, schema, req.params.id);
    if (!record) {
      res.status(404).json({ error: 'Record not found' });
      return null;
    }
    return record;
  }

  function revisionActor(req: Request) {
    return req.user ? { id: req.user.id, username: req.user.username } : null;
  }

  function snapshotRecordAfter(recordId: number, action: string, req: Request, comment: string | null = null) {
    const record = db.select().from(schema.records).where(eq(schema.records.id, recordId)).get();
    if (!record) return;
    createRecordRevision(db, schema, {
      recordId,
      record,
      action,
      user: revisionActor(req),
      comment,
    });
  }

  function snapshotRecordAfterSystem(recordId: number, action: string, comment: string | null = null) {
    const record = db.select().from(schema.records).where(eq(schema.records.id, recordId)).get();
    if (!record) return;
    createRecordRevision(db, schema, {
      recordId,
      record,
      action,
      user: null,
      comment,
    });
  }

  return { fetchRecordOr404, snapshotRecordAfter, snapshotRecordAfterSystem };
}

export async function getFolderStats(dirPath: string) {
  let totalSize = 0;
  let fileCount = 0;

  const walk = async (dir: string) => {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          await walk(fullPath);
        } else if (entry.isFile()) {
          const stat = await fs.stat(fullPath);
          totalSize += stat.size;
          fileCount += 1;
        }
      }
    } catch {
      // Ignore if folder doesn't exist
    }
  };

  await walk(dirPath);
  return { totalSize, fileCount };
}

export function sendExport(res: Response, records: DbRecord[], format: string, req: Request) {
  const { contentType, body, filename } = getExportContent(records, format, req);
  const download = req.query.download !== '0';
  res.setHeader('Content-Type', contentType);
  if (download) {
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  }
  res.send(body);
}
