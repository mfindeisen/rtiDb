import { eq, desc, and, count } from 'drizzle-orm';
import { normalizeMetadata, formatCatalogDateTime } from './metadataFields.js';

const SNAPSHOT_FIELDS = [
  'name',
  'description',
  'direction',
  'isPublished',
  'status',
  'outputType',
  'quality',
  'tileSize',
  'format',
  'folderUrl',
  'tiffUrl',
  'thumbnailUrl',
];

export function recordToSnapshot(record) {
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

export function diffSnapshots(before, after) {
  const changes = {};

  for (const field of SNAPSHOT_FIELDS) {
    const oldVal = before?.[field] ?? null;
    const newVal = after?.[field] ?? null;
    if (String(oldVal ?? '') !== String(newVal ?? '')) {
      changes[field] = { old: oldVal, new: newVal };
    }
  }

  const metaBefore = before?.metadata || {};
  const metaAfter = after?.metadata || {};
  const metaKeys = new Set([...Object.keys(metaBefore), ...Object.keys(metaAfter)]);
  for (const key of metaKeys) {
    const oldVal = metaBefore[key] ?? '';
    const newVal = metaAfter[key] ?? '';
    if (String(oldVal).trim() !== String(newVal).trim()) {
      if (!changes.metadata) changes.metadata = {};
      changes.metadata[key] = { old: oldVal, new: newVal };
    }
  }

  return changes;
}

export function countChanges(changes = {}) {
  let total = 0;
  for (const [key, value] of Object.entries(changes)) {
    if (key === 'metadata' && value && typeof value === 'object') {
      total += Object.keys(value).length;
    } else {
      total += 1;
    }
  }
  return total;
}

export function getLatestRevision(db, schema, recordId) {
  return db.select()
    .from(schema.recordRevisions)
    .where(eq(schema.recordRevisions.recordId, recordId))
    .orderBy(desc(schema.recordRevisions.revisionNumber))
    .limit(1)
    .get();
}

export function getRevisionCount(db, schema, recordId) {
  const row = db.select({ count: count() })
    .from(schema.recordRevisions)
    .where(eq(schema.recordRevisions.recordId, recordId))
    .get();
  return row?.count ?? 0;
}

export function getRevisionByNumber(db, schema, recordId, revisionNumber) {
  return db.select()
    .from(schema.recordRevisions)
    .where(and(
      eq(schema.recordRevisions.recordId, recordId),
      eq(schema.recordRevisions.revisionNumber, revisionNumber),
    ))
    .get();
}

function serializeRevisionRow(row, { includeSnapshot = false } = {}) {
  if (!row) return null;
  const changes = row.changes || {};
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

function summarizeChanges(changes) {
  const summary = {};
  for (const [key, value] of Object.entries(changes)) {
    if (key === 'metadata' && value && typeof value === 'object') {
      summary.metadata = Object.keys(value);
    } else {
      summary[key] = true;
    }
  }
  return summary;
}

export function listRevisions(db, schema, recordId) {
  const rows = db.select()
    .from(schema.recordRevisions)
    .where(eq(schema.recordRevisions.recordId, recordId))
    .orderBy(desc(schema.recordRevisions.revisionNumber))
    .all();
  return rows.map((row) => serializeRevisionRow(row));
}

export function createRecordRevision(db, schema, { recordId, record, action, user = null, comment = null }) {
  const snapshot = recordToSnapshot(record);
  const previous = getLatestRevision(db, schema, recordId);
  const revisionNumber = (previous?.revisionNumber ?? 0) + 1;
  const changes = previous ? diffSnapshots(previous.snapshot, snapshot) : {};
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

  return { id: inserted.id, revisionNumber, changes };
}

export function compareRevisions(db, schema, recordId, fromRevision, toRevision) {
  const fromRow = getRevisionByNumber(db, schema, recordId, fromRevision);
  if (!fromRow) return null;

  let toSnapshot;
  if (toRevision === 'current') {
    const record = db.select().from(schema.records).where(eq(schema.records.id, recordId)).get();
    if (!record) return null;
    toSnapshot = recordToSnapshot(record);
  } else {
    const toRow = getRevisionByNumber(db, schema, recordId, toRevision);
    if (!toRow) return null;
    toSnapshot = toRow.snapshot;
  }

  return {
    from: fromRevision,
    to: toRevision,
    changes: diffSnapshots(fromRow.snapshot, toSnapshot),
  };
}

export function backfillRecordRevisions(db, schema) {
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

export function getRevisionDetail(db, schema, recordId, revisionNumber) {
  const row = getRevisionByNumber(db, schema, recordId, revisionNumber);
  return serializeRevisionRow(row, { includeSnapshot: true });
}

export function userCanViewRevisions(user, record) {
  if (record.isPublished === 1) return true;
  if (!user) return false;
  if (user.role === 'admin') return true;
  return Array.isArray(user.permissions) && user.permissions.includes('edit_record');
}
