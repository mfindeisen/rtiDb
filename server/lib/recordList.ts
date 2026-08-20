import { and, asc, desc, eq, sql, type SQL } from 'drizzle-orm';
import type { RecordType } from '@rtidb/shared/api/catalog';
import type { SearchResults } from '@rtidb/shared/api/search';
import type { AppDb, AppSchema, DbRecord } from '../types/index.js';
import type { PublishedFilter } from './userResources.js';
import { loadRecordTypeMap } from './catalog.js';
import {
  enrichRecord,
  loadSearchCandidatesForFilter,
  searchRecords,
  type SearchOptions,
} from './search.js';

const META_KEY_RE = /^[A-Za-z][A-Za-z0-9_]{0,63}$/;

export function isSafeMetaKey(key: string): boolean {
  return META_KEY_RE.test(key);
}

export function parsePageLimit(page?: number, limit?: number): { page: number; limit: number; offset: number } {
  const safePage = Math.max(1, Number(page) || 1);
  const safeLimit = Math.min(100, Math.max(1, Number(limit) || 20));
  return { page: safePage, limit: safeLimit, offset: (safePage - 1) * safeLimit };
}

function publishedClause(schema: AppSchema, published: PublishedFilter): SQL | undefined {
  if (published === 'published') return eq(schema.records.isPublished, 1);
  if (published === 'unpublished') return eq(schema.records.isPublished, 0);
  return undefined;
}

function metadataFilterClauses(schema: AppSchema, filters: Record<string, string>): SQL[] {
  const parts: SQL[] = [];
  for (const [key, value] of Object.entries(filters)) {
    if (!isSafeMetaKey(key)) continue;
    const needle = value.trim().toLowerCase();
    if (!needle) continue;
    const path = `$.${key}`;
    parts.push(sql`instr(lower(ifnull(json_extract(${schema.records.metadata}, ${path}), '')), ${needle}) > 0`);
  }
  return parts;
}

function orderByClause(schema: AppSchema, sort?: string, dir?: string): SQL {
  const descending = dir !== 'asc';
  const field = sort || 'id';
  const apply = (column: Parameters<typeof desc>[0]) => (descending ? desc(column) : asc(column));

  switch (field) {
    case 'name':
      return apply(schema.records.name);
    case 'description':
      return apply(schema.records.description);
    case 'date':
      return apply(schema.records.date);
    case 'outputType':
      return apply(schema.records.outputType);
    case 'recordType':
      return apply(schema.records.recordTypeId);
    case 'dateUpdated': {
      const column = sql`json_extract(${schema.records.metadata}, '$.lastEdit')`;
      return descending ? sql`${column} DESC` : sql`${column} ASC`;
    }
    case 'id':
      return apply(schema.records.id);
    default:
      if (isSafeMetaKey(field)) {
        const path = `$.${field}`;
        const column = sql`json_extract(${schema.records.metadata}, ${path})`;
        return descending ? sql`${column} DESC` : sql`${column} ASC`;
      }
      return desc(schema.records.id);
  }
}

function usesSqlPaging(options: SearchOptions): boolean {
  return !options.q?.trim() && !options.bbox;
}

export interface PageRecordsOptions extends SearchOptions {
  published?: PublishedFilter;
}

export function pageRecords(
  db: AppDb,
  schema: AppSchema,
  options: PageRecordsOptions = {},
  types?: Map<number, RecordType>,
): SearchResults {
  const published = options.published
    ?? (options.publishedOnly === false ? 'all' : 'published');
  const typeMap = types ?? loadRecordTypeMap(db, schema);
  const { page, limit, offset } = parsePageLimit(options.page, options.limit);
  const filters = options.filters ?? {};
  const recordTypeId = options.recordTypeId;

  if (!usesSqlPaging(options)) {
    const candidates = loadSearchCandidatesForFilter(db, schema, published, options.q || '');
    return searchRecords(candidates, {
      ...options,
      publishedOnly: published === 'published',
      page,
      limit,
    }, typeMap);
  }

  const clauses: SQL[] = [];
  const publishedSql = publishedClause(schema, published);
  if (publishedSql) clauses.push(publishedSql);
  if (recordTypeId) clauses.push(eq(schema.records.recordTypeId, recordTypeId));
  clauses.push(...metadataFilterClauses(schema, filters));
  const where = clauses.length ? and(...clauses) : undefined;

  const countRow = where
    ? db.select({ count: sql<number>`count(*)` }).from(schema.records).where(where).get()
    : db.select({ count: sql<number>`count(*)` }).from(schema.records).get();
  const total = Number(countRow?.count ?? 0);
  const order = orderByClause(schema, options.sort, options.dir);
  const rows = (where
    ? db.select().from(schema.records).where(where).orderBy(order).limit(limit).offset(offset).all()
    : db.select().from(schema.records).orderBy(order).limit(limit).offset(offset).all()) as DbRecord[];

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit) || 1,
    results: rows.map((record) => enrichRecord(record, typeMap)),
  };
}
