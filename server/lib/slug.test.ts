import { describe, expect, it } from 'vitest';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { eq } from 'drizzle-orm';
import path from 'path';
import { fileURLToPath } from 'url';
import { slugify, deriveSlugBase, resolveRecordFromParam, refreshSlugIfAuto } from './slug.js';
import * as schema from '../schema.js';

describe('slugify', () => {
  it('normalizes text to url-safe slugs', () => {
    expect(slugify('  Hello World!  ')).toBe('hello-world');
    expect(slugify('RTI_2024-001')).toBe('rti_2024-001');
  });

  it('falls back to empty string for non-alphanumeric input', () => {
    expect(slugify('!!!')).toBe('');
  });
});

describe('deriveSlugBase', () => {
  it('prefers registration number over name', () => {
    expect(deriveSlugBase({
      name: 'Fallback Name',
      metadata: { primaryRegistrationNumber: 'REG-42', rtiFileName: 'scan.ptm' },
    })).toBe('reg-42');
  });

  it('prefixes all-digit registration numbers so they cannot collide with ids', () => {
    expect(deriveSlugBase({
      name: 'Seal',
      metadata: { primaryRegistrationNumber: '100' },
    })).toBe('r-100');
  });
});

describe('resolveRecordFromParam', () => {
  it('prefers a matching slug over a numeric record id', () => {
    const sqlite = new Database(':memory:');
    sqlite.pragma('foreign_keys = ON');
    const db = drizzle(sqlite, { schema });
    const __filename = fileURLToPath(import.meta.url);
    migrate(db, { migrationsFolder: path.join(path.dirname(__filename), '..', 'migrations') });

    const byId = db.insert(schema.records).values({
      name: 'Id record',
      date: new Date().toISOString(),
      status: 'done',
      slug: 'lion',
    }).returning().get();

    db.insert(schema.records).values({
      name: 'Slug record',
      date: new Date().toISOString(),
      status: 'done',
      slug: String(byId.id),
    }).run();

    const resolved = resolveRecordFromParam(db, schema, String(byId.id));
    expect(resolved?.name).toBe('Slug record');
    expect(resolveRecordFromParam(db, schema, 'lion')?.name).toBe('Id record');
  });
});

describe('refreshSlugIfAuto', () => {
  it('updates a name-based slug when a registration number is added', () => {
    const sqlite = new Database(':memory:');
    sqlite.pragma('foreign_keys = ON');
    const db = drizzle(sqlite, { schema });
    const __filename = fileURLToPath(import.meta.url);
    migrate(db, { migrationsFolder: path.join(path.dirname(__filename), '..', 'migrations') });

    const created = db.insert(schema.records).values({
      name: 'Seal A',
      date: new Date().toISOString(),
      status: 'draft',
      slug: 'seal-a',
      metadata: {},
    }).returning().get();

    const slug = refreshSlugIfAuto(db, schema, {
      ...created,
      metadata: { primaryRegistrationNumber: 'DEMO-2024-001' },
    });
    expect(slug).toBe('demo-2024-001');
    expect(db.select().from(schema.records).where(eq(schema.records.id, created.id)).get()?.slug).toBe('demo-2024-001');
  });

  it('leaves a custom slug alone', () => {
    const sqlite = new Database(':memory:');
    sqlite.pragma('foreign_keys = ON');
    const db = drizzle(sqlite, { schema });
    const __filename = fileURLToPath(import.meta.url);
    migrate(db, { migrationsFolder: path.join(path.dirname(__filename), '..', 'migrations') });

    const created = db.insert(schema.records).values({
      name: 'Seal A',
      date: new Date().toISOString(),
      status: 'draft',
      slug: 'keep-this',
      metadata: {},
    }).returning().get();

    const slug = refreshSlugIfAuto(db, schema, {
      ...created,
      metadata: { primaryRegistrationNumber: 'DEMO-2024-001' },
    });
    expect(slug).toBe('keep-this');
  });
});
