import path from 'path';
import fs from 'fs/promises';
import multer from 'multer';
import type { Express, Request } from 'express';
import { parseCatalogSchema, parseSiteConfig, parseViewConfig, DEFAULT_SITE_CONFIG } from '@rtidb/shared';
import { sendError, asyncHandler } from '../lib/httpErrors.js';
import { sanitizeUploadFilename } from '../lib/uploads.js';
import {
  getSiteConfig,
  saveSiteConfig,
  listRecordTypes,
  createRecordType,
  updateRecordType,
  deleteRecordType,
  listCatalogViews,
  getCatalogViewById,
  createCatalogView,
  updateCatalogView,
  deleteCatalogView,
} from '../lib/catalog.js';
import { queryNumber, routeParam } from '../lib/httpParams.js';
import type { ServerContext } from '../types/index.js';

const BRANDING_MIMES = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/svg+xml',
  'image/x-icon',
  'image/vnd.microsoft.icon',
]);

function brandingUploader(uploadDir: string) {
  return multer({
    storage: multer.diskStorage({
      destination: async (_req, _file, cb) => {
        const dir = path.join(uploadDir, 'branding');
        await fs.mkdir(dir, { recursive: true });
        cb(null, dir);
      },
      filename: (req, file, cb) => {
        const kind = req.path.endsWith('/favicon') ? 'favicon' : 'logo';
        const ext = path.extname(sanitizeUploadFilename(file.originalname, '.png')) || '.png';
        cb(null, `${kind}-${Date.now()}${ext}`);
      },
    }),
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      const ok = BRANDING_MIMES.has(file.mimetype) || /\.(png|jpe?g|webp|svg|ico)$/i.test(file.originalname);
      cb(null, Boolean(ok));
    },
  }).single('file');
}

function optionalInt(value: unknown): number | null | undefined {
  if (value === undefined) return undefined;
  if (value === null || value === '' || value === 'null') return null;
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export function registerCatalogRoutes(app: Express, ctx: ServerContext) {
  const { db, schema, uploadDir, authMiddleware, requireAdmin } = ctx;
  const uploadBranding = brandingUploader(uploadDir);

  app.get('/api/site-config', (_req, res) => {
    res.json(getSiteConfig(db, schema));
  });

  app.put('/api/site-config', authMiddleware, requireAdmin, (req, res) => {
    const parsed = parseSiteConfig({ ...getSiteConfig(db, schema), ...req.body });
    res.json(saveSiteConfig(db, schema, parsed));
  });

  app.post('/api/site-config/logo', authMiddleware, requireAdmin, uploadBranding, asyncHandler(async (req: Request, res) => {
    const file = req.file;
    if (!file) return sendError(res, 400, 'Image file is required');
    const logoUrl = `/static/uploads/branding/${file.filename}`;
    res.json(saveSiteConfig(db, schema, { ...getSiteConfig(db, schema), logoUrl }));
  }));

  app.post('/api/site-config/favicon', authMiddleware, requireAdmin, uploadBranding, asyncHandler(async (req: Request, res) => {
    const file = req.file;
    if (!file) return sendError(res, 400, 'Image file is required');
    const faviconUrl = `/static/uploads/branding/${file.filename}`;
    res.json(saveSiteConfig(db, schema, { ...getSiteConfig(db, schema), faviconUrl }));
  }));

  app.post('/api/site-config/reset', authMiddleware, requireAdmin, (_req, res) => {
    const current = getSiteConfig(db, schema);
    res.json(saveSiteConfig(db, schema, {
      ...DEFAULT_SITE_CONFIG,
      logoUrl: current.logoUrl,
      faviconUrl: current.faviconUrl,
      dateFormat: current.dateFormat,
      timeFormat: current.timeFormat,
    }));
  });

  app.get('/api/record-types', authMiddleware, (_req, res) => {
    res.json(listRecordTypes(db, schema));
  });

  app.post('/api/admin/record-types', authMiddleware, requireAdmin, (req, res) => {
    try {
      const created = createRecordType(db, schema, {
        name: String(req.body?.name || ''),
        slug: req.body?.slug,
        description: req.body?.description,
        isDefault: Boolean(req.body?.isDefault),
        sortOrder: queryNumber(req.body?.sortOrder) ?? 0,
        schemaJson: req.body?.schema ? parseCatalogSchema(req.body.schema) : undefined,
        cloneFromId: queryNumber(req.body?.cloneFromId) ?? undefined,
      });
      res.status(201).json(created);
    } catch (err) {
      sendError(res, 400, err instanceof Error ? err.message : 'Could not create record type');
    }
  });

  app.put('/api/admin/record-types/:id', authMiddleware, requireAdmin, (req, res) => {
    const id = queryNumber(routeParam(req.params.id));
    if (!id) return sendError(res, 400, 'Invalid id');
    const updated = updateRecordType(db, schema, id, {
      name: req.body?.name,
      slug: req.body?.slug,
      description: req.body?.description,
      isDefault: req.body?.isDefault,
      sortOrder: req.body?.sortOrder == null ? undefined : queryNumber(req.body.sortOrder) ?? undefined,
      schemaJson: req.body?.schema ? parseCatalogSchema(req.body.schema) : undefined,
    });
    if (!updated) return sendError(res, 404, 'Record type not found');
    res.json(updated);
  });

  app.delete('/api/admin/record-types/:id', authMiddleware, requireAdmin, (req, res) => {
    const id = queryNumber(routeParam(req.params.id));
    if (!id) return sendError(res, 400, 'Invalid id');
    const result = deleteRecordType(db, schema, id);
    if ('error' in result) return sendError(res, result.error.includes('not found') ? 404 : 400, result.error);
    res.json({ success: true });
  });

  app.get('/api/views', authMiddleware, (_req, res) => {
    res.json(listCatalogViews(db, schema, true));
  });

  app.get('/api/admin/views', authMiddleware, requireAdmin, (_req, res) => {
    res.json(listCatalogViews(db, schema, false));
  });

  app.post('/api/admin/views', authMiddleware, requireAdmin, (req, res) => {
    try {
      const created = createCatalogView(db, schema, {
        name: String(req.body?.name || ''),
        slug: req.body?.slug,
        recordTypeId: optionalInt(req.body?.recordTypeId) ?? null,
        isDefault: Boolean(req.body?.isDefault),
        isPublic: req.body?.isPublic !== false,
        config: req.body?.config ? parseViewConfig(req.body.config) : undefined,
      });
      res.status(201).json(created);
    } catch (err) {
      sendError(res, 400, err instanceof Error ? err.message : 'Could not create view');
    }
  });

  app.put('/api/admin/views/:id', authMiddleware, requireAdmin, (req, res) => {
    const id = queryNumber(routeParam(req.params.id));
    if (!id) return sendError(res, 400, 'Invalid id');
    const updated = updateCatalogView(db, schema, id, {
      name: req.body?.name,
      slug: req.body?.slug,
      recordTypeId: optionalInt(req.body?.recordTypeId),
      isDefault: req.body?.isDefault,
      isPublic: req.body?.isPublic,
      config: req.body?.config ? parseViewConfig(req.body.config) : undefined,
    });
    if (!updated) return sendError(res, 404, 'View not found');
    res.json(updated);
  });

  app.delete('/api/admin/views/:id', authMiddleware, requireAdmin, (req, res) => {
    const id = queryNumber(routeParam(req.params.id));
    if (!id) return sendError(res, 400, 'Invalid id');
    const result = deleteCatalogView(db, schema, id);
    if ('error' in result) return sendError(res, 404, result.error);
    res.json({ success: true });
  });
}
