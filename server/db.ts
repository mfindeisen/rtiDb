import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import fs from 'fs';
import path from 'path';
import * as schema from './schema.js';
import { backfillRecordSlugs } from './lib/slug.js';
import { runMigrations } from './lib/runMigrations.js';
import { backfillRecordRevisions } from './lib/recordRevisions.js';
import { seedAdminUser } from './lib/bootstrapDb.js';
import type { AppDb } from './types/index.js';
import type { ServerConfig } from './config.js';

export { hashPassword, verifyPassword, parsePermissions } from './lib/auth/password.js';
export { schema };

let dbInstance: AppDb | null = null;

export function bootstrapDatabase(config: ServerConfig): AppDb {
  if (dbInstance) return dbInstance;

  if (!fs.existsSync(config.dataDir)) {
    fs.mkdirSync(config.dataDir, { recursive: true });
  }

  runMigrations({ dataDir: config.dataDir });

  const sqlite = new Database(path.join(config.dataDir, 'database.sqlite'));
  dbInstance = drizzle(sqlite, { schema });

  backfillRecordSlugs(dbInstance, schema);
  backfillRecordRevisions(dbInstance, schema);
  seedAdminUser(dbInstance, schema, config);

  return dbInstance;
}

export function getDb(): AppDb {
  if (!dbInstance) {
    throw new Error('Database not initialized. Call bootstrapDatabase() first.');
  }
  return dbInstance;
}

/** @deprecated Use getDb() after bootstrapDatabase() */
export const db = new Proxy({} as AppDb, {
  get(_target, prop, receiver) {
    return Reflect.get(getDb() as object, prop, receiver);
  },
});

export default db;
