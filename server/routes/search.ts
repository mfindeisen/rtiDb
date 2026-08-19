import fs from 'fs/promises';
import type { Express } from 'express';
import {
  searchRecords,
  parseBboxParam,
  parseFiltersParam,
  loadSearchCandidatesForFilter,
  enrichRecord,
} from '../lib/search.js';
import { enqueueImageSearch, getImageSearchJob } from '../lib/imageSearchQueue.js';
import { getCachedImageSearch, hashImageFile } from '../lib/imageSearchCache.js';
import { consumeRateLimit, imageSearchRateLimitKey, IMAGE_SEARCH_RATE_LIMIT } from '../lib/rateLimit.js';
import { parseMetadataFiltersFromQuery, toClientRecordRow } from '../lib/records.js';
import { loadRecordTypeMap } from '../lib/catalog.js';
import { sendExport } from '../lib/recordHelpers.js';
import { queryNumber, routeParam } from '../lib/httpParams.js';
import { listRecordsByPublish, resolvePublishedFilter } from '../lib/userResources.js';
import { publishedImageSearchMatches, type ImageSearchMatch } from '../lib/imageSearch.js';
import type { ServerContext } from '../types/index.js';

function toClientImageSearchMatch(record: ImageSearchMatch, types?: Map<number, import('@rtidb/shared/api/catalog').RecordType>) {
  return {
    ...toClientRecordRow(record, types),
    similarity: record.similarity,
  };
}

function searchOptionsFromQuery(req: import('express').Request) {
  return {
    q: String(req.query.q || ''),
    filters: {
      ...parseFiltersParam(String(req.query.filters || '')),
      ...parseMetadataFiltersFromQuery(req.query),
    },
    bbox: parseBboxParam(String(req.query.bbox || '')),
    publishedOnly: resolvePublishedFilter(req) === 'published',
    page: queryNumber(req.query.page),
    limit: queryNumber(req.query.limit),
    recordTypeId: queryNumber(req.query.recordTypeId),
  };
}

export function registerSearchRoutes(app: Express, ctx: ServerContext) {
  const { db, schema, uploadDir, imageSearchUpload, authMiddleware, optionalAuthMiddleware } = ctx;

  app.get('/api/records', optionalAuthMiddleware, (req, res) => {
    try {
      const hasFilters =
        req.query.q ||
        req.query.filters ||
        req.query.bbox ||
        Object.keys(req.query).some((k) => !['published', 'page', 'limit', 'recordTypeId'].includes(k));
      const wantsPaging = req.query.page != null || req.query.limit != null;
      const types = loadRecordTypeMap(db, schema);

      if (hasFilters || wantsPaging) {
        const filter = resolvePublishedFilter(req);
        const candidates = loadSearchCandidatesForFilter(
          db,
          schema,
          filter,
          String(req.query.q || ''),
        );
        const result = searchRecords(candidates, searchOptionsFromQuery(req), types);
        return res.json(result);
      }

      const records = listRecordsByPublish(db, schema, resolvePublishedFilter(req));
      const results = records.map((record) => enrichRecord(record, types));
      res.json({
        total: results.length,
        page: 1,
        limit: results.length || 20,
        totalPages: 1,
        results,
      });
    } catch (err) {
      console.error('Records list error:', err);
      res.status(500).json({ error: 'Failed to list records' });
    }
  });

  app.get('/api/export/records', optionalAuthMiddleware, (req, res) => {
    try {
      const format = String(req.query.format || 'json').toLowerCase();
      if (!['json', 'xml', 'csv'].includes(format)) {
        return res.status(400).json({
          error: 'Bulk export supports format=json, xml, or csv',
          supported: ['json', 'xml', 'csv'],
        });
      }

      const filter = resolvePublishedFilter(req);
      const allRecords = loadSearchCandidatesForFilter(
        db,
        schema,
        filter,
        String(req.query.q || ''),
      );
      const result = searchRecords(allRecords, {
        ...searchOptionsFromQuery(req),
        page: 1,
        limit: 10000,
      }, loadRecordTypeMap(db, schema));

      sendExport(res, result.results, format, req);
    } catch (err) {
      console.error('Bulk export error:', err);
      const message = err instanceof Error ? err.message : 'Export failed';
      res.status(400).json({ error: message });
    }
  });

  app.get('/api/search', optionalAuthMiddleware, (req, res) => {
    try {
      const filter = resolvePublishedFilter(req);
      const records = loadSearchCandidatesForFilter(
        db,
        schema,
        filter,
        String(req.query.q || ''),
      );
      const result = searchRecords(records, searchOptionsFromQuery(req), loadRecordTypeMap(db, schema));
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
          const types = loadRecordTypeMap(db, schema);
          const results = publishedImageSearchMatches(cached.results).map((row) => toClientImageSearchMatch(row, types));
          return res.json({
            cached: true,
            status: 'done',
            contentHash,
            ...cached,
            results,
            total: results.length,
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
        userId: req.user!.id,
        fetchRecords: () => listRecordsByPublish(db, schema, 'published'),
      });
      res.status(202).json({ ...job, cached: false, contentHash });
    } catch (err) {
      console.error('Image search enqueue error:', err);
      res.status(500).json({ error: 'Could not queue image search' });
    }
  });

  app.get('/api/search/image/jobs/:jobId', authMiddleware, (req, res) => {
    const job = getImageSearchJob(routeParam(req.params.jobId), req.user!);
    if (!job) {
      return res.status(404).json({ error: 'Job not found or expired' });
    }
    const types = loadRecordTypeMap(db, schema);
    const results = job.results ? publishedImageSearchMatches(job.results).map((row) => toClientImageSearchMatch(row, types)) : null;
    res.json({
      ...job,
      results,
      total: results?.length ?? job.total,
    });
  });
}
