import { normalizeMetadata, parseGpsPosition, type CatalogMetadata } from './metadataFields.js';
import { inArray, sql } from 'drizzle-orm';
import type { AppDb, AppSchema, DbRecord, RecordMetadata } from '../types/index.js';
import { listAllRecords, listRecordsByPublish, type PublishedFilter } from './userResources.js';

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
  if (!q?.trim()) return true;
  return recordSearchText(record).includes(q.trim().toLowerCase());
}

function matchesFilters(record: DbRecord, filters: Record<string, string>): boolean {
  if (!filters || typeof filters !== 'object') return true;
  const meta = getMetadata(record);

  for (const [key, value] of Object.entries(filters)) {
    if (!value?.trim()) continue;
    const fieldValue = (meta[key as keyof CatalogMetadata] || '').toLowerCase();
    const filterVal = value.trim().toLowerCase();
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

export interface EnrichedRecord extends DbRecord {
  metadata: CatalogMetadata;
  lat: number | null;
  lng: number | null;
}

export interface SearchOptions {
  q?: string;
  filters?: Record<string, string>;
  bbox?: Bbox | null;
  publishedOnly?: boolean;
  page?: number;
  limit?: number;
}

export interface SearchResults {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  results: EnrichedRecord[];
}

export function enrichRecord(record: DbRecord): EnrichedRecord {
  const metadata = getMetadata(record);
  const coords = parseGpsPosition(metadata.gpsPosition);
  return {
    ...record,
    metadata,
    lat: coords?.lat ?? null,
    lng: coords?.lng ?? null,
  };
}

export function searchRecords(records: DbRecord[], options: SearchOptions = {}): SearchResults {
  const {
    q = '',
    filters = {},
    bbox = null,
    publishedOnly = true,
    page = 1,
    limit = 20,
  } = options;

  let results = records;
  if (publishedOnly) {
    results = results.filter((r) => r.isPublished === 1);
  }

  results = results.filter((r) => matchesQuery(r, q));
  results = results.filter((r) => matchesFilters(r, filters));
  results = results.filter((r) => matchesBbox(r, bbox));

  const total = results.length;
  const safePage = Math.max(1, Number(page) || 1);
  const safeLimit = Math.min(100, Math.max(1, Number(limit) || 20));
  const offset = (safePage - 1) * safeLimit;
  const pageResults = results.slice(offset, offset + safeLimit).map(enrichRecord);

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
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

/** Build a safe FTS5 MATCH query; returns null when the input has no usable tokens. */
export function buildFtsMatchQuery(q: string): string | null {
  const tokens = q
    .toLowerCase()
    .split(/[\s,.;:/\\|"'`~!@#$%^&*()[\]{}<>?+=]+/)
    .map((token) => token.replace(/[^a-z0-9_-]/gi, ''))
    .filter((token) => token.length >= 2);
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
    const needle = q.trim().toLowerCase();
    return records.filter((record) => recordSearchText(record).includes(needle));
  }
  return loadSearchCandidates(db, schema, {
    publishedOnly: filter === 'published',
    q,
  });
}

