import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db, { hashPassword, verifyPassword, parsePermissions, schema } from './db.js';
import { eq, sql, and } from 'drizzle-orm';
import { processRTI, processRtiToTiff } from './lib/rtiprep.js';
import { normalizeMetadata, formatCatalogDate, formatCatalogDateTime } from './lib/metadataFields.js';
import { searchRecords, parseBboxParam, parseFiltersParam } from './lib/search.js';
import { enqueueImageSearch, getImageSearchJob } from './lib/imageSearchQueue.js';
import { getCachedImageSearch, hashImageFile } from './lib/imageSearchCache.js';
import { consumeRateLimit, imageSearchRateLimitKey, IMAGE_SEARCH_RATE_LIMIT } from './lib/rateLimit.js';
import { enqueueAutoAnnotate, getAutoAnnotateJob } from './lib/autoAnnotateQueue.js';
import { updateRecordImageEmbedding } from './lib/recordEmbeddings.js';
import {
  parseMetadataFiltersFromQuery,
  findRecordByIdentifier,
  buildPublicRecord,
  buildRtiAssets,
  getBaseUrl,
} from './lib/records.js';
import { getExportContent, metadataOnlyPayload, SUPPORTED_EXPORT_FORMATS } from './lib/export.js';
import { buildOpenApiSpec } from './lib/openapi.js';
import { requireCollaboration, requireAnnotate } from './lib/collaboration.js';
import { validateAnnotationBody } from './lib/annotations.js';
import {
  createRecordRevision,
  listRevisions,
  getRevisionDetail,
  compareRevisions,
  getLatestRevision,
  userCanViewRevisions,
} from './lib/recordRevisions.js';
import swaggerUi from 'swagger-ui-express';
import { resolveRecordFromParam, assignSlugForRecord, backfillRecordSlugs, recordPublicPath } from './lib/slug.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

function fetchRecordOr404(req, res) {
  const record = resolveRecordFromParam(db, schema, req.params.id);
  if (!record) {
    res.status(404).json({ error: 'Record not found' });
    return null;
  }
  return record;
}

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

const optionalAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      req.user = jwt.verify(token, JWT_SECRET);
    } catch {
      // ignore invalid token for optional auth
    }
  }
  next();
};

function revisionActor(req) {
  return req.user ? { id: req.user.id, username: req.user.username } : null;
}

function snapshotRecordAfter(db, recordId, action, req, comment = null) {
  const record = db.select().from(schema.records).where(eq(schema.records.id, recordId)).get();
  if (!record) return;
  createRecordRevision(db, schema, {
    recordId,
    record,
    action,
    user: revisionActor(req),
    comment,
  });
}

function snapshotRecordAfterSystem(db, recordId, action, comment = null) {
  const record = db.select().from(schema.records).where(eq(schema.records.id, recordId)).get();
  if (!record) return;
  createRecordRevision(db, schema, {
    recordId,
    record,
    action,
    user: null,
    comment,
  });
}

// Middleware
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// OpenAPI spec + Swagger UI
app.get('/api/openapi.json', (req, res) => {
  res.json(buildOpenApiSpec(req));
});

const SWAGGER_AUTH_BRIDGE = `
(function trySwaggerAuth() {
  var token = localStorage.getItem('adminToken');
  if (!window.ui) {
    setTimeout(trySwaggerAuth, 150);
    return;
  }
  if (!token) return;
  try {
    window.ui.authActions.authorize({
      bearerAuth: {
        name: 'bearerAuth',
        schema: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        value: token,
      },
    });
  } catch (e) {
    console.warn('Swagger auth bridge:', e);
  }
})();
`.trim();

