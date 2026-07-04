import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db, { hashPassword, verifyPassword } from './db.js';
import { processRTI, processRtiToTiff } from './lib/rtiprep.js';

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

// RBAC Middleware
const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // Admins bypass all permission checks
    if (req.user.role === 'admin') {
      return next();
    }
    if (req.user.permissions && req.user.permissions.includes(permission)) {
      return next();
    }
    return res.status(403).json({ error: `Forbidden: Requires permission '${permission}'` });
  };
};

const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ error: 'Forbidden: Admin access required' });
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
const uploadFields = upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'latentMap', maxCount: 1 },
  { name: 'weights', maxCount: 1 }
]);

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
  try {
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (user && verifyPassword(password, user.password_hash)) {
      const permissions = JSON.parse(user.permissions || '[]');
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role, permissions },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      res.json({ success: true, token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server database error' });
  }
});

// API: Get all finished records
app.get('/api/records', (req, res) => {
  const records = db.prepare('SELECT * FROM records ORDER BY id DESC').all();
  res.json(records);
});

const getFolderStats = async (dirPath) => {
  let totalSize = 0;
  let fileCount = 0;
  
  const walk = async (dir) => {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          await walk(fullPath);
        } else if (entry.isFile()) {
          const stat = await fs.stat(fullPath);
          totalSize += stat.size;
          fileCount++;
        }
      }
    } catch (e) {
      // Ignore if folder doesn't exist
    }
  };
  
  await walk(dirPath);
  return { totalSize, fileCount };
};

// API: Get single record
app.get('/api/records/:id', async (req, res) => {
  const record = db.prepare('SELECT * FROM records WHERE id = ?').get(req.params.id);
  if (record) {
    let folderSize = 0;
    let fileCount = 0;
    if (record.status === 'done' && record.folder_url) {
      const folderName = path.basename(record.folder_url);
      const localPath = path.join(uploadDir, folderName);
      const stats = await getFolderStats(localPath);
      folderSize = stats.totalSize;
      fileCount = stats.fileCount;
    }
    res.json({
      ...record,
      folder_size: folderSize,
      file_count: fileCount
    });
  } else {
    res.status(404).send('Record not found');
  }
});

// --- Reusable processing pipeline helper ---
async function runProcessingPipeline(recordId, originalFilePath, weightsPath, options, outputType) {
  const isGeoTiff = (outputType === 'geotiff' || outputType === 'neural');
  try {
    broadcastProgress(recordId, 0);

    if (isGeoTiff) {
      // --- GeoTIFF/Neural mode: use rtiprep Go binary ---
      const tiffPath = await processRtiToTiff(originalFilePath, {
        weightsPath: weightsPath || undefined,
        onProgress: (percent, message) => {
          if (percent !== undefined && percent !== null) {
            db.prepare('UPDATE records SET progress = ? WHERE id = ?').run(percent, recordId);
          }
          broadcastProgress(recordId, percent, message);
        }
      });
      const tiffName = path.basename(tiffPath);
      const tiffPublicUrl = `/static/uploads/${tiffName}`;
      const thumbName = tiffName.substring(0, tiffName.lastIndexOf('.')) + '.jpg';
      const thumbPublicUrl = `/static/uploads/${thumbName}`;
      db.prepare('UPDATE records SET tiff_url = ?, thumbnail_url = ?, status = ?, progress = 100 WHERE id = ?').run(tiffPublicUrl, thumbPublicUrl, 'done', recordId);
      broadcastProgress(recordId, 100);
    } else {
      // --- Classic tile mode: use rtiprep ---
      const outputDir = await processRTI(originalFilePath, {
        ...options,
        onProgress: (percent, message) => {
          if (percent !== undefined && percent !== null) {
            db.prepare('UPDATE records SET progress = ? WHERE id = ?').run(percent, recordId);
          }
          broadcastProgress(recordId, percent, message);
        }
      });
      const folderName = path.basename(outputDir);
      const publicUrl = `/static/uploads/${folderName}`;
      const thumbnailUrl = `${publicUrl}/1_1.${options.format || 'jpg'}`;
      db.prepare('UPDATE records SET folder_url = ?, thumbnail_url = ?, status = ?, progress = 100 WHERE id = ?').run(publicUrl, thumbnailUrl, 'done', recordId);
      broadcastProgress(recordId, 100);
    }

    // Delete the original uploaded file(s) on success
    try {
      await fs.unlink(originalFilePath);
      console.log(`Deleted original file: ${originalFilePath}`);
      if (weightsPath) {
        await fs.unlink(weightsPath);
        console.log(`Deleted weights file: ${weightsPath}`);
      }
      // Also clear the file paths in the database since they are no longer on disk
      db.prepare('UPDATE records SET original_file_path = NULL, weights_file_path = NULL WHERE id = ?').run(recordId);
    } catch (err) {
      console.error('Error unlinking original files on success:', err);
    }

  } catch (error) {
    console.error(`Error processing RTI ${recordId}:`, error);
    db.prepare('UPDATE records SET status = ? WHERE id = ?').run('error', recordId);
    broadcastProgress(recordId, -1);
    // Note: We DO NOT delete originalFilePath or weightsPath here so we can rerun
  }
}

