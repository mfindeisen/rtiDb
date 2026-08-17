import { describe, expect, it } from 'vitest';
import { parseResourceId, resolvePublishedFilter } from '../lib/userResources.js';
import { routeParam, queryNumber } from '../lib/httpParams.js';
import { RESEARCHER_DEFAULT_PERMISSIONS } from '@rtidb/shared/authorization';

describe('userResources', () => {
  it('parseResourceId accepts numeric strings', () => {
    expect(parseResourceId('42')).toBe(42);
    expect(parseResourceId(['7'])).toBe(7);
    expect(parseResourceId('abc')).toBeNull();
  });

  it('resolvePublishedFilter ignores draft/all query params for anonymous users', () => {
    expect(resolvePublishedFilter({ query: { published: '0' } })).toBe('published');
    expect(resolvePublishedFilter({ query: { published: 'all' } })).toBe('published');
  });

  it('resolvePublishedFilter allows staff to request draft and all catalogs', () => {
    const editor = { id: 1, username: 'e', role: 'editor' as const, permissions: [] };
    expect(resolvePublishedFilter({ user: editor, query: { published: '0' } })).toBe('unpublished');
    expect(resolvePublishedFilter({ user: editor, query: { published: 'all' } })).toBe('all');
  });

  it('resolvePublishedFilter keeps researchers on published catalog only', () => {
    const researcher = {
      id: 2,
      username: 'r',
      role: 'researcher' as const,
      permissions: RESEARCHER_DEFAULT_PERMISSIONS,
    };
    expect(resolvePublishedFilter({ user: researcher, query: { published: '0' } })).toBe('published');
    expect(resolvePublishedFilter({ user: researcher, query: { published: 'all' } })).toBe('published');
  });
});

describe('httpParams', () => {
  it('routeParam returns first array value', () => {
    expect(routeParam(['a', 'b'])).toBe('a');
    expect(routeParam('x')).toBe('x');
  });

  it('queryNumber parses numbers', () => {
    expect(queryNumber('12')).toBe(12);
    expect(queryNumber(undefined)).toBeUndefined();
    expect(queryNumber('nope')).toBeUndefined();
  });
});
