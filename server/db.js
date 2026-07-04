import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, 'data');
try { import('fs').then(fs => fs.mkdirSync(dataDir, { recursive: true })); } catch(e) {}

const dbPath = path.join(dataDir, 'database.sqlite');
const db = new Database(dbPath);

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    date TEXT NOT NULL,
    folder_url TEXT,
    tiff_url TEXT,
    output_type TEXT DEFAULT 'tiles',
    status TEXT NOT NULL,
    progress INTEGER DEFAULT 0,
    is_published INTEGER DEFAULT 0,
    direction TEXT DEFAULT 'ltr'
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL,
    permissions TEXT NOT NULL
  )
`);

// Add progress column to existing tables if missing
try {
  db.exec(`ALTER TABLE records ADD COLUMN progress INTEGER DEFAULT 0;`);
} catch (e) {
  // Column already exists
}

// Add is_published column to existing tables if missing
try {
  db.exec(`ALTER TABLE records ADD COLUMN is_published INTEGER DEFAULT 0;`);
} catch (e) {}

// Add thumbnail_url column to existing tables if missing
try {
  db.exec(`ALTER TABLE records ADD COLUMN thumbnail_url TEXT;`);
} catch (e) {}

// Add direction column to existing tables if missing
try {
  db.exec(`ALTER TABLE records ADD COLUMN direction TEXT DEFAULT 'ltr';`);
} catch (e) {}

// Add tiff_url column for GeoTIFF output mode
try {
  db.exec(`ALTER TABLE records ADD COLUMN tiff_url TEXT;`);
} catch (e) {}

// Add output_type column to distinguish 'tiles' vs 'geotiff'
try {
  db.exec(`ALTER TABLE records ADD COLUMN output_type TEXT DEFAULT 'tiles';`);
} catch (e) {}

// Add original_file_path column for retries if missing
try {
  db.exec(`ALTER TABLE records ADD COLUMN original_file_path TEXT;`);
} catch (e) {}

// Add weights_file_path column for retries if missing
try {
  db.exec(`ALTER TABLE records ADD COLUMN weights_file_path TEXT;`);
} catch (e) {}

// Add quality column for retries if missing
try {
  db.exec(`ALTER TABLE records ADD COLUMN quality INTEGER;`);
} catch (e) {}

// Add tile_size column for retries if missing
try {
  db.exec(`ALTER TABLE records ADD COLUMN tile_size INTEGER;`);
} catch (e) {}

// Add format column for retries if missing
try {
  db.exec(`ALTER TABLE records ADD COLUMN format TEXT;`);
} catch (e) {}

// Password hashing helpers
export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedPassword) {
  if (!storedPassword) return false;
  const parts = storedPassword.split(':');
  if (parts.length !== 2) return false;
  const [salt, hash] = parts;
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
}

// Seed admin user if empty
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';

const userCount = db.prepare(`SELECT count(*) as count FROM users`).get();
if (userCount.count === 0) {
  const hash = hashPassword(ADMIN_PASSWORD);
  db.prepare(`
    INSERT INTO users (username, password_hash, role, permissions)
    VALUES (?, ?, ?, ?)
  `).run(
    ADMIN_USERNAME,
    hash,
    'admin',
    JSON.stringify(['upload_rti', 'edit_record', 'delete_record', 'manage_users'])
  );
  console.log(`Seeded default admin user: ${ADMIN_USERNAME}`);
}

// Ensure the admin user always has all permissions (migration for existing DBs)
const ALL_PERMISSIONS = JSON.stringify(['upload_rti', 'edit_record', 'delete_record', 'manage_users']);
db.prepare(`
  UPDATE users SET role = 'admin', permissions = ?
  WHERE username = ?
`).run(ALL_PERMISSIONS, ADMIN_USERNAME);

export default db;
