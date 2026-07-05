#!/usr/bin/env node
/**
 * Runs inside the server Docker image (compose run or exec).
 * Applies DB migrations, then imports catalog data from the Word doc.
 */
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractCatalogFromDocx } from './extract-catalog-from-doc.mjs';

const require = createRequire('/app/package.json');
const Database = require('better-sqlite3');

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = '/app/data/database.sqlite';
const DOCX_PATH = process.env.RTIDB_DOCX || join(__dirname, '..', 'for dear Matthias .docx');

function parseArgs(argv) {
  return {
    dryRun: argv.includes('--dry-run'),
    force: argv.includes('--force'),
    overwrite: argv.includes('--overwrite'),
  };
}

async function ensureDatabaseReady() {
  const { runMigrations } = await import('/app/lib/runMigrations.js');
  runMigrations();
}

function upsertRecord(record, metadata, { force, overwrite }) {
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
      db.close();
      process.exit(1);
    }

    const row = db.prepare(
      'SELECT id, name, status, length(metadata) AS meta_len FROM records WHERE id = ?'
    ).get(existing.id);
    console.log(
      `Updated id=${row.id} name="${row.name}" status=${row.status} metadata_bytes=${row.meta_len}`
    );
    db.close();
    return row.id;
  }

  if (!force && existing) {
    console.error(
      `Record already exists: id=${existing.id} name="${existing.name}" status=${existing.status}. ` +
      'Re-run with --overwrite to update metadata, or --force to create another draft.'
    );
    db.close();
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
  console.log(
    `Created draft id=${row.id} name="${row.name}" status=${row.status} metadata_bytes=${row.meta_len}`
  );
  db.close();
  return row.id;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const { record, metadata } = extractCatalogFromDocx(DOCX_PATH);

  const filledFields = Object.keys(metadata).filter((k) => metadata[k]).length;

  console.log('Import catalog record from Word doc');
  console.log(`  Source:   ${DOCX_PATH}`);
  console.log(`  Name:     ${record.name}`);
  console.log(`  Metadata: ${filledFields} fields from doc Example column`);
  if (args.overwrite) {
    console.log('  Mode:     overwrite existing record (RTI files & status preserved)');
  } else {
    console.log('  Status:   new draft — upload RTI scan in admin afterwards');
  }

  if (args.dryRun) {
    console.log('\n[DRY RUN] No changes written.');
    console.log(JSON.stringify({ record, metadata }, null, 2));
    return;
  }

  console.log('Applying database migrations...');
  await ensureDatabaseReady();

  const id = upsertRecord(record, metadata, args);
  console.log('\nNext steps:');
  console.log(`  1. Admin → Upload RTI → attach to "${record.name}"`);
  if (id) {
    console.log(`  2. Catalog preview: /record/${id}`);
  }
}

try {
  await main();
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
