import type { RecordRow } from '@rtidb/shared/api/records';

/**
 * Human-readable URL path for a catalog record (slug preferred, numeric id fallback).
 */
export function recordPath(recordOrId: RecordRow | number | string, slug?: string | null): string {
  if (recordOrId != null && typeof recordOrId === 'object') {
    const rec = recordOrId;
    return `/record/${rec.slug || rec.id}`;
  }
  return `/record/${slug || recordOrId}`;
}

/** API path key for record-scoped endpoints (slug preferred, numeric id fallback). */
export function recordApiKey(record: { slug?: string | null; id: number | string } | null | undefined): string | number {
  if (!record) return '';
  return record.slug || record.id;
}
