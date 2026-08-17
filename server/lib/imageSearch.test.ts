import { describe, expect, it } from 'vitest';
import { publishedImageSearchMatches, type ImageSearchMatch } from './imageSearch.js';
import { canReadImageSearchJob } from './imageSearchQueue.js';

describe('publishedImageSearchMatches', () => {
  it('drops unpublished catalog hits from cached results', () => {
    const results = [
      { id: 1, isPublished: 1, name: 'Public', similarity: 80 },
      { id: 2, isPublished: 0, name: 'Draft', similarity: 99 },
    ] as ImageSearchMatch[];
    expect(publishedImageSearchMatches(results).map((r) => r.id)).toEqual([1]);
  });
});

describe('canReadImageSearchJob', () => {
  it('allows the owner and admins, not other users', () => {
    expect(canReadImageSearchJob(7, { id: 7, role: 'researcher' })).toBe(true);
    expect(canReadImageSearchJob(7, { id: 8, role: 'researcher' })).toBe(false);
    expect(canReadImageSearchJob(7, { id: 1, role: 'admin' })).toBe(true);
    expect(canReadImageSearchJob(undefined, { id: 8, role: 'editor' })).toBe(false);
  });
});
