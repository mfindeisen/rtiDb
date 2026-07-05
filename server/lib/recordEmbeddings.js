import fs from 'fs/promises';
import path from 'path';
import { eq } from 'drizzle-orm';
import { computeImageEmbedding } from './imageEmbeddings.js';

export function resolveThumbnailPath(thumbnailUrl, uploadDir) {
  if (!thumbnailUrl) return null;
  const relative = thumbnailUrl.replace(/^\/static\/uploads\//, '');
  return path.join(uploadDir, relative);
}

/** Parse stored embedding (Drizzle JSON column or legacy string). */
export function parseImageEmbedding(value) {
  if (!value) return null;
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }
  return null;
}

/** Compute CLIP embedding from thumbnail and persist on the record. */
export async function updateRecordImageEmbedding(db, schema, recordId, thumbnailUrl, uploadDir) {
  const thumbPath = resolveThumbnailPath(thumbnailUrl, uploadDir);
  if (!thumbPath) return false;

  await fs.access(thumbPath);
  const embedding = await computeImageEmbedding(thumbPath);
  db.update(schema.records)
    .set({ imageEmbedding: embedding })
    .where(eq(schema.records.id, recordId))
    .run();
  return true;
}
