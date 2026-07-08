import type Database from 'better-sqlite3';

/** Columns that may be missing on legacy databases (not fully migrated). */
const RECORDS_COLUMNS = [
  { name: 'progress', definition: 'integer DEFAULT 0' },
  { name: 'message', definition: 'text' },
  { name: 'direction', definition: "text DEFAULT 'ltr'" },
  { name: 'output_type', definition: "text DEFAULT 'tiles'" },
  { name: 'folder_url', definition: 'text' },
  { name: 'tiff_url', definition: 'text' },
  { name: 'thumbnail_url', definition: 'text' },
  { name: 'image_embedding', definition: 'text' },
  { name: 'is_published', definition: 'integer DEFAULT 0' },
  { name: 'original_file_path', definition: 'text' },
  { name: 'weights_file_path', definition: 'text' },
  { name: 'quality', definition: 'integer' },
  { name: 'tile_size', definition: 'integer' },
  { name: 'format', definition: 'text' },
  { name: 'metadata', definition: "text DEFAULT '{}'" },
  { name: 'slug', definition: 'text' },
] as const;

/** Apply legacy column fixes missing from older DBs. */
export function ensureRecordsSchema(sqlite: Database.Database) {
  const cols = new Set(
    (sqlite.pragma('table_info(records)') as { name: string }[]).map((c) => c.name),
  );

  for (const { name, definition } of RECORDS_COLUMNS) {
    if (cols.has(name)) continue;
    sqlite.exec(`ALTER TABLE \`records\` ADD \`${name}\` ${definition}`);
    console.log(`Schema repair: added records.${name}`);
    cols.add(name);
  }

  const indexes = new Set(
    (sqlite.pragma('index_list(records)') as { name: string }[]).map((idx) => idx.name),
  );
  if (!indexes.has('records_slug_unique')) {
    sqlite.exec('CREATE UNIQUE INDEX IF NOT EXISTS `records_slug_unique` ON `records` (`slug`)');
    console.log('Schema repair: added records_slug_unique index');
  }
}

/** Apply legacy column fixes on record_annotations. */
export function ensureAnnotationSchema(sqlite: Database.Database) {
  const tableExists = sqlite
    .prepare("SELECT 1 AS ok FROM sqlite_master WHERE type = 'table' AND name = 'record_annotations'")
    .get();
  if (!tableExists) return;

  const cols = new Set(
    (sqlite.pragma('table_info(record_annotations)') as { name: string }[]).map((c) => c.name),
  );
  if (!cols.has('source')) {
    sqlite.exec(`ALTER TABLE \`record_annotations\` ADD \`source\` text DEFAULT 'manual'`);
    console.log('Schema repair: added record_annotations.source');
  }
}
