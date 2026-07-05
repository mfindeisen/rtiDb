import { METADATA_SECTIONS } from './metadataFields.js';

export const REVISION_ACTION_LABELS = {
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

export const RECORD_FIELD_LABELS = {
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
);

export function revisionActionLabel(action) {
  return REVISION_ACTION_LABELS[action] || action;
}

export function revisionFieldLabel(key) {
  return RECORD_FIELD_LABELS[key] || metadataLabelByKey[key] || key;
}

export function formatRevisionValue(value) {
  if (value == null || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (value === 1 || value === '1') return 'Yes';
  if (value === 0 || value === '0') return 'No';
  return String(value);
}

export function flattenRevisionChanges(changes = {}) {
  const items = [];
  for (const [key, value] of Object.entries(changes)) {
    if (key === 'metadata' && value && typeof value === 'object') {
      for (const [metaKey, diff] of Object.entries(value)) {
        items.push({
          key: metaKey,
          label: revisionFieldLabel(metaKey),
          old: diff.old,
          new: diff.new,
        });
      }
    } else if (value && typeof value === 'object' && 'old' in value && 'new' in value) {
      items.push({
        key,
        label: revisionFieldLabel(key),
        old: value.old,
        new: value.new,
      });
    }
  }
  return items;
}
