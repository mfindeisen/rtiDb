import { eq } from 'drizzle-orm';
import type { Request, Response } from 'express';
import type { CatalogMetadata } from '@rtidb/shared/metadataFields';
import {
  parseUploadFiles,
  isParsedUploadError,
  buildUploadSettings,
  buildRtiMetadata,
} from './processingPipeline.js';
import { normalizeMetadata } from './metadataFields.js';
import { assignSlugForRecord } from './slug.js';
import { sendError } from './httpErrors.js';
import type { ServerContext } from '../types/index.js';
import type { DbRecord } from '../types/index.js';

export interface RtiUploadTarget {
  recordId?: number;
  name?: string;
  description?: string;
  direction?: string;
  existingMetadata?: CatalogMetadata;
  snapshotAction: string;
  snapshotComment: string;
}

export function validateRecordForUpload(record: DbRecord, res: Response): boolean {
  if (record.status === 'processing') {
    sendError(res, 400, 'Record is already being processed.');
    return false;
  }
  if (record.status === 'done') {
    sendError(res, 400, 'Record already has processed RTI data.');
    return false;
  }
  if (record.status === 'error' && record.originalFilePath) {
    sendError(res, 400, 'Use rerun for failed records with saved source files.');
    return false;
  }
  return true;
}

export async function handleRtiUpload(
  ctx: Pick<ServerContext, 'db' | 'schema' | 'runProcessingPipeline' | 'snapshotRecordAfter'>,
  req: Request,
  res: Response,
  target: RtiUploadTarget,
): Promise<void> {
  const parsed = parseUploadFiles(req, req.body.uploadMode);
  if (isParsedUploadError(parsed)) {
    sendError(res, 400, parsed.error);
    return;
  }

  const { options, resolvedOutputType, isNeural, isGeoTiff } = buildUploadSettings(req.body);
  const metadataBase = target.existingMetadata ?? normalizeMetadata(null);
  const metadata = buildRtiMetadata(parsed.uploadedFileName, options, isNeural, isGeoTiff, metadataBase);

  let recordId = target.recordId;

  if (recordId == null) {
    if (!target.name) {
      sendError(res, 400, 'Name is required');
      return;
    }

    const inserted = ctx.db.insert(ctx.schema.records).values({
      name: target.name,
      description: target.description || '',
      date: new Date().toISOString(),
      status: 'processing',
      direction: target.direction || 'ltr',
      outputType: resolvedOutputType,
      originalFilePath: parsed.originalFilePath,
      weightsFilePath: parsed.weightsPath,
      quality: options.quality,
      tileSize: options.tileSize,
      format: options.format,
      metadata,
    }).returning({ id: ctx.schema.records.id }).get();

    recordId = inserted.id;
    assignSlugForRecord(
      ctx.db,
      ctx.schema,
      ctx.db.select().from(ctx.schema.records).where(eq(ctx.schema.records.id, recordId)).get(),
    );
  } else {
    ctx.db.update(ctx.schema.records).set({
      status: 'processing',
      progress: 0,
      message: null,
      outputType: resolvedOutputType,
      originalFilePath: parsed.originalFilePath,
      weightsFilePath: parsed.weightsPath,
      quality: options.quality,
      tileSize: options.tileSize,
      format: options.format,
      metadata,
    }).where(eq(ctx.schema.records.id, recordId)).run();
  }

  ctx.snapshotRecordAfter(recordId, target.snapshotAction, req, target.snapshotComment);
  void ctx.runProcessingPipeline(recordId, parsed.originalFilePath, parsed.weightsPath, options, resolvedOutputType);
  res.json({ success: true, id: recordId });
}
