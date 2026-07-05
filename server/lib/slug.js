import { eq } from 'drizzle-orm';
import { normalizeMetadata } from './metadataFields.js';

/** Normalize a string into a URL-safe slug (lowercase, a-z 0-9 _ -). */
export function slugify(text) {
  return String(text ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Prefer registration number, then RTI filename, then record name. */
export function deriveSlugBase(record) {
  const meta = normalizeMetadata(record.metadata);
  return (
    slugify(meta.primaryRegistrationNumber) ||
    slugify(meta.rtiFileName) ||
    slugify(record.name) ||
    'record'
  );
}

export function ensureUniqueSlug(db, schema, base, excludeId = null) {
  let root = slugify(base) || 'record';
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

export function assignSlugForRecord(db, schema, record, { force = false } = {}) {
  if (!record) return null;
  if (record.slug && !force) return record.slug;

  const base = deriveSlugBase(record);
  const slug = ensureUniqueSlug(db, schema, base, record.id);
  db.update(schema.records).set({ slug }).where(eq(schema.records.id, record.id)).run();
  return slug;
}

export function backfillRecordSlugs(db, schema) {
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
export function resolveRecordFromParam(db, schema, param) {
  if (param == null || param === '') return null;

  const raw = String(param).trim();
  if (/^\d+$/.test(raw)) {
    const byId = db.select().from(schema.records).where(eq(schema.records.id, Number(raw))).get();
    if (byId) return byId;
  }

  const bySlug = db.select().from(schema.records).where(eq(schema.records.slug, raw)).get();
  if (bySlug) return bySlug;

  const bySlugCi = db.select().from(schema.records).all().find(
    (r) => r.slug && r.slug.toLowerCase() === raw.toLowerCase()
  );
  if (bySlugCi) return bySlugCi;

  const all = db.select().from(schema.records).all();
  const meta = all.find((r) => {
    const m = normalizeMetadata(r.metadata);
    const candidates = [m.primaryRegistrationNumber, m.rtiFileName, m.secondaryRegistrationNumber]
      .filter(Boolean)
      .map((c) => c.toLowerCase());
    return candidates.includes(raw.toLowerCase());
  });
  return meta || null;
}

export function recordPublicPath(record) {
  return `/record/${record.slug || record.id}`;
}
