import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import path from 'path';
import { fileURLToPath } from 'url';
import { describe, expect, it } from 'vitest';
import * as schema from '../schema.js';
import { claimRecordForRerun, claimRecordForUpload } from './rtiUploadHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createTestDb() {
  const sqlite = new Database(':memory:');
  sqlite.pragma('foreign_keys = ON');
  const db = drizzle(sqlite, { schema });
  migrate(db, { migrationsFolder: path.join(__dirname, '..', 'migrations') });
  return db;
}

describe('claimRecordForUpload', () => {
  it('lets only one concurrent upload claim a draft record', () => {
    const db = createTestDb();
    const record = db.insert(schema.records).values({
      name: 'Draft',
      date: new Date().toISOString(),
      status: 'draft',
    }).returning({ id: schema.records.id }).get();

    const first = claimRecordForUpload(db, schema, record.id, { status: 'processing', progress: 0 });
    const second = claimRecordForUpload(db, schema, record.id, { status: 'processing', progress: 0 });

    expect(first).toBe(true);
    expect(second).toBe(false);
  });

  it('rejects uploads for failed records that still have source files', () => {
    const db = createTestDb();
    const record = db.insert(schema.records).values({
      name: 'Failed',
      date: new Date().toISOString(),
      status: 'error',
      originalFilePath: '/tmp/failed.ptm',
    }).returning({ id: schema.records.id }).get();

    expect(claimRecordForUpload(db, schema, record.id, { status: 'processing' })).toBe(false);
    expect(claimRecordForRerun(db, schema, record.id)).toBe(true);
    expect(claimRecordForRerun(db, schema, record.id)).toBe(false);
  });
});
