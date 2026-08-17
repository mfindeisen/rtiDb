import { describe, expect, it } from 'vitest';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import path from 'path';
import { fileURLToPath } from 'url';
import { canListRecordAnnotations, listRecordAnnotations } from './annotationQueries.js';
import type { DbRecord } from '../types/index.js';
import * as schema from '../schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('canListRecordAnnotations', () => {
  const publishedRecord = { isPublished: 1 } as DbRecord;
  const draftRecord = { isPublished: 0 } as DbRecord;

  it('allows guests on published records', () => {
    expect(canListRecordAnnotations(undefined, publishedRecord)).toBe(true);
  });

  it('denies guests on draft records', () => {
    expect(canListRecordAnnotations(undefined, draftRecord)).toBe(false);
  });

  it('allows staff on draft records', () => {
    expect(canListRecordAnnotations({
      id: 1,
      username: 'admin',
      role: 'admin',
      permissions: [],
    }, draftRecord)).toBe(true);
  });
});

describe('listRecordAnnotations visibility', () => {
  it('hides private and team layers from guests', () => {
    const sqlite = new Database(':memory:');
    sqlite.pragma('foreign_keys = ON');
    const db = drizzle(sqlite, { schema });
    migrate(db, { migrationsFolder: path.join(__dirname, '..', 'migrations') });

    const owner = db.insert(schema.users).values({
      username: 'annotator',
      passwordHash: 'x',
      role: 'editor',
      permissions: [],
    }).returning({ id: schema.users.id }).get();

    const record = db.insert(schema.records).values({
      name: 'Seal',
      date: new Date().toISOString(),
      status: 'done',
      isPublished: 1,
    }).returning().get();

    const now = new Date().toISOString();
    const geometry = { type: 'point', x: 0.5, y: 0.5 };
    const rtiView = { light: [0, 0, 1] };
    for (const [label, visibility] of [
      ['private note', 'private'],
      ['team note', 'team'],
      ['published note', 'published'],
    ] as const) {
      db.insert(schema.recordAnnotations).values({
        recordId: record.id,
        userId: owner.id,
        type: 'point',
        geometry,
        label,
        rtiView,
        visibility,
        createdAt: now,
        updatedAt: now,
      }).run();
    }

    const guestHits = listRecordAnnotations(db, schema, record).map((row) => row.label);
    expect(guestHits).toEqual(['published note']);

    const ownerHits = listRecordAnnotations(db, schema, record, {
      id: owner.id,
      username: 'annotator',
      role: 'editor',
      permissions: ['annotate'],
    }).map((row) => row.label);
    expect(new Set(ownerHits)).toEqual(new Set(['published note', 'team note', 'private note']));
  });
});
