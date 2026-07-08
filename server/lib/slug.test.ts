import { describe, expect, it } from 'vitest';
import { slugify, deriveSlugBase } from './slug.js';

describe('slugify', () => {
  it('normalizes text to url-safe slugs', () => {
    expect(slugify('  Hello World!  ')).toBe('hello-world');
    expect(slugify('RTI_2024-001')).toBe('rti_2024-001');
  });

  it('falls back to empty string for non-alphanumeric input', () => {
    expect(slugify('!!!')).toBe('');
  });
});

describe('deriveSlugBase', () => {
  it('prefers registration number over name', () => {
    expect(deriveSlugBase({
      name: 'Fallback Name',
      metadata: { primaryRegistrationNumber: 'REG-42', rtiFileName: 'scan.ptm' },
    })).toBe('reg-42');
  });
});
