export const UPLOAD_CHUNK_SIZE_BYTES = 8 * 1024 * 1024;
export const UPLOAD_MAX_CHUNK_SIZE_BYTES = 16 * 1024 * 1024;
export const UPLOAD_SESSION_TTL_MS = 24 * 60 * 60 * 1000;
export const UPLOAD_CHUNK_RETRIES = 3;

export const UPLOAD_FIELDS = ['file', 'latentMap', 'weights'] as const;
export type UploadFieldName = (typeof UPLOAD_FIELDS)[number];

export type UploadSessionStatus = 'receiving' | 'complete' | 'aborted';

export interface UploadSession {
  sessionId: string;
  field: UploadFieldName;
  originalName: string;
  sizeBytes: number;
  offset: number;
  status: UploadSessionStatus;
  chunkSize: number;
}

export interface CreateUploadSessionRequest {
  field: UploadFieldName;
  originalName: string;
  sizeBytes: number;
}

export interface CompleteUploadRequest {
  recordId?: number;
  name?: string;
  description?: string;
  direction?: string;
  recordTypeId?: number;
  uploadMode?: string;
  outputType?: string;
  quality?: number | string;
  tileSize?: number | string;
  format?: string;
  fileSessionId?: string;
  latentMapSessionId?: string;
  weightsSessionId?: string;
}

export interface UploadChunkRange {
  offset: number;
  length: number;
}

/** Sequential byte ranges for a file, last chunk may be shorter. */
export function chunkRanges(sizeBytes: number, chunkSize = UPLOAD_CHUNK_SIZE_BYTES): UploadChunkRange[] {
  const size = Math.max(0, Math.floor(sizeBytes));
  const step = Math.max(1, Math.floor(chunkSize));
  if (size === 0) return [];
  const ranges: UploadChunkRange[] = [];
  for (let offset = 0; offset < size; offset += step) {
    ranges.push({ offset, length: Math.min(step, size - offset) });
  }
  return ranges;
}
