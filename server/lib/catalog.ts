import { eq, sql } from 'drizzle-orm';
import {
  DEFAULT_CATALOG_SCHEMA,
  DEFAULT_SITE_CONFIG,
  DEFAULT_VIEW_CONFIG,
  applyDateTimeFormats,
  parseCatalogSchema,
  parseSiteConfig,
  parseViewConfig,
  slugifyCatalogId,
  type CatalogSchema,
  type CatalogView,
  type CatalogViewConfig,
  type RecordType,
  type SiteConfig,
} from '@rtidb/shared';
import type { AppDb, AppSchema } from '../types/index.js';

export type RecordTypeRow = {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  isDefault: number;
  sortOrder: number;
  schema: unknown;
};

function parseStoredJson(value: unknown): unknown {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }
  return value;
}

export function toRecordType(row: RecordTypeRow, recordCount?: number): RecordType {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description || '',
    isDefault: row.isDefault === 1,
    sortOrder: row.sortOrder,
    schema: parseCatalogSchema(parseStoredJson(row.schema)),
    recordCount,
  };
}

export function toCatalogView(row: {
  id: number;
  recordTypeId: number | null;
  name: string;
  slug: string;
  isDefault: number;
  isPublic: number;
  config: unknown;
}): CatalogView {
  return {
    id: row.id,
    recordTypeId: row.recordTypeId,
    name: row.name,
    slug: row.slug,
    isDefault: row.isDefault === 1,
    isPublic: row.isPublic === 1,
    config: parseViewConfig(parseStoredJson(row.config)),
  };
}

export function getPublicApiName(db: AppDb, schema: AppSchema): string {
  return `${getSiteConfig(db, schema).siteName} API`;
}

export function getSiteConfig(db: AppDb, schema: AppSchema): SiteConfig {
  const row = db.select().from(schema.siteSettings).where(eq(schema.siteSettings.id, 1)).get();
  const parsed = parseSiteConfig(parseStoredJson(row?.config));
  applyDateTimeFormats(parsed);
  return parsed;
}

export function saveSiteConfig(db: AppDb, schema: AppSchema, patch: Partial<SiteConfig>): SiteConfig {
  const next = parseSiteConfig({ ...getSiteConfig(db, schema), ...patch });
  applyDateTimeFormats(next);
  const existing = db.select({ id: schema.siteSettings.id }).from(schema.siteSettings).where(eq(schema.siteSettings.id, 1)).get();
  if (existing) {
    db.update(schema.siteSettings).set({ config: next }).where(eq(schema.siteSettings.id, 1)).run();
  } else {
    db.insert(schema.siteSettings).values({ id: 1, config: next }).run();
  }
  return next;
}

export function listRecordTypes(db: AppDb, schema: AppSchema): RecordType[] {
  const rows = db.select().from(schema.recordTypes).orderBy(schema.recordTypes.sortOrder, schema.recordTypes.id).all();
  const counts = db.select({
    recordTypeId: schema.records.recordTypeId,
    count: sql<number>`count(*)`,
  }).from(schema.records).groupBy(schema.records.recordTypeId).all();
  const countById = new Map(counts.map((row) => [row.recordTypeId, Number(row.count)]));
  return rows.map((row) => toRecordType(row, countById.get(row.id) ?? 0));
}

export function getRecordTypeById(db: AppDb, schema: AppSchema, id: number | null | undefined): RecordType | null {
  if (!id) return null;
  const row = db.select().from(schema.recordTypes).where(eq(schema.recordTypes.id, id)).get();
  return row ? toRecordType(row) : null;
}

export function getDefaultRecordType(db: AppDb, schema: AppSchema): RecordType | null {
  const row = db.select().from(schema.recordTypes).where(eq(schema.recordTypes.isDefault, 1)).get()
    ?? db.select().from(schema.recordTypes).orderBy(schema.recordTypes.id).get();
  return row ? toRecordType(row) : null;
}

export function schemaForRecordTypeId(db: AppDb, schema: AppSchema, recordTypeId: number | null | undefined): CatalogSchema {
  return getRecordTypeById(db, schema, recordTypeId)?.schema ?? DEFAULT_CATALOG_SCHEMA;
}

export function loadRecordTypeMap(db: AppDb, schema: AppSchema): Map<number, RecordType> {
  return new Map(listRecordTypes(db, schema).map((type) => [type.id, type]));
}

