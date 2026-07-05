import { normalizeMetadata, getFilledMetadata, ALL_METADATA_KEYS, parseGpsPosition } from './metadataFields.js';
import { recordPublicPath } from './slug.js';

/** Friendly aliases for common filter query params (non-technical API consumers). */
export const METADATA_FILTER_ALIASES = {
  iconography: 'primaryMotif',
  motif: 'primaryMotif',
  period: 'culturalPeriod',
  registration: 'primaryRegistrationNumber',
  regno: 'primaryRegistrationNumber',
  site: 'siteGeographicLocation',
  object: 'objectType',
};

const RESERVED_QUERY_KEYS = new Set([
  'q',
  'published',
  'page',
  'limit',
  'filters',
  'bbox',
  'format',
]);

export function parseMetadataFiltersFromQuery(query = {}) {
  const filters = {};

  if (query.filters) {
    try {
      const parsed = JSON.parse(query.filters);
      if (parsed && typeof parsed === 'object') {
        Object.assign(filters, parsed);
      }
    } catch {
      // ignore invalid JSON
    }
  }

  for (const [key, value] of Object.entries(query)) {
    if (RESERVED_QUERY_KEYS.has(key) || value == null || value === '') continue;
    const metaKey = METADATA_FILTER_ALIASES[key] || key;
    if (ALL_METADATA_KEYS.includes(metaKey) || METADATA_FILTER_ALIASES[key]) {
      filters[metaKey] = String(value);
    }
  }

  return filters;
}

export function normalizeRecordRow(record) {
  if (!record) return null;
  const metadata = normalizeMetadata(record.metadata);
  return {
    ...record,
    metadata,
    registrationNumber:
      metadata.primaryRegistrationNumber ||
      metadata.rtiFileName ||
      null,
  };
}

export function findRecordByIdentifier(records, identifier) {
  if (!identifier) return null;

  const asNumber = Number(identifier);
  if (Number.isInteger(asNumber) && asNumber > 0) {
    const byId = records.find((r) => r.id === asNumber);
    if (byId) return byId;
  }

  const needle = String(identifier).trim().toLowerCase();
  return (
    records.find((r) => {
      if (r.slug && r.slug.toLowerCase() === needle) return true;
      const meta = normalizeMetadata(r.metadata);
      const candidates = [
        meta.primaryRegistrationNumber,
        meta.rtiFileName,
        meta.secondaryRegistrationNumber,
        r.name,
      ].filter(Boolean);
      return candidates.some((c) => c.toLowerCase() === needle || c.toLowerCase().includes(needle));
    }) || null
  );
}

export function buildPublicRecord(record, req) {
  const normalized = normalizeRecordRow(record);
  const baseUrl = getBaseUrl(req);
  const apiKey = normalized.slug || normalized.id;
  const viewerPath = recordPublicPath(normalized);
  return {
    id: normalized.id,
    slug: normalized.slug || null,
    name: normalized.name,
    description: normalized.description,
    date: normalized.date,
    status: normalized.status,
    direction: normalized.direction,
    isPublished: normalized.isPublished === 1,
    registrationNumber: normalized.registrationNumber,
    metadata: getFilledMetadata(normalized.metadata),
    links: {
      self: `${baseUrl}/api/records/${apiKey}`,
      metadata: `${baseUrl}/api/records/${apiKey}/metadata`,
      export: `${baseUrl}/api/records/${apiKey}/export`,
      rti: `${baseUrl}/api/records/${apiKey}/rti`,
      viewer: `${baseUrl}${viewerPath}`,
      iiif: `${baseUrl}/api/records/${apiKey}/export?format=iiif`,
    },
    assets: buildRtiAssets(normalized, baseUrl),
  };
}

export function buildRtiAssets(record, baseUrl) {
  const assets = {
    thumbnailUrl: record.thumbnailUrl || null,
    tiffUrl: record.tiffUrl || null,
    folderUrl: record.folderUrl || null,
    outputType: record.outputType || null,
    ready: record.status === 'done',
  };

  if (record.thumbnailUrl && !record.thumbnailUrl.startsWith('http')) {
    assets.thumbnailUrl = `${baseUrl}${record.thumbnailUrl}`;
  }
  if (record.tiffUrl && !record.tiffUrl.startsWith('http')) {
    assets.tiffUrl = `${baseUrl}${record.tiffUrl}`;
  }
  if (record.folderUrl && !record.folderUrl.startsWith('http')) {
    assets.folderUrl = `${baseUrl}${record.folderUrl}`;
  }

  return assets;
}

export function getBaseUrl(req) {
  if (process.env.PUBLIC_BASE_URL) {
    return process.env.PUBLIC_BASE_URL.replace(/\/$/, '');
  }
  const proto = req.get('x-forwarded-proto') || req.protocol || 'http';
  const host = req.get('x-forwarded-host') || req.get('host') || 'localhost';
  return `${proto}://${host}`;
}

export function recordCitationKey(record) {
  const meta = normalizeMetadata(record.metadata);
  const reg = meta.primaryRegistrationNumber || meta.rtiFileName;
  if (reg) return reg.replace(/[^a-zA-Z0-9_-]/g, '_');
  return `rti_record_${record.id}`;
}

export function recordCitationTitle(record) {
  const meta = normalizeMetadata(record.metadata);
  const motif = meta.primaryMotif;
  const site = meta.siteGeographicLocation || meta.discoveryLocation;
  if (motif && site) return `${motif} — ${site}`;
  return record.name;
}

export function recordGps(record) {
  const meta = normalizeMetadata(record.metadata);
  return parseGpsPosition(meta.gpsPosition);
}
