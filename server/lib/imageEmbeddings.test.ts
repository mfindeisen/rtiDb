import { describe, expect, it } from 'vitest';
import { cosineSimilarity, normalizeVector } from './imageEmbeddings.js';

describe('cosineSimilarity', () => {
  it('returns 1 for identical L2-normalized vectors', () => {
    const vector = normalizeVector([3, 4]);
    expect(cosineSimilarity(vector, vector)).toBeCloseTo(1);
  });

  it('returns 0 for missing or mismatched vectors', () => {
    expect(cosineSimilarity(null, [1])).toBe(0);
    expect(cosineSimilarity([1, 0], [1])).toBe(0);
  });
});