app.get('/api/docs/auth-bridge.js', (req, res) => {
  res.type('application/javascript').send(SWAGGER_AUTH_BRIDGE);
});

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(null, {
  customSiteTitle: 'RTI Database API',
  customCss: '.swagger-ui .topbar { display: none }',
  customJs: '/api/docs/auth-bridge.js',
  swaggerOptions: {
    url: '/api/openapi.json',
    persistAuthorization: true,
    displayRequestDuration: true,
  },
}));

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
const imageSearchUpload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      const tempDir = path.join(uploadDir, 'search-temp');
      await fs.mkdir(tempDir, { recursive: true });
      cb(null, tempDir);
    },
    filename: (req, file, cb) => {
      cb(null, `query-${Date.now()}${path.extname(file.originalname) || '.jpg'}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

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
    const user = db.select().from(schema.users).where(eq(schema.users.username, username)).get();
    if (user && verifyPassword(password, user.passwordHash)) {
      const permissions = parsePermissions(user.permissions);
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

// API discovery
app.get('/api', (req, res) => {
  const base = getBaseUrl(req);
  res.json({
    name: 'RTI Database API',
    version: 1,
    documentation: `${base}/docs/`,
      endpoints: {
        openapi: `${base}/api/openapi.json`,
        swaggerUi: `${base}/api/docs`,
        records: {
        list: `GET ${base}/api/records?published=1&primaryMotif=…&culturalPeriod=…`,
        search: `GET ${base}/api/search?q=…&filters={…}`,
        lookup: `GET ${base}/api/records/lookup/{id-or-registration-number}`,
        detail: `GET ${base}/api/records/{id-or-slug}`,
        metadata: `GET ${base}/api/records/{id-or-slug}/metadata`,
        rti: `GET ${base}/api/records/{id-or-slug}/rti`,
        export: `GET ${base}/api/records/{id-or-slug}/export?format=json|xml|csv|bibtex|ris|iiif`,
        revisions: `GET ${base}/api/records/{id-or-slug}/revisions`,
        revisionCompare: `GET ${base}/api/records/{id-or-slug}/revisions/compare?from=1&to=current`,
        bulkExport: `GET ${base}/api/export/records?format=json|xml|csv&published=1`,
      },
      notes: [
        'Record IDs are numeric. Human-readable slugs (from registration number or name) work in URLs and API paths.',
        'Example viewer URL: /record/DEMO-2024-SEAL-001 — numeric /record/42 still works.',
        'Metadata filters use real field names (primaryMotif, culturalPeriod) or aliases (motif, period, iconography).',
        'For complex queries use /api/search with filters JSON and optional bbox.',
      ],
      exportFormats: SUPPORTED_EXPORT_FORMATS,
    },
  });
});

function sendExport(res, records, format, req) {
  const { contentType, body, filename } = getExportContent(records, format, req);
  const download = req.query.download !== '0';
  res.setHeader('Content-Type', contentType);
  if (download) {
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  }
  res.send(body);
}

// API: Get records (optionally filtered — reuses search logic)
app.get('/api/records', (req, res) => {
  try {
    const allRecords = db.select().from(schema.records).orderBy(sql`${schema.records.id} DESC`).all();
    const hasFilters =
      req.query.q ||
      req.query.filters ||
      req.query.bbox ||
      Object.keys(req.query).some((k) => !['published', 'page', 'limit'].includes(k));

    if (hasFilters) {
      const result = searchRecords(allRecords, {
        q: req.query.q || '',
        filters: {
          ...parseFiltersParam(req.query.filters),
          ...parseMetadataFiltersFromQuery(req.query),
        },
        bbox: parseBboxParam(req.query.bbox),
        publishedOnly: req.query.published !== '0',
        page: req.query.page,
        limit: req.query.limit,
      });
      return res.json(result);
    }

    let records = allRecords;
    if (req.query.published === '1') {
      records = records.filter((r) => r.isPublished === 1);
    }
    res.json(records.map((r) => ({ ...r, metadata: normalizeMetadata(r.metadata) })));
  } catch (err) {
    console.error('Records list error:', err);
    res.status(500).json({ error: 'Failed to list records' });
  }
});

// API: Bulk export
app.get('/api/export/records', (req, res) => {
  try {
    const format = (req.query.format || 'json').toLowerCase();
    if (!['json', 'xml', 'csv'].includes(format)) {
      return res.status(400).json({
        error: 'Bulk export supports format=json, xml, or csv',
        supported: ['json', 'xml', 'csv'],
      });
    }

    const allRecords = db.select().from(schema.records).orderBy(sql`${schema.records.id} DESC`).all();
    const result = searchRecords(allRecords, {
      q: req.query.q || '',
      filters: {
        ...parseFiltersParam(req.query.filters),
        ...parseMetadataFiltersFromQuery(req.query),
      },
      bbox: parseBboxParam(req.query.bbox),
      publishedOnly: req.query.published !== '0',
      page: 1,
      limit: 10000,
    });

    sendExport(res, result.results, format, req);
  } catch (err) {
    console.error('Bulk export error:', err);
    res.status(400).json({ error: err.message || 'Export failed' });
  }
});

// API: Advanced search (full-text, filters, spatial bbox)
app.get('/api/search', (req, res) => {
  try {
    const records = db.select().from(schema.records).orderBy(sql`${schema.records.id} DESC`).all();
    const result = searchRecords(records, {
      q: req.query.q || '',
      filters: parseFiltersParam(req.query.filters),
      bbox: parseBboxParam(req.query.bbox),
      publishedOnly: req.query.published !== '0',
      page: req.query.page,
      limit: req.query.limit,
    });
    res.json(result);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Search failed' });
  }
});

// API: Image similarity search (CLIP embeddings, cache + single-worker queue)
app.post('/api/search/image', authMiddleware, imageSearchUpload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }
  try {
    const limit = Number(req.query.limit) || 12;
    const force = req.query.force === '1' || req.query.force === 'true';
    const contentHash = await hashImageFile(req.file.path);

    if (!force) {
      const cached = getCachedImageSearch(contentHash, limit);
      if (cached) {
        await fs.unlink(req.file.path);
        return res.json({
          cached: true,
          status: 'done',
          contentHash,
          ...cached,
          results: cached.results.map((r) => ({
            ...r,
            metadata: normalizeMetadata(r.metadata),
          })),
        });
      }
    }

    if (req.user.role !== 'admin') {
      const rate = consumeRateLimit(imageSearchRateLimitKey(req.user), IMAGE_SEARCH_RATE_LIMIT);
      res.setHeader('X-RateLimit-Limit', String(rate.limit));
      res.setHeader('X-RateLimit-Remaining', String(rate.remaining));
      if (!rate.allowed) {
        await fs.unlink(req.file.path).catch(() => {});
        return res.status(429).json({
          error: 'Image search rate limit exceeded. Try again later or use a cached identical upload.',
          retryAfterSeconds: Math.ceil(rate.retryAfterMs / 1000),
          limit: rate.limit,
          windowHours: rate.windowMs / (60 * 60 * 1000),
        });
      }
    }

    const job = enqueueImageSearch({
      filePath: req.file.path,
      uploadDir,
      limit,
      contentHash,
      fetchRecords: () => db.select().from(schema.records).orderBy(sql`${schema.records.id} DESC`).all(),
    });
    res.status(202).json({ ...job, cached: false, contentHash });
  } catch (err) {
    console.error('Image search enqueue error:', err);
    res.status(500).json({ error: 'Could not queue image search' });
  }
});

app.get('/api/search/image/jobs/:jobId', authMiddleware, (req, res) => {
  const job = getImageSearchJob(req.params.jobId);
  if (!job) {
    return res.status(404).json({ error: 'Job not found or expired' });
  }
  res.json({
    ...job,
    results: job.results?.map((r) => ({
      ...r,
      metadata: normalizeMetadata(r.metadata),
    })) ?? null,
  });
});

// API: AI auto-annotation (OWL-ViT prototype, admin only, queued)
app.post('/api/records/:id/auto-annotate', authMiddleware, requireAdmin, (req, res) => {
  const record = fetchRecordOr404(req, res);
  if (!record) return;

  if (process.env.AUTO_ANNOTATE_ENABLED === '0') {
    return res.status(503).json({ error: 'Auto-annotation is disabled on this server' });
  }

  const rate = consumeRateLimit(`auto-annotate:${req.user.id}`, { max: 5, windowMs: 60 * 60 * 1000 });
  if (!rate.allowed) {
    return res.status(429).json({
      error: 'Auto-annotation rate limit exceeded (5 per hour)',
      retryAfterSeconds: Math.ceil(rate.retryAfterMs / 1000),
    });
  }

  const replace = req.body?.replace === true || req.query.replace === '1';

  try {
    const job = enqueueAutoAnnotate({
      db,
      schema,
      record,
      userId: req.user.id,
      uploadDir,
      replace,
    });
    res.status(202).json(job);
  } catch (err) {
    console.error('Auto-annotate enqueue error:', err);
    res.status(500).json({ error: 'Could not queue auto-annotation' });
  }
});

app.get('/api/records/:id/auto-annotate/jobs/:jobId', authMiddleware, requireAdmin, (req, res) => {
  const job = getAutoAnnotateJob(req.params.jobId);
  if (!job) {
    return res.status(404).json({ error: 'Job not found or expired' });
  }
  res.json(job);
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

// API: Lookup by numeric id or catalog registration number
app.get('/api/records/lookup/:identifier', (req, res) => {
  const record = resolveRecordFromParam(db, schema, req.params.identifier);
  if (!record) {
    return res.status(404).json({ error: 'Record not found' });
  }
  res.json(buildPublicRecord(record, req));
});

// API: Metadata only
app.get('/api/records/:id/metadata', (req, res) => {
  const record = fetchRecordOr404(req, res);
  if (!record) return;
  res.json(metadataOnlyPayload(record));
});

// API: Export single record
app.get('/api/records/:id/export', (req, res) => {
  const record = fetchRecordOr404(req, res);
  if (!record) return;
  const format = (req.query.format || 'json').toLowerCase();
  try {
    sendExport(res, [record], format, req);
  } catch (err) {
    res.status(400).json({ error: err.message, supported: SUPPORTED_EXPORT_FORMATS });
  }
});

// API: RTI asset descriptors
app.get('/api/records/:id/rti', (req, res) => {
  const record = fetchRecordOr404(req, res);
  if (!record) return;

  const baseUrl = getBaseUrl(req);
  const assets = buildRtiAssets(record, baseUrl);
  const payload = {
    id: record.id,
    slug: record.slug || null,
    name: record.name,
    status: record.status,
    ready: record.status === 'done',
    outputType: record.outputType || null,
    ...assets,
    viewerUrl: `${baseUrl}${recordPublicPath(record)}`,
    exportUrl: `${baseUrl}/api/records/${record.slug || record.id}/export`,
  };

  if (req.query.redirect === '1' && record.status === 'done') {
    const target = assets.tiffUrl || assets.folderUrl;
    if (target) return res.redirect(target);
    return res.status(404).json({ error: 'No RTI assets available' });
  }

  res.json(payload);
});

// API: Get single record
app.get('/api/records/:id', async (req, res) => {
  const record = fetchRecordOr404(req, res);
  if (!record) return;

  let folderSize = 0;
  let fileCount = 0;
  if (record.status === 'done' && record.folderUrl) {
    const folderName = path.basename(record.folderUrl);
    const localPath = path.join(uploadDir, folderName);
    const stats = await getFolderStats(localPath);
    folderSize = stats.totalSize;
    fileCount = stats.fileCount;
  }
  res.json({
    ...record,
    metadata: normalizeMetadata(record.metadata),
    folderSize,
    fileCount,
    revisionNumber: getLatestRevision(db, schema, record.id)?.revisionNumber ?? 0,
  });
});

// --- Record revision history ---

app.get('/api/records/:id/revisions', optionalAuthMiddleware, (req, res) => {
  const record = fetchRecordOr404(req, res);
  if (!record) return;
  if (!userCanViewRevisions(req.user, record)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    res.json({
      recordId: record.id,
      currentRevision: getLatestRevision(db, schema, record.id)?.revisionNumber ?? 0,
      revisions: listRevisions(db, schema, record.id),
    });
  } catch (err) {
    console.error('List revisions error:', err);
    res.status(500).json({ error: 'Failed to list revisions' });
  }
});

app.get('/api/records/:id/revisions/compare', optionalAuthMiddleware, (req, res) => {
  const record = fetchRecordOr404(req, res);
  if (!record) return;
  if (!userCanViewRevisions(req.user, record)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const from = parseInt(req.query.from, 10);
  const to = req.query.to === 'current' ? 'current' : parseInt(req.query.to, 10);
  if (!Number.isInteger(from) || from < 1) {
    return res.status(400).json({ error: 'Query param from must be a positive revision number' });
  }
  if (to !== 'current' && (!Number.isInteger(to) || to < 1)) {
    return res.status(400).json({ error: 'Query param to must be a positive revision number or "current"' });
  }

  try {
    const result = compareRevisions(db, schema, record.id, from, to);
    if (!result) return res.status(404).json({ error: 'Revision not found' });
    res.json(result);
  } catch (err) {
    console.error('Compare revisions error:', err);
    res.status(500).json({ error: 'Failed to compare revisions' });
  }
});

app.get('/api/records/:id/revisions/:revisionNumber', optionalAuthMiddleware, (req, res) => {
  const record = fetchRecordOr404(req, res);
  if (!record) return;
  if (!userCanViewRevisions(req.user, record)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const revisionNumber = parseInt(req.params.revisionNumber, 10);
  if (!Number.isInteger(revisionNumber) || revisionNumber < 1) {
    return res.status(400).json({ error: 'Invalid revision number' });
  }

  try {
    const revision = getRevisionDetail(db, schema, record.id, revisionNumber);
    if (!revision) return res.status(404).json({ error: 'Revision not found' });
    res.json(revision);
  } catch (err) {
    console.error('Get revision error:', err);
    res.status(500).json({ error: 'Failed to load revision' });
  }
});

// --- Private research notes (Phase 1 collaboration) ---

app.get('/api/records/:id/notes', authMiddleware, requireCollaboration, (req, res) => {
  const record = fetchRecordOr404(req, res);
  if (!record) return;
  try {
    const notes = db.select({
      id: schema.recordNotes.id,
      body: schema.recordNotes.body,
      createdAt: schema.recordNotes.createdAt,
      updatedAt: schema.recordNotes.updatedAt,
    })
      .from(schema.recordNotes)
      .where(and(
        eq(schema.recordNotes.recordId, record.id),
        eq(schema.recordNotes.userId, req.user.id),
      ))
      .orderBy(sql`${schema.recordNotes.createdAt} DESC`)
      .all();
    res.json(notes);
  } catch (err) {
    console.error('List notes error:', err);
    res.status(500).json({ error: 'Failed to list notes' });
  }
});

app.post('/api/records/:id/notes', authMiddleware, requireCollaboration, (req, res) => {
  const record = fetchRecordOr404(req, res);
  if (!record) return;
  const { body } = req.body;
  if (!body || !String(body).trim()) {
    return res.status(400).json({ error: 'Note body is required' });
  }
  try {
    const now = formatCatalogDateTime(new Date().toISOString());
    const inserted = db.insert(schema.recordNotes).values({
      recordId: record.id,
      userId: req.user.id,
      body: String(body).trim(),
      createdAt: now,
      updatedAt: now,
    }).returning({
      id: schema.recordNotes.id,
      body: schema.recordNotes.body,
      createdAt: schema.recordNotes.createdAt,
      updatedAt: schema.recordNotes.updatedAt,
    }).get();
    res.json(inserted);
  } catch (err) {
    console.error('Create note error:', err);
    res.status(500).json({ error: 'Failed to create note' });
  }
});

app.put('/api/records/:id/notes/:noteId', authMiddleware, requireCollaboration, (req, res) => {
  const record = fetchRecordOr404(req, res);
  if (!record) return;
  const noteId = Number(req.params.noteId);
  const { body } = req.body;
  if (!body || !String(body).trim()) {
    return res.status(400).json({ error: 'Note body is required' });
  }
  try {
    const existing = db.select({ id: schema.recordNotes.id })
      .from(schema.recordNotes)
      .where(and(
        eq(schema.recordNotes.id, noteId),
        eq(schema.recordNotes.recordId, record.id),
        eq(schema.recordNotes.userId, req.user.id),
      ))
      .get();
    if (!existing) {
      return res.status(404).json({ error: 'Note not found' });
    }
    const now = formatCatalogDateTime(new Date().toISOString());
    db.update(schema.recordNotes)
      .set({ body: String(body).trim(), updatedAt: now })
      .where(eq(schema.recordNotes.id, noteId))
      .run();
    res.json({ success: true, updatedAt: now });
  } catch (err) {
    console.error('Update note error:', err);
    res.status(500).json({ error: 'Failed to update note' });
  }
});

app.delete('/api/records/:id/notes/:noteId', authMiddleware, requireCollaboration, (req, res) => {
  const record = fetchRecordOr404(req, res);
  if (!record) return;
  const noteId = Number(req.params.noteId);
  try {
    const deleted = db.delete(schema.recordNotes)
      .where(and(
        eq(schema.recordNotes.id, noteId),
        eq(schema.recordNotes.recordId, record.id),
        eq(schema.recordNotes.userId, req.user.id),
      ))
      .returning({ id: schema.recordNotes.id })
      .get();
    if (!deleted) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Delete note error:', err);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

app.get('/api/records/:id/annotations', authMiddleware, requireAnnotate, (req, res) => {
  const record = fetchRecordOr404(req, res);
  if (!record) return;
  try {
    const rows = db.select({
      id: schema.recordAnnotations.id,
      type: schema.recordAnnotations.type,
      geometry: schema.recordAnnotations.geometry,
      label: schema.recordAnnotations.label,
      color: schema.recordAnnotations.color,
      rtiView: schema.recordAnnotations.rtiView,
      source: schema.recordAnnotations.source,
      createdAt: schema.recordAnnotations.createdAt,
      updatedAt: schema.recordAnnotations.updatedAt,
    })
      .from(schema.recordAnnotations)
      .where(and(
        eq(schema.recordAnnotations.recordId, record.id),
        eq(schema.recordAnnotations.userId, req.user.id),
      ))
      .orderBy(sql`${schema.recordAnnotations.createdAt} DESC`)
      .all();
    res.json(rows);
  } catch (err) {
    console.error('List annotations error:', err);
    res.status(500).json({ error: 'Failed to list annotations' });
  }
});

app.post('/api/records/:id/annotations', authMiddleware, requireAnnotate, (req, res) => {
  const record = fetchRecordOr404(req, res);
  if (!record) return;
  const { type, geometry, label, color, rtiView } = req.body;
  if (!type || !geometry || !rtiView) {
    return res.status(400).json({ error: 'type, geometry, and rtiView are required' });
  }
  const validationError = validateAnnotationBody({ type, geometry });
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }
  try {
    const now = formatCatalogDateTime(new Date().toISOString());
    const inserted = db.insert(schema.recordAnnotations).values({
      recordId: record.id,
      userId: req.user.id,
      type,
      geometry,
      label: label ? String(label).trim() : null,
      color: color || '#f59e0b',
      rtiView,
      createdAt: now,
      updatedAt: now,
    }).returning({
      id: schema.recordAnnotations.id,
      type: schema.recordAnnotations.type,
      geometry: schema.recordAnnotations.geometry,
      label: schema.recordAnnotations.label,
      color: schema.recordAnnotations.color,
      rtiView: schema.recordAnnotations.rtiView,
      createdAt: schema.recordAnnotations.createdAt,
      updatedAt: schema.recordAnnotations.updatedAt,
    }).get();
    res.json(inserted);
  } catch (err) {
    console.error('Create annotation error:', err);
    res.status(500).json({ error: 'Failed to create annotation' });
  }
});

app.put('/api/records/:id/annotations/:annotationId', authMiddleware, requireAnnotate, (req, res) => {
  const record = fetchRecordOr404(req, res);
  if (!record) return;
  const annotationId = Number(req.params.annotationId);
  const { label, color } = req.body;
  try {
    const existing = db.select({ id: schema.recordAnnotations.id })
      .from(schema.recordAnnotations)
      .where(and(
        eq(schema.recordAnnotations.id, annotationId),
        eq(schema.recordAnnotations.recordId, record.id),
        eq(schema.recordAnnotations.userId, req.user.id),
      ))
      .get();
    if (!existing) {
      return res.status(404).json({ error: 'Annotation not found' });
    }
    const now = formatCatalogDateTime(new Date().toISOString());
    const updates = { updatedAt: now };
    if (label !== undefined) updates.label = label ? String(label).trim() : null;
    if (color !== undefined) updates.color = color || '#f59e0b';
    db.update(schema.recordAnnotations).set(updates).where(eq(schema.recordAnnotations.id, annotationId)).run();
    res.json({ success: true, updatedAt: now });
  } catch (err) {
    console.error('Update annotation error:', err);
    res.status(500).json({ error: 'Failed to update annotation' });
  }
});

app.delete('/api/records/:id/annotations/:annotationId', authMiddleware, requireAnnotate, (req, res) => {
  const record = fetchRecordOr404(req, res);
  if (!record) return;
  const annotationId = Number(req.params.annotationId);
  try {
    const deleted = db.delete(schema.recordAnnotations)
      .where(and(
        eq(schema.recordAnnotations.id, annotationId),
        eq(schema.recordAnnotations.recordId, record.id),
        eq(schema.recordAnnotations.userId, req.user.id),
      ))
      .returning({ id: schema.recordAnnotations.id })
      .get();
    if (!deleted) {
      return res.status(404).json({ error: 'Annotation not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Delete annotation error:', err);
    res.status(500).json({ error: 'Failed to delete annotation' });
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
            db.update(schema.records).set({ progress: percent }).where(eq(schema.records.id, recordId)).run();
          }
          broadcastProgress(recordId, percent, message);
        }
      });
      const tiffName = path.basename(tiffPath);
      const tiffPublicUrl = `/static/uploads/${tiffName}`;
      const thumbName = tiffName.substring(0, tiffName.lastIndexOf('.')) + '.jpg';
      const thumbPublicUrl = `/static/uploads/${thumbName}`;
      db.update(schema.records).set({ tiffUrl: tiffPublicUrl, thumbnailUrl: thumbPublicUrl, status: 'done', progress: 100 }).where(eq(schema.records.id, recordId)).run();
      broadcastProgress(recordId, 100);
      try {
        await updateRecordImageEmbedding(db, schema, recordId, thumbPublicUrl, uploadDir);
        console.log(`CLIP embedding stored for record ${recordId}`);
      } catch (err) {
        console.error(`CLIP embedding failed for record ${recordId}:`, err);
      }
    } else {
      // --- Classic tile mode: use rtiprep ---
      const outputDir = await processRTI(originalFilePath, {
        ...options,
        onProgress: (percent, message) => {
          if (percent !== undefined && percent !== null) {
            db.update(schema.records).set({ progress: percent }).where(eq(schema.records.id, recordId)).run();
          }
          broadcastProgress(recordId, percent, message);
        }
      });
      const folderName = path.basename(outputDir);
      const publicUrl = `/static/uploads/${folderName}`;
      const thumbnailUrl = `${publicUrl}/1_1.${options.format || 'jpg'}`;
      db.update(schema.records).set({ folderUrl: publicUrl, thumbnailUrl, status: 'done', progress: 100 }).where(eq(schema.records.id, recordId)).run();
      broadcastProgress(recordId, 100);
      try {
        await updateRecordImageEmbedding(db, schema, recordId, thumbnailUrl, uploadDir);
        console.log(`CLIP embedding stored for record ${recordId}`);
      } catch (err) {
        console.error(`CLIP embedding failed for record ${recordId}:`, err);
      }
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
      db.update(schema.records).set({ originalFilePath: null, weightsFilePath: null }).where(eq(schema.records.id, recordId)).run();
    } catch (err) {
      console.error('Error unlinking original files on success:', err);
    }

    snapshotRecordAfterSystem(db, recordId, 'processing_completed', `RTI processing completed (${outputType})`);

  } catch (error) {
    console.error(`Error processing RTI ${recordId}:`, error);
    db.update(schema.records).set({ status: 'error' }).where(eq(schema.records.id, recordId)).run();
    snapshotRecordAfterSystem(db, recordId, 'processing_failed', error?.message || 'RTI processing failed');
    broadcastProgress(recordId, -1);
    // Note: We DO NOT delete originalFilePath or weightsPath here so we can rerun
  }
}

function parseUploadFiles(req, uploadMode) {
  const isNeural = uploadMode === 'neural';
  if (isNeural) {
    if (!req.files || !req.files['latentMap'] || !req.files['weights']) {
      return { error: 'Both latentMap image and weights JSON files are required for Neural RTI.' };
    }
    return {
      isNeural: true,
      originalFilePath: req.files['latentMap'][0].path,
      weightsPath: req.files['weights'][0].path,
      uploadedFileName: req.files['latentMap'][0].originalname,
    };
  }
  if (!req.files || !req.files['file']) {
    return { error: 'No file uploaded.' };
  }
  return {
    isNeural: false,
    originalFilePath: req.files['file'][0].path,
    weightsPath: null,
    uploadedFileName: req.files['file'][0].originalname,
  };
}

function buildUploadSettings(body) {
  const { quality, tileSize, format, outputType, uploadMode } = body;
  const isNeural = uploadMode === 'neural';
  const isGeoTiff = isNeural || (outputType === 'geotiff');
  const options = {
    quality: parseInt(quality) || 90,
    tileSize: parseInt(tileSize) || 256,
    format: format || 'jpg',
  };
  const resolvedOutputType = isNeural ? 'neural' : (isGeoTiff ? 'geotiff' : 'tiles');
  return { isNeural, isGeoTiff, options, resolvedOutputType };
}

function buildRtiMetadata(uploadedFileName, options, isNeural, isGeoTiff, existingMetadata = {}) {
  return normalizeMetadata({
    ...existingMetadata,
    rtiFileName: uploadedFileName.replace(/\.[^.]+$/, ''),
    digitalRegistrationDate: formatCatalogDate(
      existingMetadata.digitalRegistrationDate || new Date().toISOString().slice(0, 10)
    ),
    recordStatus: existingMetadata.recordStatus || 'Draft',
    metadataTileSize: String(options.tileSize),
    processingAlgorithm: isNeural ? 'Neural RTI' : (isGeoTiff ? 'HSH Fitter' : 'HSH Fitter'),
    viewerVersion: 'Modern (Three.js)',
  });
}

// API: Create catalog record without RTI file (draft)
app.post('/api/records', authMiddleware, requirePermission('edit_record'), (req, res) => {
  const { name, description, direction, metadata } = req.body;
  if (!name) return res.status(400).send('Name is required');

  try {
    const now = formatCatalogDateTime(new Date().toISOString());
    const initialMetadata = normalizeMetadata({
      ...(metadata && typeof metadata === 'object' ? metadata : {}),
      recordStatus: metadata?.recordStatus || 'Draft',
      digitalRegistrationDate: formatCatalogDate(
        metadata?.digitalRegistrationDate || new Date().toISOString().slice(0, 10)
      ),
      lastEdit: now,
      editHistory: metadata?.editHistory || `[${formatCatalogDate(new Date().toISOString().slice(0, 10))}: Catalog record created]`,
    });

    const inserted = db.insert(schema.records).values({
      name,
      description: description || '',
      date: new Date().toISOString(),
      status: 'draft',
      direction: direction || 'ltr',
      metadata: initialMetadata,
    }).returning({ id: schema.records.id }).get();

    const created = db.select().from(schema.records).where(eq(schema.records.id, inserted.id)).get();
    const slug = assignSlugForRecord(db, schema, created);

    snapshotRecordAfter(db, inserted.id, 'created', req, 'Catalog record created');

    res.json({ success: true, id: inserted.id, slug, metadata: initialMetadata });
  } catch (err) {
    console.error('Create record error:', err);
    res.status(500).send('Database error');
  }
});

// API: Upload RTI file to an existing draft record
app.post('/api/records/:id/upload', authMiddleware, requirePermission('upload_rti'), uploadFields, async (req, res) => {
  const record = fetchRecordOr404(req, res);
  if (!record) return;
  const recordId = record.id;

  if (record.status === 'processing') {
    return res.status(400).send('Record is already being processed.');
  }
  if (record.status === 'done') {
    return res.status(400).send('Record already has processed RTI data.');
  }
  if (record.status === 'error' && record.originalFilePath) {
    return res.status(400).send('Use rerun for failed records with saved source files.');
  }

  const files = parseUploadFiles(req, req.body.uploadMode);
  if (files.error) return res.status(400).send(files.error);

  const { options, resolvedOutputType, isNeural, isGeoTiff } = buildUploadSettings(req.body);
  const existingMetadata = record.metadata ? normalizeMetadata(record.metadata) : normalizeMetadata({});
  const updatedMetadata = buildRtiMetadata(files.uploadedFileName, options, isNeural, isGeoTiff, existingMetadata);

  db.update(schema.records).set({
    status: 'processing',
    progress: 0,
    message: null,
    outputType: resolvedOutputType,
    originalFilePath: files.originalFilePath,
    weightsFilePath: files.weightsPath,
    quality: options.quality,
    tileSize: options.tileSize,
    format: options.format,
    metadata: updatedMetadata,
  }).where(eq(schema.records.id, recordId)).run();

  snapshotRecordAfter(db, recordId, 'upload_started', req, `RTI upload started (${resolvedOutputType})`);

  runProcessingPipeline(recordId, files.originalFilePath, files.weightsPath, options, resolvedOutputType);
  res.json({ success: true, id: recordId });
});

// API: Upload and process RTI (creates new record + file in one step)
app.post('/api/upload', authMiddleware, requirePermission('upload_rti'), uploadFields, async (req, res) => {
  const { name, description, quality, tileSize, format, direction, outputType, uploadMode } = req.body;
  
  if (!name) {
    return res.status(400).send('Name is required');
  }

  const files = parseUploadFiles(req, uploadMode);
  if (files.error) return res.status(400).send(files.error);

  const settings = buildUploadSettings(req.body);
  const { options, resolvedOutputType, isNeural, isGeoTiff } = settings;
  const initialMetadata = buildRtiMetadata(files.uploadedFileName, options, isNeural, isGeoTiff);

  const inserted = db.insert(schema.records).values({
    name,
    description: description || '',
    date: new Date().toISOString(),
    status: 'processing',
    direction: direction || 'ltr',
    outputType: resolvedOutputType,
    originalFilePath: files.originalFilePath,
    weightsFilePath: files.weightsPath,
    quality: options.quality,
    tileSize: options.tileSize,
    format: options.format,
    metadata: initialMetadata,
  }).returning({ id: schema.records.id }).get();

  const recordId = inserted.id;
  assignSlugForRecord(db, schema, db.select().from(schema.records).where(eq(schema.records.id, recordId)).get());

  snapshotRecordAfter(db, recordId, 'created', req, `Record created with RTI upload (${resolvedOutputType})`);

  // Run processing in background
  runProcessingPipeline(recordId, files.originalFilePath, files.weightsPath, options, resolvedOutputType);

  res.json({ success: true, id: recordId });
});

// API: Update record
app.put('/api/records/:id', authMiddleware, requirePermission('edit_record'), (req, res) => {
  const { name, description, direction, metadata } = req.body;
  if (!name) return res.status(400).send('Name is required');

  try {
    const existing = fetchRecordOr404(req, res);
    if (!existing) return;

    const now = formatCatalogDateTime(new Date().toISOString());
    let updatedMetadata = existing.metadata ? normalizeMetadata(existing.metadata) : normalizeMetadata({});

    if (metadata && typeof metadata === 'object') {
      updatedMetadata = normalizeMetadata({ ...updatedMetadata, ...metadata, lastEdit: now });
    }

    db.update(schema.records).set({
      name,
      description: description ?? existing.description,
      direction: direction || 'ltr',
      metadata: updatedMetadata,
    }).where(eq(schema.records.id, existing.id)).run();

    if (!existing.slug) {
      assignSlugForRecord(db, schema, { ...existing, name, metadata: updatedMetadata });
    }

    snapshotRecordAfter(db, existing.id, 'updated', req, 'Catalog metadata updated');

    res.json({ success: true, metadata: updatedMetadata });
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
    const record = fetchRecordOr404(req, res);
    if (!record) return;
    db.update(schema.records).set({ isPublished: is_published ? 1 : 0 }).where(eq(schema.records.id, record.id)).run();
    snapshotRecordAfter(
      db,
      record.id,
      is_published ? 'published' : 'unpublished',
      req,
      is_published ? 'Record published' : 'Record unpublished',
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Publish error:', err);
    res.status(500).send('Database error');
  }
});

// API: Delete record
app.delete('/api/records/:id', authMiddleware, requirePermission('delete_record'), async (req, res) => {
  try {
    const record = fetchRecordOr404(req, res);
    if (!record) return;

    db.delete(schema.records).where(eq(schema.records.id, record.id)).run();

    // Delete associated files (classic tiles)
    if (record.folderUrl) {
      // folderUrl is like "/static/uploads/12345-scan"
      // We need to map it back to the absolute local path
      const folderName = path.basename(record.folderUrl);
      const localPath = path.join(uploadDir, folderName);
      try {
        await fs.rm(localPath, { recursive: true, force: true });
        console.log(`Deleted folder: ${localPath}`);
      } catch (err) {
        console.error(`Failed to delete folder: ${localPath}`, err);
      }
    }

    // Delete GeoTIFF file
    if (record.tiffUrl) {
      const tiffName = path.basename(record.tiffUrl);
      const tiffPath = path.join(uploadDir, tiffName);
      try {
        await fs.unlink(tiffPath);
        console.log(`Deleted tiff file: ${tiffPath}`);
      } catch (err) {
        console.error(`Failed to delete tiff file: ${tiffPath}`, err);
      }
    }

    // Delete thumbnail image file
    if (record.thumbnailUrl) {
      const thumbName = path.basename(record.thumbnailUrl);
      const thumbPath = path.join(uploadDir, thumbName);
      try {
        await fs.unlink(thumbPath);
        console.log(`Deleted thumbnail file: ${thumbPath}`);
      } catch (err) {}
    }

    // Delete original raw files (if they exist due to error state)
    if (record.originalFilePath) {
      try {
        await fs.unlink(record.originalFilePath);
        console.log(`Deleted original file: ${record.originalFilePath}`);
      } catch (err) {}
    }
    if (record.weightsFilePath) {
      try {
        await fs.unlink(record.weightsFilePath);
        console.log(`Deleted weights file: ${record.weightsFilePath}`);
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
    const record = fetchRecordOr404(req, res);
    if (!record) return;
    if (record.status !== 'error') {
      return res.status(400).send('Only failed records in error state can be rerun');
    }
    if (!record.originalFilePath) {
      return res.status(400).send('Original files were already deleted or not found. Cannot rerun.');
    }

    // Check if the original file still exists on disk
    try {
      await fs.access(record.originalFilePath);
    } catch (e) {
      return res.status(400).send('Original file no longer exists on server disk.');
    }

    // Reset status to processing and progress to 0
    db.update(schema.records).set({ status: 'processing', progress: 0 }).where(eq(schema.records.id, record.id)).run();
    snapshotRecordAfter(db, record.id, 'reprocessed', req, 'Processing rerun started');

    const options = {
      quality: record.quality || 90,
      tileSize: record.tileSize || 256,
      format: record.format || 'jpg'
    };

    // Run processing in background
    runProcessingPipeline(record.id, record.originalFilePath, record.weightsFilePath, options, record.outputType);

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
    const users = db.select({
      id: schema.users.id,
      username: schema.users.username,
      role: schema.users.role,
      permissions: schema.users.permissions,
    }).from(schema.users).orderBy(schema.users.id).all();
    const parsedUsers = users.map((u) => ({
      ...u,
      permissions: parsePermissions(u.permissions),
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
    const existing = db.select({ id: schema.users.id }).from(schema.users).where(eq(schema.users.username, username)).get();
    if (existing) {
      return res.status(400).send('Username already exists');
    }

    const hash = hashPassword(password);
    const perms = permissions || [];

    const inserted = db.insert(schema.users).values({
      username, passwordHash: hash, role, permissions: perms
    }).returning({ id: schema.users.id }).get();
    
    res.json({ success: true, id: inserted.id });
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
    const existing = db.select({ id: schema.users.id }).from(schema.users)
      .where(sql`${schema.users.username} = ${username} AND ${schema.users.id} != ${Number(req.params.id)}`).get();
    if (existing) {
      return res.status(400).send('Username already exists');
    }

    const perms = permissions || [];
    const updateData = password
      ? { username, passwordHash: hashPassword(password), role, permissions: perms }
      : { username, role, permissions: perms };

    db.update(schema.users).set(updateData).where(eq(schema.users.id, Number(req.params.id))).run();
    
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
    const deleted = db.delete(schema.users).where(eq(schema.users.id, Number(req.params.id))).returning({ id: schema.users.id }).get();
    if (!deleted) {
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
