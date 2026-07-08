import { describe, expect, it } from 'vitest';
import { parseResourceId } from '../lib/userResources.js';
import { routeParam, queryNumber } from '../lib/httpParams.js';

describe('userResources', () => {
  it('parseResourceId accepts numeric strings', () => {
    expect(parseResourceId('42')).toBe(42);
    expect(parseResourceId(['7'])).toBe(7);
    expect(parseResourceId('abc')).toBeNull();
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