// API: Upload and process RTI
app.post('/api/upload', authMiddleware, requirePermission('upload_rti'), uploadFields, async (req, res) => {
  const { name, description, quality, tileSize, format, direction, outputType, uploadMode } = req.body;
  
  if (!name) {
    return res.status(400).send('Name is required');
  }

  const isNeural = uploadMode === 'neural';

  if (isNeural) {
    if (!req.files || !req.files['latentMap'] || !req.files['weights']) {
      return res.status(400).send('Both latentMap image and weights JSON files are required for Neural RTI.');
    }
  } else {
    if (!req.files || !req.files['file']) {
      return res.status(400).send('No file uploaded.');
    }
  }

  const isGeoTiff = isNeural || (outputType === 'geotiff');

  // Use default options or user provided settings
  const options = {
    quality: parseInt(quality) || 90,
    tileSize: parseInt(tileSize) || 256,
    format: format || 'jpg'
  };

  const originalFilePath = isNeural ? req.files['latentMap'][0].path : req.files['file'][0].path;
  const weightsPath = isNeural ? req.files['weights'][0].path : null;

  const recordId = db.prepare('INSERT INTO records (name, description, date, status, direction, output_type, original_file_path, weights_file_path, quality, tile_size, format) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').run(
    name, description || '', new Date().toISOString(), 'processing', direction || 'ltr', isNeural ? 'neural' : (isGeoTiff ? 'geotiff' : 'tiles'),
    originalFilePath, weightsPath, options.quality, options.tileSize, options.format
  ).lastInsertRowid;

  // Run processing in background
  runProcessingPipeline(recordId, originalFilePath, weightsPath, options, isNeural ? 'neural' : (isGeoTiff ? 'geotiff' : 'tiles'));

  res.json({ success: true, id: recordId });
});

// API: Update record
app.put('/api/records/:id', authMiddleware, requirePermission('edit_record'), (req, res) => {
  const { name, description, direction } = req.body;
  if (!name) return res.status(400).send('Name is required');
  
  try {
    db.prepare('UPDATE records SET name = ?, description = ?, direction = ? WHERE id = ?').run(name, description, direction || 'ltr', req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).send('Database error');
  }
});

