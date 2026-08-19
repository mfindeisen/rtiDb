import { SEARCH_FILTER_FIELDS, formatRecordDateTime, getRecordOutputBadge, getRecordUpdatedAt } from '@rtidb/shared';
import type { RecordRow } from '@rtidb/shared/api/records';

export const GALLERY_COLUMN_PREFS_KEY = 'galleryColumnPrefs';

export type GalleryColumnKind =
  | 'preview'
  | 'nameDescription'
  | 'name'
  | 'description'
  | 'recordType'
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
  { id: 'recordType', label: 'Record type', kind: 'recordType', defaultVisible: false, width: 'w-40' },
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

export const GALLERY_COLUMN_OVERRIDES_KEY = 'galleryColumnOverrides';

export interface GalleryColumnPrefs {
  visibleOrder: string[];
}

export type GalleryColumnField = { key: string; label: string };

function columnMap(extraFields: GalleryColumnField[] = []): Map<string, GalleryColumnDef> {
  return new Map(allGalleryColumnsForFields(extraFields).map((col) => [col.id, col]));
}

export function metadataColumnsFromFields(fields: GalleryColumnField[]): GalleryColumnDef[] {
  return fields.map((field) => ({
    id: `meta:${field.key}`,
    label: field.label,
    kind: 'metadata' as const,
    defaultVisible: false,
    metadataKey: field.key,
  }));
}

export function sortFieldForColumn(col: GalleryColumnDef): string | null {
  switch (col.kind) {
    case 'preview':
    case 'action':
      return null;
    case 'nameDescription':
    case 'name':
      return 'name';
    case 'description':
      return 'description';
    case 'recordType':
      return 'recordType';
    case 'outputType':
      return 'outputType';
    case 'dates':
    case 'dateCreated':
      return 'date';
    case 'dateUpdated':
      return 'dateUpdated';
    case 'metadata':
      return col.metadataKey || null;
    default:
      return null;
  }
}

export interface GallerySortFieldOption {
  value: string;
  label: string;
}

const SORT_FIELD_LABELS: Record<string, string> = {
  name: 'Name',
  description: 'Description',
  recordType: 'Record type',
  outputType: 'Output type',
  date: 'Date created',
  dateUpdated: 'Date updated',
};

export function sortFieldOptionsForColumns(columns: GalleryColumnDef[]): GallerySortFieldOption[] {
  const seen = new Set<string>();
  const options: GallerySortFieldOption[] = [];
  for (const col of columns) {
    const field = sortFieldForColumn(col);
    if (!field || seen.has(field)) continue;
    seen.add(field);
    options.push({
      value: field,
      label: col.kind === 'metadata' ? col.label : (SORT_FIELD_LABELS[field] ?? col.label),
    });
  }
  return options;
}

export function allGalleryColumnsForFields(fields: GalleryColumnField[]): GalleryColumnDef[] {
  return [...BUILTIN_COLUMNS, ...metadataColumnsFromFields(fields)];
}

export function resolveColumnsByIds(
  ids: string[],
  extraFields: Array<{ key: string; label: string }> = [],
): GalleryColumnDef[] {
  const byId = new Map(allGalleryColumnsForFields(extraFields).map((col) => [col.id, col]));
  return ids.map((id) => byId.get(id)).filter((col): col is GalleryColumnDef => col != null);
}

export function getMetadataValue(record: RecordRow, key: string): string {
  const value = record.metadata?.[key];
  if (value == null) return '';
  return String(value).trim();
}

