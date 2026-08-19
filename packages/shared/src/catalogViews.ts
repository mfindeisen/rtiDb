import type { CatalogSchema } from './catalogSchema.js';
import { galleryMetadataFieldsFromSchema } from './catalogSchema.js';

export const DEFAULT_GALLERY_COLUMN_IDS = ['preview', 'nameDescription', 'dates', 'action'] as const;

export const BUILTIN_GALLERY_COLUMN_IDS = [
  'preview',
  'nameDescription',
  'name',
  'description',
  'recordType',
  'outputType',
  'dates',
  'dateCreated',
  'dateUpdated',
  'action',
] as const;

export type BuiltinGalleryColumnId = (typeof BUILTIN_GALLERY_COLUMN_IDS)[number];

export interface CatalogViewSort {
  field: string;
  dir: 'asc' | 'desc';
}

export interface CatalogViewConfig {
  visibleColumnIds: string[];
  sort: CatalogViewSort;
  filters: Record<string, string>;
}

export interface CatalogView {
  id: number;
  recordTypeId: number | null;
  name: string;
  slug: string;
  isDefault: boolean;
  isPublic: boolean;
  config: CatalogViewConfig;
}

export const DEFAULT_VIEW_CONFIG: CatalogViewConfig = {
  visibleColumnIds: [...DEFAULT_GALLERY_COLUMN_IDS],
  sort: { field: 'date', dir: 'desc' },
  filters: {},
};

export function parseViewSort(raw: unknown): CatalogViewSort {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return { ...DEFAULT_VIEW_CONFIG.sort };
  const data = raw as Record<string, unknown>;
  const field = String(data.field || 'date').trim() || 'date';
  const dir = data.dir === 'asc' ? 'asc' : 'desc';
  return { field, dir };
}

export function parseViewConfig(raw: unknown): CatalogViewConfig {
  const data = raw && typeof raw === 'object' && !Array.isArray(raw)
    ? (raw as Record<string, unknown>)
    : {};
  const ids = Array.isArray(data.visibleColumnIds)
    ? data.visibleColumnIds.map((id) => String(id).trim()).filter(Boolean)
    : [...DEFAULT_VIEW_CONFIG.visibleColumnIds];
  const filters: Record<string, string> = {};
  if (data.filters && typeof data.filters === 'object' && !Array.isArray(data.filters)) {
    for (const [key, value] of Object.entries(data.filters as Record<string, unknown>)) {
      if (value == null) continue;
      const text = String(value).trim();
      if (text) filters[key] = text;
    }
  }
  return {
    visibleColumnIds: ids.length ? ids : [...DEFAULT_VIEW_CONFIG.visibleColumnIds],
    sort: parseViewSort(data.sort),
    filters,
  };
}

export function metadataColumnId(key: string): string {
  return `meta:${key}`;
}

export function viewColumnChoices(schema: CatalogSchema | null | undefined): string[] {
  const metaIds = galleryMetadataFieldsFromSchema(schema).map((field) => metadataColumnId(field.key));
  return [...BUILTIN_GALLERY_COLUMN_IDS, ...metaIds];
}
