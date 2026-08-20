import { normalizeMetadata, parseGpsPosition, type CatalogMetadata } from './metadataFields.js';
import { inArray, sql } from 'drizzle-orm';
import type { AppDb, AppSchema, DbRecord, RecordMetadata } from '../types/index.js';
import { listAllRecords, listRecordsByPublish, type PublishedFilter } from './userResources.js';
import { coerceFilterValue, toClientRecordRow } from './records.js';
import type { RecordType } from '@rtidb/shared/api/catalog';
import type { EnrichedRecord, SearchResults } from '@rtidb/shared/api/search';

function getMetadata(record: DbRecord): CatalogMetadata {
  if (!record.metadata) return normalizeMetadata(null);
  if (typeof record.metadata === 'string') {
    try {
      return normalizeMetadata(JSON.parse(record.metadata) as RecordMetadata);
    } catch {
      return normalizeMetadata(null);
    }
  }
  return normalizeMetadata(record.metadata);
}

function recordSearchText(record: DbRecord): string {
  const meta = getMetadata(record);
  const parts = [record.name, record.description, ...Object.values(meta)];
  return parts.filter(Boolean).join(' ').toLowerCase();
}

function matchesQuery(record: DbRecord, q: string): boolean {
  const tokens = tokenizeSearchQuery(q);
  if (!tokens.length) return true;
  const hay = recordSearchText(record);
  return tokens.every((token) => hay.includes(token));
}

function matchesFilters(record: DbRecord, filters: Record<string, string>): boolean {
  if (!filters || typeof filters !== 'object') return true;
  const meta = getMetadata(record);

  for (const [key, value] of Object.entries(filters)) {
    const filterVal = coerceFilterValue(value)?.trim().toLowerCase();
    if (!filterVal) continue;
    const fieldValue = (meta[key as keyof CatalogMetadata] || '').toLowerCase();
    if (!fieldValue.includes(filterVal)) return false;
  }
  return true;
}

function matchesBbox(record: DbRecord, bbox: Bbox | null): boolean {
  if (!bbox) return true;
  const meta = getMetadata(record);
  const coords = parseGpsPosition(meta.gpsPosition);
  if (!coords) return false;

  const [west, south, east, north] = bbox;
  return coords.lng >= west && coords.lng <= east && coords.lat >= south && coords.lat <= north;
}

export type Bbox = [number, number, number, number];

export interface SearchOptions {
  q?: string;
  filters?: Record<string, string>;
  bbox?: Bbox | null;
  publishedOnly?: boolean;
  page?: number;
  limit?: number;
  recordTypeId?: number;
  sort?: string;
  dir?: string;
}

export function enrichRecord(record: DbRecord, types?: Map<number, RecordType>): EnrichedRecord {
  const row = toClientRecordRow(record, types);
  const coords = parseGpsPosition(row.metadata.gpsPosition);
  return {
    ...row,
    lat: coords?.lat ?? null,
    lng: coords?.lng ?? null,
  };
}

function recordSortValue(record: DbRecord, field: string): string {
  switch (field) {
    case 'name':
      return record.name || '';
    case 'description':
      return record.description || '';
    case 'date':
      return record.date || '';
    case 'dateUpdated':
      return getMetadata(record).lastEdit?.trim() || '';
    case 'recordType':
      return String(record.recordTypeId ?? '');
    case 'outputType':
      return record.outputType || '';
    case 'id':
      return String(record.id).padStart(12, '0');
    default:
      return String(getMetadata(record)[field as keyof CatalogMetadata] || '');
  }
}

function compareRecords(a: DbRecord, b: DbRecord, field: string): number {
  const av = recordSortValue(a, field);
  const bv = recordSortValue(b, field);
  if (field === 'date' || field === 'dateUpdated' || field === 'id') {
    const at = field === 'id' ? a.id : Date.parse(av);
    const bt = field === 'id' ? b.id : Date.parse(bv);
    const aValid = field === 'id' || !Number.isNaN(at);
    const bValid = field === 'id' || !Number.isNaN(bt);
    if (aValid && bValid) return at - bt;
    if (aValid) return 1;
    if (bValid) return -1;
  }
  return av.localeCompare(bv, undefined, { numeric: true, sensitivity: 'base' });
}

