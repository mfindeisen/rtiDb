import { SEARCH_FILTER_FIELDS } from '@rtidb/shared';
import type { RecordRow } from '@rtidb/shared/api/records';

export const GALLERY_COLUMN_PREFS_KEY = 'galleryColumnPrefs';

export type GalleryColumnKind =
  | 'preview'
  | 'nameDescription'
  | 'name'
  | 'description'
  | 'dates'
  | 'dateCreated'
  | 'dateUpdated'
  | 'outputType'
  | 'action'
  | 'metadata';

export interface GalleryColumnDef {
  id: string;
  label: string;
  kind: GalleryColumnKind;
  defaultVisible: boolean;
  width?: string;
  align?: 'left' | 'center';
  metadataKey?: string;
}

const BUILTIN_COLUMNS: GalleryColumnDef[] = [
  { id: 'preview', label: 'Preview', kind: 'preview', defaultVisible: true, width: 'w-24' },
  { id: 'nameDescription', label: 'Name & Description', kind: 'nameDescription', defaultVisible: true },
  { id: 'name', label: 'Name', kind: 'name', defaultVisible: false },
  { id: 'description', label: 'Description', kind: 'description', defaultVisible: false },
  { id: 'outputType', label: 'Output Type', kind: 'outputType', defaultVisible: false, width: 'w-36' },
  { id: 'dates', label: 'Dates', kind: 'dates', defaultVisible: true, width: 'w-52' },
  { id: 'dateCreated', label: 'Date Created', kind: 'dateCreated', defaultVisible: false, width: 'w-40' },
  { id: 'dateUpdated', label: 'Date Updated', kind: 'dateUpdated', defaultVisible: false, width: 'w-40' },
  { id: 'action', label: 'Action', kind: 'action', defaultVisible: true, width: 'w-24', align: 'center' },
];

const METADATA_COLUMNS: GalleryColumnDef[] = SEARCH_FILTER_FIELDS.map((field) => ({
  id: `meta:${field.key}`,
  label: field.label,
  kind: 'metadata' as const,
  defaultVisible: false,
  metadataKey: field.key,
}));

export const ALL_GALLERY_COLUMNS: GalleryColumnDef[] = [...BUILTIN_COLUMNS, ...METADATA_COLUMNS];

export const DEFAULT_VISIBLE_COLUMN_IDS = BUILTIN_COLUMNS
  .filter((col) => col.defaultVisible)
  .map((col) => col.id);

const columnById = new Map(ALL_GALLERY_COLUMNS.map((col) => [col.id, col]));

export interface GalleryColumnPrefs {
  visibleOrder: string[];
}

export function getMetadataValue(record: RecordRow, key: string): string {
  const value = record.metadata?.[key];
  if (value == null) return '';
  return String(value).trim();
}

export function loadGalleryColumnPrefs(): GalleryColumnPrefs {
  if (typeof localStorage === 'undefined') {
    return { visibleOrder: [...DEFAULT_VISIBLE_COLUMN_IDS] };
  }

  try {
    const raw = localStorage.getItem(GALLERY_COLUMN_PREFS_KEY);
    if (!raw) return { visibleOrder: [...DEFAULT_VISIBLE_COLUMN_IDS] };

    const parsed = JSON.parse(raw) as Partial<GalleryColumnPrefs>;
    if (!Array.isArray(parsed.visibleOrder)) {
      return { visibleOrder: [...DEFAULT_VISIBLE_COLUMN_IDS] };
    }

    const validOrder = parsed.visibleOrder.filter((id) => columnById.has(id));
    if (validOrder.length === 0) {
      return { visibleOrder: [...DEFAULT_VISIBLE_COLUMN_IDS] };
    }

    return { visibleOrder: validOrder };
  } catch {
    return { visibleOrder: [...DEFAULT_VISIBLE_COLUMN_IDS] };
  }
}

export function saveGalleryColumnPrefs(prefs: GalleryColumnPrefs): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(GALLERY_COLUMN_PREFS_KEY, JSON.stringify(prefs));
}

export function resolveVisibleColumns(prefs: GalleryColumnPrefs): GalleryColumnDef[] {
  return prefs.visibleOrder
    .map((id) => columnById.get(id))
    .filter((col): col is GalleryColumnDef => col != null);
}

export function getHiddenColumns(prefs: GalleryColumnPrefs): GalleryColumnDef[] {
  const visible = new Set(prefs.visibleOrder);
  return ALL_GALLERY_COLUMNS.filter((col) => !visible.has(col.id));
}

export function toggleColumn(prefs: GalleryColumnPrefs, columnId: string, visible: boolean): GalleryColumnPrefs {
  if (!columnById.has(columnId)) return prefs;

  if (visible) {
    if (prefs.visibleOrder.includes(columnId)) return prefs;
    return { visibleOrder: [...prefs.visibleOrder, columnId] };
  }

  if (prefs.visibleOrder.length <= 1) return prefs;
  return { visibleOrder: prefs.visibleOrder.filter((id) => id !== columnId) };
}

export function moveColumn(prefs: GalleryColumnPrefs, columnId: string, direction: -1 | 1): GalleryColumnPrefs {
  const index = prefs.visibleOrder.indexOf(columnId);
  if (index < 0) return prefs;

  const target = index + direction;
  if (target < 0 || target >= prefs.visibleOrder.length) return prefs;

  const next = [...prefs.visibleOrder];
  [next[index], next[target]] = [next[target]!, next[index]!];
  return { visibleOrder: next };
}

export function resetGalleryColumnPrefs(): GalleryColumnPrefs {
  return { visibleOrder: [...DEFAULT_VISIBLE_COLUMN_IDS] };
}
