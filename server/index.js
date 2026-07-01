import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from './db.js';
import { processRTI } from './lib/rti-maker/index.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Auth Configuration
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_change_in_production';

// Auth Middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

// Middleware
app.use(cors());
app.use(express.json());

// Setup Multer for file uploads
const uploadDir = path.join(__dirname, 'uploads');
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    await fs.mkdir(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Keep original name but ensure uniqueness
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Serve the generated RTI files statically
app.use('/static/uploads', express.static(uploadDir));

// --- SSE Progress Handling ---
let clients = [];
function broadcastProgress(id, progress, message) {
  clients.forEach(client => {
    client.res.write(`data: ${JSON.stringify({ id, progress, message })}\n\n`);
  });
}

app.get('/api/progress', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders(); // flush the headers to establish SSE

  const clientId = Date.now();
  const newClient = { id: clientId, res };
  clients.push(newClient);

  req.on('close', () => {
    clients = clients.filter(client => client.id !== clientId);
  });
});
// ------------------------------

// API: Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// API: Get all finished records
app.get('/api/records', (req, res) => {
  const records = db.prepare('SELECT * FROM records ORDER BY id DESC').all();
  res.json(records);
});

// API: Get single record
app.get('/api/records/:id', (req, res) => {
  const record = db.prepare('SELECT * FROM records WHERE id = ?').get(req.params.id);
  if (record) res.json(record);
  else res.status(404).send('Record not found');
});

// API: Upload and process RTI
app.post('/api/upload', authMiddleware, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const { name, description, quality, tileSize, format } = req.body;
  
  if (!name || !req.file) {
    return res.status(400).send('Name and file are required');
  }

  // Use default options or user provided settings
  const options = {
    quality: parseInt(quality) || 90,
    tileSize: parseInt(tileSize) || 256,
    format: format || 'jpg'
  };

  const recordId = db.prepare('INSERT INTO records (name, description, date, status) VALUES (?, ?, ?, ?)').run(
    name, description || '', new Date().toISOString(), 'processing'
  ).lastInsertRowid;

  const originalFilePath = req.file.path;

  // Run processing in background
  (async () => {
    try {
      broadcastProgress(recordId, 0);
      const outputDir = await processRTI(originalFilePath, {
        ...options,
        onProgress: (percent, message) => {
          if (percent !== undefined && percent !== null) {
            db.prepare('UPDATE records SET progress = ? WHERE id = ?').run(percent, recordId);
          }
          broadcastProgress(recordId, percent, message);
        }
      });
      
      // Update record with done status and folder url
      // outputDir is absolute, we want the relative name
      const folderName = path.basename(outputDir);
      const publicUrl = `/static/uploads/${folderName}`;
      const thumbnailUrl = `${publicUrl}/1_1.${options.format || 'jpg'}`;
      
      db.prepare('UPDATE records SET folder_url = ?, thumbnail_url = ?, status = ?, progress = 100 WHERE id = ?').run(publicUrl, thumbnailUrl, 'done', recordId);
      broadcastProgress(recordId, 100);

      // Delete the original uploaded file
      await fs.unlink(originalFilePath);
      console.log(`Deleted original file: ${originalFilePath}`);

    } catch (error) {
      console.error(`Error processing RTI ${recordId}:`, error);
      db.prepare('UPDATE records SET status = ? WHERE id = ?').run('error', recordId);
      broadcastProgress(recordId, -1); // error signal
    }
  })();

  res.json({ success: true, id: recordId });
});

// API: Update record
app.put('/api/records/:id', authMiddleware, (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).send('Name is required');
  
  try {
    db.prepare('UPDATE records SET name = ?, description = ? WHERE id = ?').run(name, description, req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).send('Database error');
  }
});

// API: Toggle publish status
app.put('/api/records/:id/publish', authMiddleware, (req, res) => {
  const { is_published } = req.body;
  if (typeof is_published !== 'boolean') return res.status(400).send('is_published boolean required');
  
  try {
    db.prepare('UPDATE records SET is_published = ? WHERE id = ?').run(is_published ? 1 : 0, req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error('Publish error:', err);
    res.status(500).send('Database error');
  }
});

// API: Delete record
app.delete('/api/records/:id', authMiddleware, async (req, res) => {
  try {
    const record = db.prepare('SELECT * FROM records WHERE id = ?').get(req.params.id);
    if (!record) return res.status(404).send('Record not found');

    // Delete record from DB
    db.prepare('DELETE FROM records WHERE id = ?').run(req.params.id);

    // Delete associated files
    if (record.folder_url) {
      // folder_url is like "/static/uploads/12345-scan"
      // We need to map it back to the absolute local path
      const folderName = path.basename(record.folder_url);
      const localPath = path.join(uploadDir, folderName);
      try {
        await fs.rm(localPath, { recursive: true, force: true });
        console.log(`Deleted folder: ${localPath}`);
      } catch (err) {
        console.error(`Failed to delete folder: ${localPath}`, err);
      }
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).send('Database error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
