import fs from 'fs/promises';
import { computeImageEmbedding, cosineSimilarity } from './imageEmbeddings.js';
import { parseImageEmbedding, resolveThumbnailPath } from './recordEmbeddings.js';

const DEFAULT_MIN_SIMILARITY = 0.55;

export async function findSimilarRecords(uploadPath, records, uploadDir, {
  limit = 12,
  minSimilarity = DEFAULT_MIN_SIMILARITY,
  onProgress,
} = {}) {
  onProgress?.('embedding');
  const queryEmbedding = await computeImageEmbedding(uploadPath);
  onProgress?.('ranking');
  const candidates = records.filter((r) => r.isPublished === 1 && r.thumbnailUrl);

  const scored = [];
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