/** Displayed cell text used by the gallery search box (preview/action have none). */
export function getColumnSearchText(record: RecordRow, col: GalleryColumnDef): string {
  switch (col.kind) {
    case 'preview':
    case 'action':
      return '';
    case 'name':
      return record.name || '';
    case 'description':
      return record.description || '';
    case 'nameDescription': {
      const badge = getRecordOutputBadge(record);
      return [record.name, record.description, badge?.label].filter(Boolean).join(' ');
    }
    case 'outputType':
      return getRecordOutputBadge(record)?.label || '';
    case 'recordType':
      return record.recordTypeName || '';
    case 'dates':
      return [
        formatRecordDateTime(record.date),
        record.date,
        getRecordUpdatedAt(record),
      ].filter(Boolean).join(' ');
    case 'dateCreated':
      return [formatRecordDateTime(record.date), record.date].filter(Boolean).join(' ');
    case 'dateUpdated':
      return getRecordUpdatedAt(record) || '';
    case 'metadata':
      return col.metadataKey ? getMetadataValue(record, col.metadataKey) : '';
    default:
      return '';
  }
}

export function recordMatchesGallerySearch(
  record: RecordRow,
  query: string,
  columns: GalleryColumnDef[],
): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return columns.some((col) => getColumnSearchText(record, col).toLowerCase().includes(q));
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

    const validOrder = parsed.visibleOrder.filter((id) => typeof id === 'string' && id.trim());
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

export function hasStoredGalleryColumnPrefs(): boolean {
  if (typeof localStorage === 'undefined') return false;
  return localStorage.getItem(GALLERY_COLUMN_PREFS_KEY) != null;
}

function loadColumnOverrides(): Record<string, string[]> {
  if (typeof localStorage === 'undefined') return {};
  try {
    const raw = localStorage.getItem(GALLERY_COLUMN_OVERRIDES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const result: Record<string, string[]> = {};
    for (const [slug, ids] of Object.entries(parsed)) {
      if (!Array.isArray(ids)) continue;
      const order = ids.map((id) => String(id).trim()).filter(Boolean);
      if (order.length) result[slug] = order;
    }
    return result;
  } catch {
    return {};
  }
}

export function getColumnOverride(viewSlug: string): string[] | null {
  const ids = loadColumnOverrides()[viewSlug];
  return ids?.length ? [...ids] : null;
}

export function setColumnOverride(viewSlug: string, ids: string[]): void {
  if (typeof localStorage === 'undefined' || !viewSlug) return;
  const all = loadColumnOverrides();
  all[viewSlug] = ids;
  localStorage.setItem(GALLERY_COLUMN_OVERRIDES_KEY, JSON.stringify(all));
}

export function clearColumnOverride(viewSlug: string): void {
  if (typeof localStorage === 'undefined' || !viewSlug) return;
  const all = loadColumnOverrides();
  delete all[viewSlug];
  localStorage.setItem(GALLERY_COLUMN_OVERRIDES_KEY, JSON.stringify(all));
}

export function sanitizeColumnIds(
  ids: string[],
  extraFields: GalleryColumnField[] = [],
  fallback: string[] = DEFAULT_VISIBLE_COLUMN_IDS,
): string[] {
  const byId = columnMap(extraFields);
  const valid = ids.filter((id) => byId.has(id));
  if (valid.length) return valid;
  const defaults = fallback.filter((id) => byId.has(id));
  return defaults.length ? defaults : [...DEFAULT_VISIBLE_COLUMN_IDS];
}

export function resolveVisibleColumns(
  prefs: GalleryColumnPrefs,
  extraFields: GalleryColumnField[] = [],
): GalleryColumnDef[] {
  const byId = columnMap(extraFields);
  return prefs.visibleOrder
    .map((id) => byId.get(id))
    .filter((col): col is GalleryColumnDef => col != null);
}

export function getHiddenColumns(
  prefs: GalleryColumnPrefs,
  extraFields: GalleryColumnField[] = [],
): GalleryColumnDef[] {
  const visible = new Set(prefs.visibleOrder);
  return allGalleryColumnsForFields(extraFields).filter((col) => !visible.has(col.id));
}

export function toggleColumn(
  prefs: GalleryColumnPrefs,
  columnId: string,
  visible: boolean,
  extraFields: GalleryColumnField[] = [],
): GalleryColumnPrefs {
  if (!columnMap(extraFields).has(columnId)) return prefs;

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