// API: Toggle publish status
app.put('/api/records/:id/publish', authMiddleware, requirePermission('edit_record'), (req, res) => {
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
app.delete('/api/records/:id', authMiddleware, requirePermission('delete_record'), async (req, res) => {
  try {
    const record = db.prepare('SELECT * FROM records WHERE id = ?').get(req.params.id);
    if (!record) return res.status(404).send('Record not found');

    // Delete record from DB
    db.prepare('DELETE FROM records WHERE id = ?').run(req.params.id);

    // Delete associated files (classic tiles)
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

    // Delete GeoTIFF file
    if (record.tiff_url) {
      const tiffName = path.basename(record.tiff_url);
      const tiffPath = path.join(uploadDir, tiffName);
      try {
        await fs.unlink(tiffPath);
        console.log(`Deleted tiff file: ${tiffPath}`);
      } catch (err) {
        console.error(`Failed to delete tiff file: ${tiffPath}`, err);
      }
    }

    // Delete thumbnail image file
    if (record.thumbnail_url) {
      const thumbName = path.basename(record.thumbnail_url);
      const thumbPath = path.join(uploadDir, thumbName);
      try {
        await fs.unlink(thumbPath);
        console.log(`Deleted thumbnail file: ${thumbPath}`);
      } catch (err) {}
    }

    // Delete original raw files (if they exist due to error state)
    if (record.original_file_path) {
      try {
        await fs.unlink(record.original_file_path);
        console.log(`Deleted original file: ${record.original_file_path}`);
      } catch (err) {}
    }
    if (record.weights_file_path) {
      try {
        await fs.unlink(record.weights_file_path);
        console.log(`Deleted weights file: ${record.weights_file_path}`);
      } catch (err) {}
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).send('Database error');
  }
});

// API: Rerun failed record
app.post('/api/records/:id/rerun', authMiddleware, requirePermission('upload_rti'), async (req, res) => {
  try {
    const record = db.prepare('SELECT * FROM records WHERE id = ?').get(req.params.id);
    if (!record) {
      return res.status(404).send('Record not found');
    }
    if (record.status !== 'error') {
      return res.status(400).send('Only failed records in error state can be rerun');
    }
    if (!record.original_file_path) {
      return res.status(400).send('Original files were already deleted or not found. Cannot rerun.');
    }

    // Check if the original file still exists on disk
    try {
      await fs.access(record.original_file_path);
    } catch (e) {
      return res.status(400).send('Original file no longer exists on server disk.');
    }

    // Reset status to processing and progress to 0
    db.prepare('UPDATE records SET status = ?, progress = 0 WHERE id = ?').run('processing', record.id);

    const options = {
      quality: record.quality || 90,
      tileSize: record.tile_size || 256,
      format: record.format || 'jpg'
    };

    // Run processing in background
    runProcessingPipeline(record.id, record.original_file_path, record.weights_file_path, options, record.output_type);

    res.json({ success: true });
  } catch (err) {
    console.error('Rerun error:', err);
    res.status(500).send('Database or server error');
  }
});

// --- Administrative User Management ---

// GET: List all users (excluding hashes)
app.get('/api/users', authMiddleware, requireAdmin, (req, res) => {
  try {
    const users = db.prepare('SELECT id, username, role, permissions FROM users ORDER BY id ASC').all();
    const parsedUsers = users.map(u => ({
      ...u,
      permissions: JSON.parse(u.permissions || '[]')
    }));
    res.json(parsedUsers);
  } catch (err) {
    console.error('Fetch users error:', err);
    res.status(500).send('Database error');
  }
});

// POST: Create a user
app.post('/api/users', authMiddleware, requireAdmin, (req, res) => {
  const { username, password, role, permissions } = req.body;
  if (!username || !password || !role) {
    return res.status(400).send('Username, password, and role are required');
  }
  
  try {
    const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
    if (existing) {
      return res.status(400).send('Username already exists');
    }

    const hash = hashPassword(password);
    const permStr = JSON.stringify(permissions || []);
    
    const info = db.prepare(`
      INSERT INTO users (username, password_hash, role, permissions)
      VALUES (?, ?, ?, ?)
    `).run(username, hash, role, permStr);
    
    res.json({ success: true, id: info.lastInsertRowid });
  } catch (err) {
    console.error('Create user error:', err);
    res.status(500).send('Database error');
  }
});

// PUT: Edit a user
app.put('/api/users/:id', authMiddleware, requireAdmin, (req, res) => {
  const { username, password, role, permissions } = req.body;
  if (!username || !role) {
    return res.status(400).send('Username and role are required');
  }
  
  try {
    const existing = db.prepare('SELECT id FROM users WHERE username = ? AND id != ?').get(username, req.params.id);
    if (existing) {
      return res.status(400).send('Username already exists');
    }

    const permStr = JSON.stringify(permissions || []);
    
    if (password) {
      const hash = hashPassword(password);
      db.prepare(`
        UPDATE users 
        SET username = ?, password_hash = ?, role = ?, permissions = ?
        WHERE id = ?
      `).run(username, hash, role, permStr, req.params.id);
    } else {
      db.prepare(`
        UPDATE users 
        SET username = ?, role = ?, permissions = ?
        WHERE id = ?
      `).run(username, role, permStr, req.params.id);
    }
    
    res.json({ success: true });
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).send('Database error');
  }
});

// DELETE: Delete a user
app.delete('/api/users/:id', authMiddleware, requireAdmin, (req, res) => {
  if (req.user.id == req.params.id) {
    return res.status(400).send('Cannot delete your own administrator account');
  }
  
  try {
    const info = db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
    if (info.changes === 0) {
      return res.status(404).send('User not found');
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).send('Database error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
