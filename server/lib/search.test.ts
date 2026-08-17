import { describe, expect, it } from 'vitest';
import { buildFtsMatchQuery, searchRecords } from './search.js';

describe('buildFtsMatchQuery', () => {
  it('returns prefix tokens joined with AND', () => {
    expect(buildFtsMatchQuery('Seal Lion')).toBe('seal* AND lion*');
  });

  it('strips punctuation and ignores short tokens', () => {
    expect(buildFtsMatchQuery('a "Persepolis" site!')).toBe('persepolis* AND site*');
  });

  it('returns null when nothing searchable remains', () => {
    expect(buildFtsMatchQuery('a ?')).toBeNull();
    expect(buildFtsMatchQuery('')).toBeNull();
  });
});

describe('searchRecords', () => {
  const records = [
    { id: 1, name: 'Seal A', description: 'lion', isPublished: 1, metadata: { primaryMotif: 'lion' } },
    { id: 2, name: 'Draft', description: 'hidden', isPublished: 0, metadata: {} },
    { id: 3, name: 'Seal B', description: 'bull', isPublished: 1, metadata: { primaryMotif: 'bull' } },
  ] as unknown as import('../types/index.js').DbRecord[];

  it('filters published records by query', () => {
    const result = searchRecords(records, { q: 'lion', publishedOnly: true });
    expect(result.total).toBe(1);
    expect(result.results[0]?.name).toBe('Seal A');
  });

  it('paginates results', () => {
    const result = searchRecords(records, { publishedOnly: true, page: 1, limit: 1 });
    expect(result.total).toBe(2);
    expect(result.results).toHaveLength(1);
    expect(result.totalPages).toBe(2);
  });
});
