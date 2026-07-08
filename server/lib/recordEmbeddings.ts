import fs from 'fs/promises';
import path from 'path';
import { eq } from 'drizzle-orm';
import { computeImageEmbedding, type ImageEmbedding } from './imageEmbeddings.js';
import type { AppDb, AppSchema } from '../types/index.js';

export function resolveThumbnailPath(thumbnailUrl: string | null | undefined, uploadDir: string): string | null {
  if (!thumbnailUrl) return null;
  const relative = thumbnailUrl.replace(/^\/static\/uploads\//, '');
  return path.join(uploadDir, relative);
}

/** Parse stored embedding (Drizzle JSON column or legacy string). */
export function parseImageEmbedding(value: unknown): ImageEmbedding | null {
  if (!value) return null;
  if (Array.isArray(value)) return value as ImageEmbedding;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? (parsed as ImageEmbedding) : null;
    } catch {
      return null;
    }
  }
  return null;
}

/** Compute CLIP embedding from thumbnail and persist on the record. */
export async function updateRecordImageEmbedding(
  db: AppDb,
  schema: AppSchema,
  recordId: number,
  thumbnailUrl: string | null | undefined,
  uploadDir: string,
): Promise<boolean> {
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
