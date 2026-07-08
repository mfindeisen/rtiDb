import { METADATA_SECTIONS, type CatalogMetadataKey } from './metadataFields.js';

export const SNAPSHOT_FIELDS = [
  'name',
  'description',
  'direction',
  'isPublished',
  'status',
  'outputType',
  'quality',
  'tileSize',
  'format',
  'folderUrl',
  'tiffUrl',
  'thumbnailUrl',
] as const;

export type SnapshotField = (typeof SNAPSHOT_FIELDS)[number];

export interface FieldChange {
  old: unknown;
  new: unknown;
}

export type SnapshotChanges = Partial<Record<SnapshotField, FieldChange>> & {
  metadata?: Record<string, FieldChange>;
};

export interface SerializedRevision {
  id: number;
  recordId: number;
  revisionNumber: number;
  action: string;
  comment: string | null;
  createdBy: number | null;
  createdByName: string | null;
  createdAt: string;
  changeCount: number;
  changes: SnapshotChanges | Record<string, unknown>;
  snapshot?: unknown;
}

export const REVISION_ACTION_LABELS: Record<string, string> = {
  created: 'Record created',
  updated: 'Metadata updated',
  published: 'Published',
  unpublished: 'Unpublished',
  upload_started: 'RTI upload started',
  reprocessed: 'Processing rerun',
  processing_completed: 'Processing completed',
  processing_failed: 'Processing failed',
  restored: 'Restored',
  imported: 'Baseline imported',
};

export const RECORD_FIELD_LABELS: Record<string, string> = {
  name: 'Name',
  description: 'Description',
  direction: 'Text direction',
  isPublished: 'Published',
  status: 'Status',
  outputType: 'Output type',
  quality: 'Quality',
  tileSize: 'Tile size',
  format: 'Format',
  folderUrl: 'Tile folder',
  tiffUrl: 'GeoTIFF',
  thumbnailUrl: 'Thumbnail',
};

const metadataLabelByKey = Object.fromEntries(
  METADATA_SECTIONS.flatMap((section) => section.fields.map((field) => [field.key, field.label])),
) as Record<CatalogMetadataKey, string>;

export function countChanges(changes: SnapshotChanges = {}): number {
  let total = 0;
  for (const [key, value] of Object.entries(changes)) {
    if (key === 'metadata' && value && typeof value === 'object') {
      total += Object.keys(value).length;
    } else {
      total += 1;
    }
  }
  return total;
}

export function revisionActionLabel(action: string): string {
  return REVISION_ACTION_LABELS[action] || action;
}

export function revisionFieldLabel(key: string): string {
  return RECORD_FIELD_LABELS[key] || metadataLabelByKey[key as CatalogMetadataKey] || key;
}

export function formatRevisionValue(value: unknown): string {
  if (value == null || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (value === 1 || value === '1') return 'Yes';
  if (value === 0 || value === '0') return 'No';
  return String(value);
}

export interface RevisionChangeItem {
  key: string;
  label: string;
  old: unknown;
  new: unknown;
}

export function flattenRevisionChanges(changes: SnapshotChanges | Record<string, unknown> = {}): RevisionChangeItem[] {
  const items: RevisionChangeItem[] = [];
  for (const [key, value] of Object.entries(changes)) {
    if (key === 'metadata' && value && typeof value === 'object') {
      for (const [metaKey, diff] of Object.entries(value as Record<string, FieldChange>)) {
        items.push({
          key: metaKey,
          label: revisionFieldLabel(metaKey),
          old: diff.old,
          new: diff.new,
        });
      }
    } else if (value && typeof value === 'object' && 'old' in value && 'new' in value) {
      const diff = value as FieldChange;
      items.push({
        key,
        label: revisionFieldLabel(key),
        old: diff.old,
        new: diff.new,
      });
    }
  }
  return items;
}
