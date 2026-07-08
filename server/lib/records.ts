import type { Request } from 'express';
import type { ParsedQs } from 'qs';
import { getConfig } from '../config.js';
import { normalizeMetadata, getFilledMetadata, ALL_METADATA_KEYS, parseGpsPosition, type CatalogMetadata, type CatalogMetadataKey } from './metadataFields.js';
import { recordPublicPath } from './slug.js';
import type { DbRecord } from '../types/index.js';
import type {
  PublicRecord,
  PublicRecordLinks,
  PublicRecordAssets,
} from '@rtidb/shared/api/records';

export type { PublicRecord, PublicRecordLinks, PublicRecordAssets };

/** Friendly aliases for common filter query params (non-technical API consumers). */
export const METADATA_FILTER_ALIASES = {
  iconography: 'primaryMotif',
  motif: 'primaryMotif',
  period: 'culturalPeriod',
  registration: 'primaryRegistrationNumber',
  regno: 'primaryRegistrationNumber',
  site: 'siteGeographicLocation',
  object: 'objectType',
} as const;

const RESERVED_QUERY_KEYS = new Set([
  'q',
  'published',
  'page',
  'limit',
  'filters',
  'bbox',
  'format',
]);

export type NormalizedRecord = DbRecord & {
  metadata: CatalogMetadata;
  registrationNumber: string | null;
};

export function parseMetadataFiltersFromQuery(query: ParsedQs = {}): Record<string, string> {
  const filters: Record<string, string> = {};

  const filtersParam = query.filters;
  if (filtersParam && typeof filtersParam === 'string') {
    try {
      const parsed = JSON.parse(filtersParam);
      if (parsed && typeof parsed === 'object') {
        Object.assign(filters, parsed);
      }
    } catch {
      // ignore invalid JSON
    }
  }

  for (const [key, value] of Object.entries(query)) {
    if (RESERVED_QUERY_KEYS.has(key) || value == null || value === '') continue;
    const metaKey = (METADATA_FILTER_ALIASES as Record<string, string>)[key] || key;
    if (ALL_METADATA_KEYS.includes(metaKey as CatalogMetadataKey) || (METADATA_FILTER_ALIASES as Record<string, string>)[key]) {
      filters[metaKey] = String(value);
    }
  }

  return filters;
}

export function normalizeRecordRow(record: DbRecord | null | undefined): NormalizedRecord | null {
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

export function findRecordByIdentifier(records: DbRecord[], identifier: string | number | null | undefined): DbRecord | null {
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

export function buildPublicRecord(record: DbRecord, req: Request): PublicRecord {
  const normalized = normalizeRecordRow(record)!;
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

export function buildRtiAssets(record: DbRecord, baseUrl: string): PublicRecordAssets {
  const assets: PublicRecordAssets = {
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

export function getBaseUrl(req: Request): string {
  const configured = getConfig().publicBaseUrl;
  if (configured) return configured;
  const proto = req.get('x-forwarded-proto') || req.protocol || 'http';
  const host = req.get('x-forwarded-host') || req.get('host') || 'localhost';
  return `${proto}://${host}`;
}

export function recordCitationKey(record: DbRecord): string {
  const meta = normalizeMetadata(record.metadata);
  const reg = meta.primaryRegistrationNumber || meta.rtiFileName;
  if (reg) return reg.replace(/[^a-zA-Z0-9_-]/g, '_');
  return `rti_record_${record.id}`;
}

export function recordCitationTitle(record: DbRecord): string {
  const meta = normalizeMetadata(record.metadata);
  const motif = meta.primaryMotif;
  const site = meta.siteGeographicLocation || meta.discoveryLocation;
  if (motif && site) return `${motif} — ${site}`;
  return record.name;
}

export function recordGps(record: DbRecord) {
  const meta = normalizeMetadata(record.metadata);
  return parseGpsPosition(meta.gpsPosition);
}
