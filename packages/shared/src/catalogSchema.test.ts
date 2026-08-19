import { describe, expect, it } from 'vitest';
import {
  buildCatalogSchemaFromSections,
  parseCatalogSchema,
  schemaFieldKeys,
  slugifyFieldKey,
  unionCatalogSchemas,
} from './catalogSchema.js';
import { normalizeMetadata, DEFAULT_CATALOG_SCHEMA, SEARCH_FILTER_FIELDS } from './metadataFields.js';
import { parseSiteConfig, DEFAULT_SITE_CONFIG, oklchCss, parseViewConfig } from './index.js';

describe('catalog schema', () => {
  it('builds search flags from the seed filter keys', () => {
    const keys = new Set(SEARCH_FILTER_FIELDS.map((field) => field.key));
    const schema = buildCatalogSchemaFromSections(DEFAULT_CATALOG_SCHEMA, [...keys]);
    expect(schemaFieldKeys(schema).length).toBeGreaterThan(10);
    const flagged = schema.flatMap((s) => s.fields).filter((f) => f.showInSearch).map((f) => f.key);
    expect(new Set(flagged)).toEqual(keys);
  });

  it('keeps extra metadata keys when normalizing', () => {
    const schema = parseCatalogSchema([
      { id: 'core', title: 'Core', fields: [{ key: 'material', label: 'Material', type: 'text' }] },
    ]);
    const normalized = normalizeMetadata({ material: 'Clay', customNote: 'hello' }, schema);
    expect(normalized.material).toBe('Clay');
    expect(normalized.customNote).toBe('hello');
  });

  it('slugifies field keys', () => {
    expect(slugifyFieldKey('Site / Location')).toBe('siteLocation');
  });

  it('unions schemas without duplicate keys', () => {
    const union = unionCatalogSchemas([
      [{ id: 'a', title: 'A', fields: [{ key: 'name', label: 'Name', type: 'text', showInSearch: true }] }],
      [{ id: 'a', title: 'A', fields: [{ key: 'name', label: 'Name 2', type: 'text' }, { key: 'site', label: 'Site', type: 'text' }] }],
    ]);
    expect(schemaFieldKeys(union)).toEqual(['name', 'site']);
  });
});

describe('site config', () => {
  it('falls back to defaults', () => {
    expect(parseSiteConfig(null).siteName).toBe(DEFAULT_SITE_CONFIG.siteName);
    expect(parseSiteConfig({ siteName: '  Seals  ', primaryColor: 'blue' }).primaryColor).toBe(DEFAULT_SITE_CONFIG.primaryColor);
    expect(parseSiteConfig({ siteName: 'Seals' }).citationName).toBe('Seals');
  });

  it('parses date and time formats', () => {
    expect(parseSiteConfig(null).dateFormat).toBe(DEFAULT_SITE_CONFIG.dateFormat);
    expect(parseSiteConfig({ dateFormat: 'dmy-dot', timeFormat: '12h' }).dateFormat).toBe('dmy-dot');
    expect(parseSiteConfig({ dateFormat: 'dmy-dot', timeFormat: '12h' }).timeFormat).toBe('12h');
    expect(parseSiteConfig({ dateFormat: 'nope', timeFormat: 'maybe' }).dateFormat).toBe(DEFAULT_SITE_CONFIG.dateFormat);
    expect(parseSiteConfig({ dateFormat: 'nope', timeFormat: 'maybe' }).timeFormat).toBe(DEFAULT_SITE_CONFIG.timeFormat);
  });

  it('emits oklch css', () => {
    expect(oklchCss('#3B82F6')).toMatch(/^oklch\(/);
  });
});

describe('view config', () => {
  it('parses column ids and sort', () => {
    const config = parseViewConfig({
      visibleColumnIds: ['preview', 'meta:material'],
      sort: { field: 'name', dir: 'asc' },
      filters: { material: 'Clay' },
    });
    expect(config.visibleColumnIds).toEqual(['preview', 'meta:material']);
    expect(config.sort).toEqual({ field: 'name', dir: 'asc' });
    expect(config.filters.material).toBe('Clay');
  });
});
