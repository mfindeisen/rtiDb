import fs from 'fs/promises';
import { sql, eq } from 'drizzle-orm';
import type { Express } from 'express';
import { normalizeMetadata } from '../lib/metadataFields.js';
import { searchRecords, parseBboxParam, parseFiltersParam } from '../lib/search.js';
import { enqueueImageSearch, getImageSearchJob } from '../lib/imageSearchQueue.js';
import { getCachedImageSearch, hashImageFile } from '../lib/imageSearchCache.js';
import { consumeRateLimit, imageSearchRateLimitKey, IMAGE_SEARCH_RATE_LIMIT } from '../lib/rateLimit.js';
import { parseMetadataFiltersFromQuery } from '../lib/records.js';
import { sendExport } from '../lib/recordHelpers.js';
import { queryNumber, routeParam } from '../lib/httpParams.js';
import { listAllRecords } from '../lib/userResources.js';
import type { ServerContext } from '../types/index.js';

export function registerSearchRoutes(app: Express, ctx: ServerContext) {
  const { db, schema, uploadDir, imageSearchUpload, authMiddleware } = ctx;

  app.get('/api/records', (req, res) => {
    try {
      const allRecords = listAllRecords(db, schema);
      const hasFilters =
        req.query.q ||
        req.query.filters ||
        req.query.bbox ||
        Object.keys(req.query).some((k) => !['published', 'page', 'limit'].includes(k));

      if (hasFilters) {
        const result = searchRecords(allRecords, {
          q: String(req.query.q || ''),
          filters: {
            ...parseFiltersParam(String(req.query.filters || '')),
            ...parseMetadataFiltersFromQuery(req.query),
          },
          bbox: parseBboxParam(String(req.query.bbox || '')),
          publishedOnly: req.query.published !== '0',
          page: queryNumber(req.query.page),
          limit: queryNumber(req.query.limit),
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

  app.get('/api/export/records', (req, res) => {
    try {
      const format = String(req.query.format || 'json').toLowerCase();
      if (!['json', 'xml', 'csv'].includes(format)) {
        return res.status(400).json({
          error: 'Bulk export supports format=json, xml, or csv',
          supported: ['json', 'xml', 'csv'],
        });
      }

      const allRecords = listAllRecords(db, schema);
      const result = searchRecords(allRecords, {
        q: String(req.query.q || ''),
        filters: {
          ...parseFiltersParam(String(req.query.filters || '')),
          ...parseMetadataFiltersFromQuery(req.query),
        },
        bbox: parseBboxParam(String(req.query.bbox || '')),
        publishedOnly: req.query.published !== '0',
        page: 1,
        limit: 10000,
      });

      sendExport(res, result.results, format, req);
    } catch (err) {
      console.error('Bulk export error:', err);
      const message = err instanceof Error ? err.message : 'Export failed';
      res.status(400).json({ error: message });
    }
  });

  app.get('/api/search', (req, res) => {
    try {
      const records = listAllRecords(db, schema);
      const result = searchRecords(records, {
        q: String(req.query.q || ''),
        filters: {
          ...parseFiltersParam(String(req.query.filters || '')),
          ...parseMetadataFiltersFromQuery(req.query),
        },
        bbox: parseBboxParam(String(req.query.bbox || '')),
        publishedOnly: req.query.published !== '0',
        page: queryNumber(req.query.page),
        limit: queryNumber(req.query.limit),
      });
      res.json(result);
    } catch (err) {
      console.error('Search error:', err);
      res.status(500).json({ error: 'Search failed' });
    }
  });

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

      if (req.user!.role !== 'admin') {
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
    const job = getImageSearchJob(routeParam(req.params.jobId));
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
}