export function searchRecords(
  records: DbRecord[],
  options: SearchOptions = {},
  types?: Map<number, RecordType>,
): SearchResults {
  const {
    q = '',
    filters = {},
    bbox = null,
    publishedOnly = true,
    page = 1,
    limit = 20,
    recordTypeId,
    sort,
    dir,
  } = options;

  let results = records;
  if (publishedOnly) {
    results = results.filter((r) => r.isPublished === 1);
  }
  if (recordTypeId) {
    results = results.filter((r) => r.recordTypeId === recordTypeId);
  }

  results = results.filter((r) => matchesQuery(r, q));
  results = results.filter((r) => matchesFilters(r, filters));
  results = results.filter((r) => matchesBbox(r, bbox));

  const sortField = sort?.trim();
  if (sortField) {
    const sign = dir === 'asc' ? 1 : -1;
    results = [...results].sort((a, b) => compareRecords(a, b, sortField) * sign);
  }

  const total = results.length;
  const safePage = Math.max(1, Number(page) || 1);
  const safeLimit = Math.min(100, Math.max(1, Number(limit) || 20));
  const offset = (safePage - 1) * safeLimit;
  const pageResults = results.slice(offset, offset + safeLimit).map((record) => enrichRecord(record, types));

  return {
    total,
    page: safePage,
    limit: safeLimit,
    totalPages: Math.ceil(total / safeLimit) || 1,
    results: pageResults,
  };
}

export function parseBboxParam(bboxStr: unknown): Bbox | null {
  if (!bboxStr) return null;
  const parts = String(bboxStr).split(',').map((v) => parseFloat(v.trim()));
  if (parts.length !== 4 || parts.some((n) => !Number.isFinite(n))) return null;
  const [west, south, east, north] = parts as Bbox;
  if (west >= east || south >= north) return null;
  return parts as Bbox;
}

export function parseFiltersParam(filtersStr: unknown): Record<string, string> {
  if (!filtersStr) return {};
  try {
    const parsed = JSON.parse(String(filtersStr));
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const filters: Record<string, string> = {};
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      const coerced = coerceFilterValue(value);
      if (coerced != null) filters[key] = coerced;
    }
    return filters;
  } catch {
    return {};
  }
}

/** Split a user query into FTS/substring tokens. Hyphens are separators (FTS5 `-` is NOT). */
export function tokenizeSearchQuery(q: string): string[] {
  return q
    .toLowerCase()
    .split(/[\s,.;:/\\|"'`~!@#$%^&*()[\]{}<>?+=-]+/)
    .map((token) => token.replace(/[^a-z0-9_]/gi, ''))
    .filter((token) => token.length >= 2);
}

/** Build a safe FTS5 MATCH query; returns null when the input has no usable tokens. */
export function buildFtsMatchQuery(q: string): string | null {
  const tokens = tokenizeSearchQuery(q);
  if (!tokens.length) return null;
  return tokens.map((token) => `${token}*`).join(' AND ');
}

function sqliteClient(db: AppDb): import('better-sqlite3').Database | null {
  const asAny = db as unknown as {
    $client?: import('better-sqlite3').Database;
    session?: { client?: import('better-sqlite3').Database };
  };
  return asAny.$client ?? asAny.session?.client ?? null;
}

export function loadSearchCandidates(
  db: AppDb,
  schema: AppSchema,
  options: { publishedOnly?: boolean; q?: string } = {},
): DbRecord[] {
  const { publishedOnly = true, q = '' } = options;
  const sqlite = sqliteClient(db);
  const match = q.trim() ? buildFtsMatchQuery(q) : null;

  if (sqlite && match) {
    try {
      const ftsReady = sqlite
        .prepare("SELECT 1 AS ok FROM sqlite_master WHERE type = 'table' AND name = 'records_fts'")
        .get();
      if (ftsReady) {
        const idRows = sqlite.prepare(`
          SELECT r.id AS id
          FROM records r
          JOIN records_fts f ON f.rowid = r.id
          WHERE f MATCH ?
            ${publishedOnly ? 'AND r.is_published = 1' : ''}
          ORDER BY r.id DESC
        `).all(match) as Array<{ id: number }>;
        const ids = idRows.map((row) => row.id);
        if (!ids.length) return [];
        return db.select()
          .from(schema.records)
          .where(inArray(schema.records.id, ids))
          .orderBy(sql`${schema.records.id} DESC`)
          .all();
      }
    } catch (err) {
      console.warn('FTS search fallback:', err);
    }
  }

  return publishedOnly
    ? listRecordsByPublish(db, schema, 'published')
    : listAllRecords(db, schema);
}

export function loadSearchCandidatesForFilter(
  db: AppDb,
  schema: AppSchema,
  filter: PublishedFilter,
  q = '',
): DbRecord[] {
  if (filter === 'unpublished') {
    const records = listRecordsByPublish(db, schema, 'unpublished');
    if (!q.trim()) return records;
    return records.filter((record) => matchesQuery(record, q));
  }
  return loadSearchCandidates(db, schema, {
    publishedOnly: filter === 'published',
    q,
  });
}

