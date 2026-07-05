/**
 * Human-readable URL path for a catalog record (slug preferred, numeric id fallback).
 */
export function recordPath(recordOrId, slug) {
  if (recordOrId != null && typeof recordOrId === 'object') {
    const rec = recordOrId;
    return `/record/${rec.slug || rec.id}`;
  }
  return `/record/${slug || recordOrId}`;
}