function uniqueSlug(
  db: AppDb,
  schema: AppSchema,
  table: 'recordTypes' | 'catalogViews',
  base: string,
  excludeId?: number,
): string {
  const source = table === 'recordTypes' ? schema.recordTypes : schema.catalogViews;
  let slug = slugifyCatalogId(base);
  let n = 2;
  for (;;) {
    const existing = db.select({ id: source.id }).from(source).where(eq(source.slug, slug)).get();
    if (!existing || existing.id === excludeId) return slug;
    slug = `${slugifyCatalogId(base)}-${n}`;
    n += 1;
  }
}

function clearDefaultTypes(db: AppDb, schema: AppSchema) {
  db.update(schema.recordTypes).set({ isDefault: 0 }).run();
}

export function createRecordType(
  db: AppDb,
  schema: AppSchema,
  input: {
    name: string;
    slug?: string;
    description?: string;
    isDefault?: boolean;
    sortOrder?: number;
    schemaJson?: CatalogSchema;
    cloneFromId?: number;
  },
): RecordType {
  const clone = input.cloneFromId ? getRecordTypeById(db, schema, input.cloneFromId) : null;
  const name = input.name.trim();
  if (!name) throw new Error('Name is required');
  const parsedSchema = parseCatalogSchema(input.schemaJson ?? clone?.schema ?? DEFAULT_CATALOG_SCHEMA);
  const slug = uniqueSlug(db, schema, 'recordTypes', input.slug || name);
  const isFirst = !db.select({ id: schema.recordTypes.id }).from(schema.recordTypes).get();
  const isDefault = input.isDefault || isFirst;
  if (isDefault) clearDefaultTypes(db, schema);

  const inserted = db.insert(schema.recordTypes).values({
    name,
    slug,
    description: input.description ?? '',
    isDefault: isDefault ? 1 : 0,
    sortOrder: input.sortOrder ?? 0,
    schema: parsedSchema,
  }).returning().get();

  return toRecordType(inserted);
}

export function updateRecordType(
  db: AppDb,
  schema: AppSchema,
  id: number,
  input: {
    name?: string;
    slug?: string;
    description?: string;
    isDefault?: boolean;
    sortOrder?: number;
    schemaJson?: CatalogSchema;
  },
): RecordType | null {
  const existing = getRecordTypeById(db, schema, id);
  if (!existing) return null;

  const name = input.name?.trim() || existing.name;
  const slug = input.slug ? uniqueSlug(db, schema, 'recordTypes', input.slug, id) : existing.slug;
  const nextSchema = input.schemaJson ? parseCatalogSchema(input.schemaJson) : existing.schema;
  const isDefault = input.isDefault ?? existing.isDefault;
  if (isDefault) clearDefaultTypes(db, schema);

  db.update(schema.recordTypes).set({
    name,
    slug,
    description: input.description ?? existing.description,
    isDefault: isDefault ? 1 : 0,
    sortOrder: input.sortOrder ?? existing.sortOrder,
    schema: nextSchema,
  }).where(eq(schema.recordTypes.id, id)).run();

  return getRecordTypeById(db, schema, id);
}

export function deleteRecordType(db: AppDb, schema: AppSchema, id: number): { ok: true } | { error: string } {
  const existing = getRecordTypeById(db, schema, id);
  if (!existing) return { error: 'Record type not found' };
  const used = db.select({ id: schema.records.id }).from(schema.records).where(eq(schema.records.recordTypeId, id)).get();
  if (used) return { error: 'Cannot delete a record type that still has records' };
  if (existing.isDefault) {
    const other = db.select().from(schema.recordTypes).where(sql`${schema.recordTypes.id} != ${id}`).get();
    if (other) {
      db.update(schema.recordTypes).set({ isDefault: 1 }).where(eq(schema.recordTypes.id, other.id)).run();
    }
  }
  db.delete(schema.catalogViews).where(eq(schema.catalogViews.recordTypeId, id)).run();
  db.delete(schema.recordTypes).where(eq(schema.recordTypes.id, id)).run();
  return { ok: true };
}

export function listCatalogViews(db: AppDb, schema: AppSchema, publicOnly = false): CatalogView[] {
  const rows = publicOnly
    ? db.select().from(schema.catalogViews).where(eq(schema.catalogViews.isPublic, 1)).all()
    : db.select().from(schema.catalogViews).all();
  return rows
    .map(toCatalogView)
    .sort((a, b) => Number(b.isDefault) - Number(a.isDefault) || a.name.localeCompare(b.name));
}

