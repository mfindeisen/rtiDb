import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

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

export default db;
