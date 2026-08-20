import { describe, expect, it } from 'vitest';
import { buildFtsMatchQuery, parseFiltersParam, searchRecords, tokenizeSearchQuery } from './search.js';

describe('tokenizeSearchQuery', () => {
  it('splits hyphens so they are not FTS NOT operators', () => {
    expect(tokenizeSearchQuery('RTI_2024-001')).toEqual(['rti_2024', '001']);
  });
});

describe('buildFtsMatchQuery', () => {
  it('returns prefix tokens joined with AND', () => {
    expect(buildFtsMatchQuery('Seal Lion')).toBe('seal* AND lion*');
  });

  it('strips punctuation and ignores short tokens', () => {
    expect(buildFtsMatchQuery('a "Persepolis" site!')).toBe('persepolis* AND site*');
  });

  it('treats hyphens as token separators', () => {
    expect(buildFtsMatchQuery('RTI_2024-001')).toBe('rti_2024* AND 001*');
  });

  it('returns null when nothing searchable remains', () => {
    expect(buildFtsMatchQuery('a ?')).toBeNull();
    expect(buildFtsMatchQuery('')).toBeNull();
  });
});

describe('parseFiltersParam', () => {
  it('coerces numbers and skips nested objects', () => {
    expect(parseFiltersParam('{"primaryMotif":"lion","year":2024,"nested":{"x":1}}')).toEqual({
      primaryMotif: 'lion',
      year: '2024',
    });
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

  it('matches tokens that live in different fields', () => {
    const result = searchRecords(records, { q: 'seal lion', publishedOnly: true });
    expect(result.total).toBe(1);
    expect(result.results[0]?.name).toBe('Seal A');
  });

  it('omits filesystem paths and embeddings from results', () => {
    const withSecrets = [{
      ...records[0],
      originalFilePath: '/var/data/secret.ptm',
      weightsFilePath: '/var/data/secret.npz',
      imageEmbedding: [0.1, 0.2],
    }] as unknown as import('../types/index.js').DbRecord[];
    const result = searchRecords(withSecrets, { q: 'seal', publishedOnly: true });
    const row = result.results[0] as unknown as Record<string, unknown>;
    expect(row.originalFilePath).toBeUndefined();
    expect(row.weightsFilePath).toBeUndefined();
    expect(row.imageEmbedding).toBeUndefined();
  });

  it('ignores non-string filter values instead of throwing', () => {
    const filters = { primaryMotif: { nested: true } as unknown as string };
    expect(() => searchRecords(records, { publishedOnly: true, filters })).not.toThrow();
    expect(searchRecords(records, { publishedOnly: true, filters }).total).toBe(2);
  });

  it('paginates results', () => {
    const result = searchRecords(records, { publishedOnly: true, page: 1, limit: 1 });
    expect(result.total).toBe(2);
    expect(result.results).toHaveLength(1);
    expect(result.totalPages).toBe(2);
  });

  it('sorts published records by name', () => {
    const result = searchRecords(records, { publishedOnly: true, sort: 'name', dir: 'asc' });
    expect(result.results.map((row) => row.name)).toEqual(['Seal A', 'Seal B']);
  });
});
