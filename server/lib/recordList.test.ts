import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import path from 'path';
import { fileURLToPath } from 'url';
import { describe, expect, it } from 'vitest';
import * as schema from '../schema.js';
import { pageRecords } from './recordList.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createTestDb() {
  const sqlite = new Database(':memory:');
  sqlite.pragma('foreign_keys = ON');
  const db = drizzle(sqlite, { schema });
  migrate(db, { migrationsFolder: path.join(__dirname, '..', 'migrations') });
  return db;
}

describe('pageRecords', () => {
  it('pages published records in SQL without returning the full catalog', () => {
    const db = createTestDb();
    for (const name of ['A', 'B', 'C']) {
      db.insert(schema.records).values({
        name,
        date: new Date().toISOString(),
        status: 'done',
        isPublished: 1,
        slug: name.toLowerCase(),
      }).run();
    }
    db.insert(schema.records).values({
      name: 'Draft',
      date: new Date().toISOString(),
      status: 'draft',
      isPublished: 0,
      slug: 'draft',
    }).run();

    const first = pageRecords(db, schema, { published: 'published', page: 1, limit: 2, sort: 'name', dir: 'asc' });
    expect(first.total).toBe(3);
    expect(first.totalPages).toBe(2);
    expect(first.results.map((row) => row.name)).toEqual(['A', 'B']);

    const second = pageRecords(db, schema, { published: 'published', page: 2, limit: 2, sort: 'name', dir: 'asc' });
    expect(second.results.map((row) => row.name)).toEqual(['C']);
  });
});