export function getCatalogViewById(db: AppDb, schema: AppSchema, id: number): CatalogView | null {
  const row = db.select().from(schema.catalogViews).where(eq(schema.catalogViews.id, id)).get();
  return row ? toCatalogView(row) : null;
}

function clearDefaultViews(db: AppDb, schema: AppSchema) {
  db.update(schema.catalogViews).set({ isDefault: 0 }).run();
}

export function createCatalogView(
  db: AppDb,
  schema: AppSchema,
  input: {
    name: string;
    slug?: string;
    recordTypeId?: number | null;
    isDefault?: boolean;
    isPublic?: boolean;
    config?: CatalogViewConfig;
  },
): CatalogView {
  const name = input.name.trim();
  if (!name) throw new Error('Name is required');
  const slug = uniqueSlug(db, schema, 'catalogViews', input.slug || name);
  const isFirst = !db.select({ id: schema.catalogViews.id }).from(schema.catalogViews).get();
  const isDefault = input.isDefault || isFirst;
  if (isDefault) clearDefaultViews(db, schema);
  const inserted = db.insert(schema.catalogViews).values({
    name,
    slug,
    recordTypeId: input.recordTypeId ?? null,
    isDefault: isDefault ? 1 : 0,
    isPublic: input.isPublic === false ? 0 : 1,
    config: parseViewConfig(input.config),
  }).returning().get();
  return toCatalogView(inserted);
}

export function updateCatalogView(
  db: AppDb,
  schema: AppSchema,
  id: number,
  input: {
    name?: string;
    slug?: string;
    recordTypeId?: number | null;
    isDefault?: boolean;
    isPublic?: boolean;
    config?: CatalogViewConfig;
  },
): CatalogView | null {
  const existing = getCatalogViewById(db, schema, id);
  if (!existing) return null;
  const name = input.name?.trim() || existing.name;
  const slug = input.slug ? uniqueSlug(db, schema, 'catalogViews', input.slug, id) : existing.slug;
  const isDefault = input.isDefault ?? existing.isDefault;
  if (isDefault) clearDefaultViews(db, schema);
  db.update(schema.catalogViews).set({
    name,
    slug,
    recordTypeId: input.recordTypeId === undefined ? existing.recordTypeId : input.recordTypeId,
    isDefault: isDefault ? 1 : 0,
    isPublic: input.isPublic == null ? (existing.isPublic ? 1 : 0) : (input.isPublic ? 1 : 0),
    config: parseViewConfig(input.config ?? existing.config),
  }).where(eq(schema.catalogViews.id, id)).run();
  return getCatalogViewById(db, schema, id);
}

export function deleteCatalogView(db: AppDb, schema: AppSchema, id: number): { ok: true } | { error: string } {
  const existing = getCatalogViewById(db, schema, id);
  if (!existing) return { error: 'View not found' };
  db.delete(schema.catalogViews).where(eq(schema.catalogViews.id, id)).run();
  if (existing.isDefault) {
    const other = db.select().from(schema.catalogViews).get();
    if (other) {
      db.update(schema.catalogViews).set({ isDefault: 1 }).where(eq(schema.catalogViews.id, other.id)).run();
    }
  }
  return { ok: true };
}

export function seedCatalogDefaults(db: AppDb, schema: AppSchema): void {
  const existingSettings = db.select({ id: schema.siteSettings.id }).from(schema.siteSettings).where(eq(schema.siteSettings.id, 1)).get();
  if (!existingSettings) {
    db.insert(schema.siteSettings).values({ id: 1, config: DEFAULT_SITE_CONFIG }).run();
  }

  let defaultType = getDefaultRecordType(db, schema);
  if (!defaultType) {
    defaultType = createRecordType(db, schema, {
      name: 'Seal / Seal Impression',
      slug: 'seal-impression',
      description: 'Default catalog type seeded from the Persepolis seal-impression documentation model.',
      isDefault: true,
      schemaJson: DEFAULT_CATALOG_SCHEMA,
    });
  }

  const untyped = db.select({ id: schema.records.id }).from(schema.records).where(sql`${schema.records.recordTypeId} IS NULL`).all();
  if (untyped.length && defaultType) {
    db.update(schema.records).set({ recordTypeId: defaultType.id }).where(sql`${schema.records.recordTypeId} IS NULL`).run();
  }

  if (!db.select({ id: schema.catalogViews.id }).from(schema.catalogViews).get()) {
    createCatalogView(db, schema, {
      name: 'All records',
      slug: 'all-records',
      isDefault: true,
      isPublic: true,
      config: DEFAULT_VIEW_CONFIG,
    });
  }
}
