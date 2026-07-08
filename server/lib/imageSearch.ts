import fs from 'fs/promises';
import { computeImageEmbedding, cosineSimilarity } from './imageEmbeddings.js';
import { parseImageEmbedding, resolveThumbnailPath } from './recordEmbeddings.js';
import type { DbRecord } from '../types/index.js';

const DEFAULT_MIN_SIMILARITY = 0.55;

export type ImageSearchPhase = 'embedding' | 'ranking';

export interface ImageSearchMatch extends DbRecord {
  similarity: number;
}

export interface FindSimilarRecordsOptions {
  limit?: number;
  minSimilarity?: number;
  onProgress?: (phase: ImageSearchPhase) => void;
}

export async function findSimilarRecords(
  uploadPath: string,
  records: DbRecord[],
  uploadDir: string,
  {
    limit = 12,
    minSimilarity = DEFAULT_MIN_SIMILARITY,
    onProgress,
  }: FindSimilarRecordsOptions = {},
): Promise<ImageSearchMatch[]> {
  onProgress?.('embedding');
  const queryEmbedding = await computeImageEmbedding(uploadPath);
  onProgress?.('ranking');
  const candidates = records.filter((r) => r.isPublished === 1 && r.thumbnailUrl);

  const scored: { record: DbRecord; similarity: number }[] = [];
  for (const record of candidates) {
    let embedding = parseImageEmbedding(record.imageEmbedding);

    if (!embedding) {
      const thumbPath = resolveThumbnailPath(record.thumbnailUrl, uploadDir);
      if (!thumbPath) continue;
      try {
        await fs.access(thumbPath);
        embedding = await computeImageEmbedding(thumbPath);
      } catch {
        continue;
      }
    }

    const similarity = cosineSimilarity(queryEmbedding, embedding);
    if (similarity < minSimilarity) continue;
    scored.push({ record, similarity });
  }

  scored.sort((a, b) => b.similarity - a.similarity);
  return scored.slice(0, limit).map(({ record, similarity }) => ({
    ...record,
    similarity: Math.round(similarity * 100),
  }));
}
