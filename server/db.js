import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { eq } from 'drizzle-orm';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import dotenv from 'dotenv';
import fs from 'fs';
import * as schema from './schema.js';
import { backfillRecordSlugs } from './lib/slug.js';
import { runMigrations } from './lib/runMigrations.js';
import { backfillRecordRevisions } from './lib/recordRevisions.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory exists synchronously before initializing the database
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize SQLite database and Drizzle ORM
runMigrations({ dataDir });

const sqlite = new Database(path.join(dataDir, 'database.sqlite'));
export const db = drizzle(sqlite, { schema });

backfillRecordSlugs(db, schema);
backfillRecordRevisions(db, schema);

/**
 * Hashes a plain text password using PBKDF2.
 * @param {string} password - The plain text password to hash.
 * @returns {string} The salt and hash combined, separated by a colon.
 */
export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verifies a plain text password against a stored salt:hash string.
 * @param {string} password - The plain text password to verify.
 * @param {string} storedPassword - The stored salt:hash string from the database.
 * @returns {boolean} True if the password matches, false otherwise.
 */
export function verifyPassword(password, storedPassword) {
  if (!storedPassword) return false;
  const parts = storedPassword.split(':');
  if (parts.length !== 2) return false;
  const [salt, hash] = parts;
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
}

/** Drizzle JSON columns return arrays; legacy rows may still be JSON strings. */
export function parsePermissions(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

// Seed & update admin user on every startup
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';

// Defined as a native array. Drizzle handles JSON serialization automatically.
const ALL_PERMISSIONS = ['upload_rti', 'edit_record', 'delete_record', 'manage_users', 'private_notes', 'annotate', 'comment'];

// Check if the admin user already exists
const existingAdmin = db.query.users.findFirst({
  where: eq(schema.users.username, ADMIN_USERNAME),
  columns: { id: true }
});

if (!existingAdmin) {
  // Create default admin if it doesn't exist
  db.insert(schema.users).values({
    username: ADMIN_USERNAME,
    passwordHash: hashPassword(ADMIN_PASSWORD),
    role: 'admin',
    permissions: ALL_PERMISSIONS,
  }).run();
  console.log(`Seeded default admin user: ${ADMIN_USERNAME}`);
} else {
  // Ensure existing admin always has full permissions on startup
  db.update(schema.users)
    .set({
      role: 'admin',
      permissions: ALL_PERMISSIONS
    })
    .where(eq(schema.users.username, ADMIN_USERNAME))
    .run();
}

export { schema };
export default db;