#!/usr/bin/env node
/**
 * Runs inside rtidb-server container. Inserts or updates a catalog record.
 */
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';

const require = createRequire('/app/package.json');
const Database = require('better-sqlite3');

const DB_PATH = '/app/data/database.sqlite';
const PAYLOAD_PATH = '/tmp/enrich-payload.json';

const { record, metadata, force, overwrite } = JSON.parse(readFileSync(PAYLOAD_PATH, 'utf8'));

const db = new Database(DB_PATH);

const existing = db.prepare(
  `SELECT id, name, status FROM records WHERE name = ? ORDER BY id DESC LIMIT 1`
).get(record.name);

if (overwrite && existing) {
  const result = db.prepare(
    `UPDATE records SET description = ?, direction = ?, metadata = ? WHERE id = ?`
  ).run(
    record.description || '',
    record.direction || 'ltr',
    JSON.stringify(metadata),
    existing.id
  );

  if (result.changes === 0) {
    console.error(`No record updated for id=${existing.id}`);
    process.exit(1);
  }

  const row = db.prepare(
    'SELECT id, name, status, length(metadata) AS meta_len FROM records WHERE id = ?'
  ).get(existing.id);
  console.log(
    `Updated id=${row.id} name="${row.name}" status=${row.status} metadata_bytes=${row.meta_len}`
  );
  db.close();
  process.exit(0);
}

if (!force && existing) {
  console.error(
    `Record already exists: id=${existing.id} name="${existing.name}" status=${existing.status}. ` +
    `Re-run with --overwrite to update metadata, or --force to create another draft.`
  );
  process.exit(1);
}

const now = new Date().toISOString();
const result = db.prepare(
  `INSERT INTO records (name, description, date, status, direction, metadata)
   VALUES (?, ?, ?, 'draft', ?, ?)`
).run(
  record.name,
  record.description || '',
  now,
  record.direction || 'ltr',
  JSON.stringify(metadata)
);

const id = result.lastInsertRowid;
const row = db.prepare(
  'SELECT id, name, status, length(metadata) AS meta_len FROM records WHERE id = ?'
).get(id);
console.log(`Created draft id=${row.id} name="${row.name}" status=${row.status} metadata_bytes=${row.meta_len}`);
db.close();
