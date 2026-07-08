import { eq, desc, and, count } from 'drizzle-orm';
import { normalizeMetadata, emptyMetadata, formatCatalogDateTime, type CatalogMetadata } from './metadataFields.js';
import {
  SNAPSHOT_FIELDS,
  countChanges,
  type FieldChange,
  type SnapshotChanges,
  type SerializedRevision,
} from '@rtidb/shared/recordRevisions';
import type { AppDb, AppSchema, DbRecord, JwtUser } from '../types/index.js';

export type { FieldChange, SnapshotChanges, SerializedRevision };

export interface RecordSnapshot {
  name: string;
  description: string;
  direction: string;
  metadata: CatalogMetadata;
  isPublished: number;
  status: string;
  outputType: string;
  quality: number | null;
  tileSize: number | null;
  format: string | null;
  folderUrl: string | null;
  tiffUrl: string | null;
  thumbnailUrl: string | null;
}

export interface RevisionUser {
  id: number;
  username: string;
}

export function recordToSnapshot(record: DbRecord): RecordSnapshot {
  return {
    name: record.name,
    description: record.description || '',
    direction: record.direction || 'ltr',
    metadata: normalizeMetadata(record.metadata),
    isPublished: record.isPublished ?? 0,
    status: record.status,
    outputType: record.outputType || 'tiles',
    quality: record.quality ?? null,
    tileSize: record.tileSize ?? null,
    format: record.format || null,
    folderUrl: record.folderUrl || null,
    tiffUrl: record.tiffUrl || null,
    thumbnailUrl: record.thumbnailUrl || null,
  };
}

export function diffSnapshots(before: RecordSnapshot | null | undefined, after: RecordSnapshot): SnapshotChanges {
  const changes: SnapshotChanges = {};

  for (const field of SNAPSHOT_FIELDS) {
    const oldVal = before?.[field] ?? null;
    const newVal = after[field] ?? null;
    if (String(oldVal ?? '') !== String(newVal ?? '')) {
      changes[field] = { old: oldVal, new: newVal };
    }
  }

  const metaBefore: CatalogMetadata = before?.metadata || emptyMetadata();
  const metaAfter: CatalogMetadata = after.metadata || emptyMetadata();
  const metaKeys = new Set([...Object.keys(metaBefore), ...Object.keys(metaAfter)]);
  for (const key of metaKeys) {
    const oldVal = metaBefore[key as keyof CatalogMetadata] ?? '';
    const newVal = metaAfter[key as keyof CatalogMetadata] ?? '';
    if (String(oldVal).trim() !== String(newVal).trim()) {
      if (!changes.metadata) changes.metadata = {};
      changes.metadata[key] = { old: oldVal, new: newVal };
    }
  }

  return changes;
}

export function getLatestRevision(db: AppDb, schema: AppSchema, recordId: number) {
  return db.select()
    .from(schema.recordRevisions)
    .where(eq(schema.recordRevisions.recordId, recordId))
    .orderBy(desc(schema.recordRevisions.revisionNumber))
    .limit(1)
    .get();
}

export function getRevisionCount(db: AppDb, schema: AppSchema, recordId: number): number {
  const row = db.select({ count: count() })
    .from(schema.recordRevisions)
    .where(eq(schema.recordRevisions.recordId, recordId))
    .get();
  return row?.count ?? 0;
}

export function getRevisionByNumber(db: AppDb, schema: AppSchema, recordId: number, revisionNumber: number) {
  return db.select()
    .from(schema.recordRevisions)
    .where(and(
      eq(schema.recordRevisions.recordId, recordId),
      eq(schema.recordRevisions.revisionNumber, revisionNumber),
    ))
    .get();
}

function serializeRevisionRow(
  row: ReturnType<typeof getRevisionByNumber>,
  { includeSnapshot = false }: { includeSnapshot?: boolean } = {},
): SerializedRevision | null {
  if (!row) return null;
  const changes = (row.changes || {}) as SnapshotChanges;
  return {
    id: row.id,
    recordId: row.recordId,
    revisionNumber: row.revisionNumber,
    action: row.action,
    comment: row.comment,
    createdBy: row.createdBy,
    createdByName: row.createdByName,
    createdAt: row.createdAt,
    changeCount: countChanges(changes),
    changes: includeSnapshot ? changes : summarizeChanges(changes),
    snapshot: includeSnapshot ? row.snapshot : undefined,
  };
}

