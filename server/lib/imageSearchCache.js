import crypto from 'crypto';
import fs from 'fs';
import { and, eq, isNotNull, sql } from 'drizzle-orm';
import db, { schema } from '../db.js';

export function hashImageFile(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', reject);
  });
}

export function getIndexedCatalogCount() {
  const row = db
    .select({ count: sql`count(*)` })
    .from(schema.records)
    .where(and(eq(schema.records.isPublished, 1), isNotNull(schema.records.imageEmbedding)))
    .get();
  return Number(row?.count || 0);
}

export function getCachedImageSearch(contentHash, limit) {
  const row = db
    .select()
    .from(schema.imageSearchCache)
    .where(and(
      eq(schema.imageSearchCache.contentHash, contentHash),
      eq(schema.imageSearchCache.resultLimit, limit),
    ))
    .get();

  if (!row) return null;

  const now = new Date().toISOString();
  const catalogCount = getIndexedCatalogCount();

  db.update(schema.imageSearchCache)
    .set({
      lastUsedAt: now,
      hitCount: row.hitCount + 1,
    })
    .where(and(
      eq(schema.imageSearchCache.contentHash, contentHash),
      eq(schema.imageSearchCache.resultLimit, limit),
    ))
    .run();

  return {
    results: row.results,
    total: row.total,
    cachedAt: row.createdAt,
    lastUsedAt: now,
    hitCount: row.hitCount + 1,
    catalogChanged: catalogCount > row.catalogCount,
    catalogCountAtSearch: row.catalogCount,
    currentCatalogCount: catalogCount,
  };
}

export function saveCachedImageSearch(contentHash, limit, results) {
  const now = new Date().toISOString();
  const catalogCount = getIndexedCatalogCount();

  db.insert(schema.imageSearchCache)
    .values({
      contentHash,
      resultLimit: limit,
      results,
      total: results.length,
      catalogCount,
      createdAt: now,
      lastUsedAt: now,
      hitCount: 0,
    })
    .onConflictDoUpdate({
      target: [schema.imageSearchCache.contentHash, schema.imageSearchCache.resultLimit],
      set: {
        results,
        total: results.length,
        catalogCount,
        createdAt: now,
        lastUsedAt: now,
        hitCount: 0,
      },
    })
    .run();
}
