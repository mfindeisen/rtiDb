import { eq, sql } from 'drizzle-orm';
import { normalizeMetadata } from './metadataFields.js';
import type { AppDb, AppSchema, DbRecord } from '../types/index.js';

/** Normalize a string into a URL-safe slug (lowercase, a-z 0-9 _ -). */
export function slugify(text: unknown): string {
  return String(text ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** All-digit slugs collide with numeric record ids in /record/:id routes. */
export function avoidNumericSlug(slug: string): string {
  return /^\d+$/.test(slug) ? `r-${slug}` : slug;
}

/** Prefer registration number, then RTI filename, then record name. */
export function deriveSlugBase(record: Pick<DbRecord, 'metadata' | 'name'>) {
  const meta = normalizeMetadata(record.metadata);
  return avoidNumericSlug(
    slugify(meta.primaryRegistrationNumber) ||
    slugify(meta.rtiFileName) ||
    slugify(record.name) ||
    'record',
  );
}

export function ensureUniqueSlug(
  db: AppDb,
  schema: AppSchema,
  base: string,
  excludeId: number | null = null,
): string {
  const root = avoidNumericSlug(slugify(base) || 'record');
  let candidate = root;
  let suffix = 2;

  while (true) {
    const existing = db.select().from(schema.records).where(eq(schema.records.slug, candidate)).get();
    if (!existing || (excludeId != null && existing.id === excludeId)) {
      return candidate;
    }
    candidate = `${root}-${suffix}`;
    suffix += 1;
  }
}

export function assignSlugForRecord(
  db: AppDb,
  schema: AppSchema,
  record: DbRecord | null | undefined,
  { force = false }: { force?: boolean } = {},
): string | null {
  if (!record) return null;
  if (record.slug && !force) return record.slug;

  const base = deriveSlugBase(record);
  const slug = ensureUniqueSlug(db, schema, base, record.id);
  db.update(schema.records).set({ slug }).where(eq(schema.records.id, record.id)).run();
  return slug;
}

/** True when the stored slug is still the auto name-based value (plus uniqueness suffix). */
export function slugLooksAutoAssigned(record: Pick<DbRecord, 'slug' | 'name'>): boolean {
  if (!record.slug) return true;
  const nameSlug = avoidNumericSlug(slugify(record.name) || 'record');
  return record.slug === nameSlug || record.slug.startsWith(`${nameSlug}-`);
}

/** Recompute slug when a registration number is added to a still-auto slug. */
export function refreshSlugIfAuto(
  db: AppDb,
  schema: AppSchema,
  record: DbRecord | null | undefined,
): string | null {
  if (!record) return null;
  const desired = deriveSlugBase(record);
  if (!record.slug) return assignSlugForRecord(db, schema, record);
  if (record.slug === desired || record.slug.startsWith(`${desired}-`)) return record.slug;
  if (!slugLooksAutoAssigned(record)) return record.slug;
  return assignSlugForRecord(db, schema, record, { force: true });
}

export function backfillRecordSlugs(db: AppDb, schema: AppSchema) {
  const rows = db.select().from(schema.records).all();
  let updated = 0;
  for (const row of rows) {
    if (row.slug) continue;
    assignSlugForRecord(db, schema, row);
    updated += 1;
  }
  if (updated > 0) {
    console.log(`Backfilled slugs for ${updated} record(s).`);
  }
}

/**
 * Resolve a route/API param to a record — numeric id, slug, or legacy registration lookup.
 */
export function resolveRecordFromParam(
  db: AppDb,
  schema: AppSchema,
  param: string | string[] | number | null | undefined,
): DbRecord | null {
  if (param == null || param === '') return null;
  if (Array.isArray(param)) param = param[0];
  if (param == null || param === '') return null;

  const raw = String(param).trim();
  const bySlug = db.select().from(schema.records).where(eq(schema.records.slug, raw)).get();
  if (bySlug) return bySlug;

  const bySlugCi = db.select()
    .from(schema.records)
    .where(sql`lower(${schema.records.slug}) = ${raw.toLowerCase()}`)
    .get();
  if (bySlugCi) return bySlugCi;

  if (/^\d+$/.test(raw)) {
    const byId = db.select().from(schema.records).where(eq(schema.records.id, Number(raw))).get();
    if (byId) return byId;
  }

  const needle = raw.toLowerCase();
  return db.select()
    .from(schema.records)
    .where(sql`
      lower(ifnull(json_extract(${schema.records.metadata}, '$.primaryRegistrationNumber'), '')) = ${needle}
      OR lower(ifnull(json_extract(${schema.records.metadata}, '$.rtiFileName'), '')) = ${needle}
      OR lower(ifnull(json_extract(${schema.records.metadata}, '$.secondaryRegistrationNumber'), '')) = ${needle}
    `)
    .get() ?? null;
}

export function recordPublicPath(record: Pick<DbRecord, 'slug' | 'id'>) {
  return `/record/${record.slug || record.id}`;
}
