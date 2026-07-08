import type { CatalogMetadata } from '../metadataFields.js';
import type { RecordRow } from './records.js';

export type Bbox = [number, number, number, number];

export interface EnrichedRecord extends RecordRow {
  lat: number | null;
  lng: number | null;
}

export interface SearchResults {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  results: EnrichedRecord[];
}

export interface ImageSearchMatch extends RecordRow {
  similarity: number;
}

export interface ImageSearchCachedResponse {
  cached: true;
  status: 'done';
  contentHash: string;
  total: number;
  catalogCount: number;
  results: ImageSearchMatch[];
}

export interface ImageSearchJobResponse {
  jobId: string;
  status: 'queued' | 'processing' | 'done' | 'error';
  phase: string | null;
  position: number;
  total: number;
  results: ImageSearchMatch[] | null;
  error: string | null;
  cached: boolean;
  contentHash?: string;
  createdAt: number;
  startedAt: number | null;
  finishedAt: number | null;
}
