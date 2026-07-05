#!/usr/bin/env node
/**
 * Import a new draft catalog record from "for dear Matthias .docx".
 * Values are read from the document's Example column only (never invented).
 * Writes directly into the Docker container database. Upload the RTI file afterwards in admin.
 *
 * Usage:
 *   ./scripts/enrich-record.sh
 *   ./scripts/enrich-record.sh --dry-run
 *   ./scripts/enrich-record.sh --force      # create even if record with same name exists
 *   ./scripts/enrich-record.sh --overwrite  # update existing record (keeps RTI/status)
 *
 * Env:
 *   RTIDB_DOCX       Path to the Word file (default: for dear Matthias .docx)
 */

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractCatalogFromDocx, DEFAULT_DOCX } from './extract-catalog-from-doc.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const DOCX_PATH = process.env.RTIDB_DOCX || DEFAULT_DOCX;

function parseArgs(argv) {
  return {
    dryRun: argv.includes('--dry-run'),
    force: argv.includes('--force'),
    overwrite: argv.includes('--overwrite'),
  };
}

function resolveDocxAbs() {
  const abs = resolve(PROJECT_ROOT, DOCX_PATH);
  if (!existsSync(abs)) {
    throw new Error(`Word document not found: ${abs}`);
  }
  return abs;
}

function runViaCompose(flags) {
  const docxAbs = resolveDocxAbs();
  const flagArgs = [
    flags.force ? '--force' : '',
    flags.overwrite ? '--overwrite' : '',
  ].filter(Boolean).join(' ');

  const shellCmd =
    'command -v unzip >/dev/null || apk add --no-cache unzip >/dev/null; ' +
    `exec node enrich-record-in-container.mjs${flagArgs ? ` ${flagArgs}` : ''}`;

  return execFileSync(
    'docker',
    [
      'compose', 'run', '--rm', '--no-deps',
      '-w', '/scripts',
      '-e', 'RTIDB_DOCX=/docx/catalog.docx',
      '-v', `${docxAbs}:/docx/catalog.docx:ro`,
      '-v', `${__dirname}:/scripts:ro`,
      'server',
      'sh', '-c', shellCmd,
    ],
    { encoding: 'utf8', cwd: PROJECT_ROOT, stdio: ['pipe', 'pipe', 'inherit'] },
  );
}

function main() {
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

  const out = runViaCompose(args);
  process.stdout.write(out);
  const match = out.match(/(?:Created draft|Updated) id=(\d+)/);
  const id = match ? Number(match[1]) : null;

  console.log('\nRecord sync completed successfully.');
  console.log('\nNext steps:');
  console.log(`  1. Admin → Upload RTI → attach to "${record.name}"`);
  console.log(`  2. Or open: http://localhost:8090/admin`);
  if (id) {
    console.log(`  3. Catalog preview: http://localhost:8090/record/${id}`);
  }
}

try {
  main();
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
