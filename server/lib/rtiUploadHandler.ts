import { and, eq, sql } from 'drizzle-orm';
import type { Request, Response } from 'express';
import type { CatalogMetadata } from '@rtidb/shared/metadataFields';
import {
  parseUploadFiles,
  isParsedUploadError,
  buildUploadSettings,
  buildRtiMetadata,
} from './processingPipeline.js';
import { getDefaultRecordType, schemaForRecordTypeId } from './catalog.js';
import { normalizeMetadata } from './metadataFields.js';
import { assignSlugForRecord } from './slug.js';
import { sendError } from './httpErrors.js';
import type { ServerContext } from '../types/index.js';
import type { AppDb, AppSchema, DbRecord } from '../types/index.js';

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

/** Atomically claim a record for upload so concurrent POSTs cannot enqueue duplicate jobs. */
export function claimRecordForUpload(
  db: AppDb,
  schema: AppSchema,
  recordId: number,
  values: {
    status?: string;
    progress?: number | null;
    message?: string | null;
    outputType?: string | null;
    originalFilePath?: string | null;
    weightsFilePath?: string | null;
    quality?: number | null;
    tileSize?: number | null;
    format?: string | null;
    metadata?: CatalogMetadata;
  },
): boolean {
  const result = db.update(schema.records)
    .set(values)
    .where(and(
      eq(schema.records.id, recordId),
      sql`${schema.records.status} NOT IN ('processing', 'done')`,
      sql`NOT (${schema.records.status} = 'error' AND ${schema.records.originalFilePath} IS NOT NULL)`,
    ))
    .run();
  return result.changes > 0;
}

export function claimRecordForRerun(
  db: AppDb,
  schema: AppSchema,
  recordId: number,
): boolean {
  const result = db.update(schema.records)
    .set({ status: 'processing', progress: 0 })
    .where(and(
      eq(schema.records.id, recordId),
      eq(schema.records.status, 'error'),
    ))
    .run();
  return result.changes > 0;
}

export async function handleRtiUpload(
  ctx: Pick<ServerContext, 'db' | 'schema' | 'enqueueProcessing' | 'snapshotRecordAfter'>,
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
  const typeId = target.recordId
    ? undefined
    : (Number(req.body?.recordTypeId) || getDefaultRecordType(ctx.db, ctx.schema)?.id || null);
  const metadataBase = target.existingMetadata
    ?? normalizeMetadata(null, schemaForRecordTypeId(ctx.db, ctx.schema, typeId));
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
      recordTypeId: typeId,
    }).returning({ id: ctx.schema.records.id }).get();

    recordId = inserted.id;
    assignSlugForRecord(
      ctx.db,
      ctx.schema,
      ctx.db.select().from(ctx.schema.records).where(eq(ctx.schema.records.id, recordId)).get(),
    );
  } else {
    const claimed = claimRecordForUpload(ctx.db, ctx.schema, recordId, {
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
    });
    if (!claimed) {
      sendError(res, 409, 'Record is already being processed or already has RTI data.');
      return;
    }
  }

  ctx.snapshotRecordAfter(recordId, target.snapshotAction, req, target.snapshotComment);
  const job = ctx.enqueueProcessing({
    recordId,
    originalFilePath: parsed.originalFilePath,
    weightsPath: parsed.weightsPath,
    options,
    outputType: resolvedOutputType,
  });
  res.json({ success: true, id: recordId, jobId: job.jobId, position: job.position });
}
