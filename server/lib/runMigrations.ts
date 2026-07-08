import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { ensureRecordsSchema, ensureAnnotationSchema } from './schemaRepair.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function runMigrations({ dataDir = path.join(__dirname, '..', 'data') }: { dataDir?: string } = {}) {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const dbPath = path.join(dataDir, 'database.sqlite');
  const sqlite = new Database(dbPath);
  const db = drizzle(sqlite);

  migrate(db, { migrationsFolder: path.join(__dirname, '..', 'migrations') });
  ensureRecordsSchema(sqlite);
  ensureAnnotationSchema(sqlite);

  sqlite.close();
  return dbPath;
}
