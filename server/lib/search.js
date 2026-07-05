import { normalizeMetadata, parseGpsPosition } from './metadataFields.js';

function getMetadata(record) {
  if (!record.metadata) return {};
  if (typeof record.metadata === 'string') {
    try {
      return normalizeMetadata(JSON.parse(record.metadata));
    } catch {
      return normalizeMetadata({});
    }
  }
  return normalizeMetadata(record.metadata);
}

function recordSearchText(record) {
  const meta = getMetadata(record);
  const parts = [record.name, record.description, ...Object.values(meta)];
  return parts.filter(Boolean).join(' ').toLowerCase();
}

function matchesQuery(record, q) {
  if (!q?.trim()) return true;
  return recordSearchText(record).includes(q.trim().toLowerCase());
}

function matchesFilters(record, filters) {
  if (!filters || typeof filters !== 'object') return true;
  const meta = getMetadata(record);

  for (const [key, value] of Object.entries(filters)) {
    if (!value?.trim()) continue;
    const fieldValue = (meta[key] || '').toLowerCase();
    const filterVal = value.trim().toLowerCase();
    if (!fieldValue.includes(filterVal)) return false;
  }
  return true;
}

function matchesBbox(record, bbox) {
  if (!bbox) return true;
  const meta = getMetadata(record);
  const coords = parseGpsPosition(meta.gpsPosition);
  if (!coords) return false;

  const [west, south, east, north] = bbox;
  return coords.lng >= west && coords.lng <= east && coords.lat >= south && coords.lat <= north;
}

export function enrichRecord(record) {
  const metadata = getMetadata(record);
  const coords = parseGpsPosition(metadata.gpsPosition);
  return {
    ...record,
    metadata,
    lat: coords?.lat ?? null,
    lng: coords?.lng ?? null,
  };
}

export function searchRecords(records, options = {}) {
  const {
    q = '',
    filters = {},
    bbox = null,
    publishedOnly = true,
    page = 1,
    limit = 20,
  } = options;

  let results = records;
  if (publishedOnly) {
    results = results.filter((r) => r.isPublished === 1);
  }

  results = results.filter((r) => matchesQuery(r, q));
  results = results.filter((r) => matchesFilters(r, filters));
  results = results.filter((r) => matchesBbox(r, bbox));

  const total = results.length;
  const safePage = Math.max(1, Number(page) || 1);
  const safeLimit = Math.min(100, Math.max(1, Number(limit) || 20));
  const offset = (safePage - 1) * safeLimit;
  const pageResults = results.slice(offset, offset + safeLimit).map(enrichRecord);

  return {
    total,
    page: safePage,
    limit: safeLimit,
    totalPages: Math.ceil(total / safeLimit) || 1,
    results: pageResults,
  };
}

export function parseBboxParam(bboxStr) {
  if (!bboxStr) return null;
  const parts = String(bboxStr).split(',').map((v) => parseFloat(v.trim()));
  if (parts.length !== 4 || parts.some((n) => !Number.isFinite(n))) return null;
  const [west, south, east, north] = parts;
  if (west >= east || south >= north) return null;
  return parts;
}

export function parseFiltersParam(filtersStr) {
  if (!filtersStr) return {};
  try {
    const parsed = JSON.parse(filtersStr);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}