function summarizeChanges(changes: SnapshotChanges): Record<string, unknown> {
  const summary: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(changes)) {
    if (key === 'metadata' && value && typeof value === 'object') {
      summary.metadata = Object.keys(value);
    } else {
      summary[key] = true;
    }
  }
  return summary;
}

export function listRevisions(db: AppDb, schema: AppSchema, recordId: number): SerializedRevision[] {
  const rows = db.select()
    .from(schema.recordRevisions)
    .where(eq(schema.recordRevisions.recordId, recordId))
    .orderBy(desc(schema.recordRevisions.revisionNumber))
    .all();
  return rows.map((row) => serializeRevisionRow(row)!);
}

export function createRecordRevision(
  db: AppDb,
  schema: AppSchema,
  {
    recordId,
    record,
    action,
    user = null,
    comment = null,
  }: {
    recordId: number;
    record: DbRecord;
    action: string;
    user?: RevisionUser | null;
    comment?: string | null;
  },
) {
  const snapshot = recordToSnapshot(record);
  const previous = getLatestRevision(db, schema, recordId);
  const revisionNumber = (previous?.revisionNumber ?? 0) + 1;
  const changes = previous ? diffSnapshots(previous.snapshot as RecordSnapshot, snapshot) : {};
  const now = formatCatalogDateTime(new Date().toISOString());

  const inserted = db.insert(schema.recordRevisions).values({
    recordId,
    revisionNumber,
    action,
    snapshot,
    changes,
    comment,
    createdBy: user?.id ?? null,
    createdByName: user?.username ?? null,
    createdAt: now,
  }).returning({ id: schema.recordRevisions.id }).get();

  return { id: inserted!.id, revisionNumber, changes };
}

export function compareRevisions(
  db: AppDb,
  schema: AppSchema,
  recordId: number,
  fromRevision: number,
  toRevision: number | 'current',
) {
  const fromRow = getRevisionByNumber(db, schema, recordId, fromRevision);
  if (!fromRow) return null;

  let toSnapshot: RecordSnapshot;
  if (toRevision === 'current') {
    const record = db.select().from(schema.records).where(eq(schema.records.id, recordId)).get();
    if (!record) return null;
    toSnapshot = recordToSnapshot(record);
  } else {
    const toRow = getRevisionByNumber(db, schema, recordId, toRevision);
    if (!toRow) return null;
    toSnapshot = toRow.snapshot as RecordSnapshot;
  }

  return {
    from: fromRevision,
    to: toRevision,
    changes: diffSnapshots(fromRow.snapshot as RecordSnapshot, toSnapshot),
  };
}

export function backfillRecordRevisions(db: AppDb, schema: AppSchema): void {
  const allRecords = db.select({ id: schema.records.id }).from(schema.records).all();
  let created = 0;

  for (const { id } of allRecords) {
    const existing = getLatestRevision(db, schema, id);
    if (existing) continue;

    const record = db.select().from(schema.records).where(eq(schema.records.id, id)).get();
    if (!record) continue;

    createRecordRevision(db, schema, {
      recordId: id,
      record,
      action: 'imported',
      user: null,
      comment: 'Initial baseline from existing record',
    });
    created += 1;
  }

  if (created > 0) {
    console.log(`Backfilled ${created} record revision baseline(s)`);
  }
}

export function getRevisionDetail(
  db: AppDb,
  schema: AppSchema,
  recordId: number,
  revisionNumber: number,
): SerializedRevision | null {
  const row = getRevisionByNumber(db, schema, recordId, revisionNumber);
  return serializeRevisionRow(row, { includeSnapshot: true });
}

export function userCanViewRevisions(user: JwtUser | undefined, record: DbRecord): boolean {
  if (record.isPublished === 1) return true;
  if (!user) return false;
  if (user.role === 'admin') return true;
  return Array.isArray(user.permissions) && user.permissions.includes('edit_record');
}
