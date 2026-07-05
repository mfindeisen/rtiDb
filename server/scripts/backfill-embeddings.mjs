#!/usr/bin/env node
/**
 * Compute and store CLIP embeddings for all records with thumbnails.
 *
 * Usage (from rtiDb/):
 *   node server/scripts/backfill-embeddings.mjs
 *   node server/scripts/backfill-embeddings.mjs --force  # recompute existing
 *
 * Docker:
 *   docker compose exec server node scripts/backfill-embeddings.mjs
 */
import path from 'path';
import { fileURLToPath } from 'url';
import db, { schema } from '../db.js';
import { updateRecordImageEmbedding } from '../lib/recordEmbeddings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', 'uploads');

const force = process.argv.includes('--force');

async function main() {
  const records = db.select().from(schema.records).all();
  const withThumb = records.filter((r) => r.thumbnailUrl);
  let updated = 0;
  let skipped = 0;
  let failed = 0;

  console.log(`Backfilling CLIP embeddings for ${withThumb.length} record(s)...`);

  for (const record of withThumb) {
    if (!force && record.imageEmbedding) {
      skipped++;
      continue;
    }
    try {
      const ok = await updateRecordImageEmbedding(
        db,
        schema,
        record.id,
        record.thumbnailUrl,
        uploadDir
      );
      if (ok) {
        updated++;
        console.log(`  ✓ ${record.id} ${record.name}`);
      } else {
        skipped++;
      }
    } catch (err) {
      failed++;
      console.error(`  ✗ ${record.id} ${record.name}: ${err.message}`);
    }
  }

  console.log(`Done. updated=${updated} skipped=${skipped} failed=${failed}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
