import {
  UPLOAD_CHUNK_RETRIES,
  UPLOAD_CHUNK_SIZE_BYTES,
  type CompleteUploadRequest,
  type UploadFieldName,
  type UploadSession,
} from '@rtidb/shared';
import type { ProcessingEnqueueResponse } from '@rtidb/shared/api/jobs';
import { ApiError, apiUrl, request } from './client';

const SESSION_STORAGE_PREFIX = 'rti-upload-session:';

function sessionStorageKey(file: File, field: UploadFieldName): string {
  return `${SESSION_STORAGE_PREFIX}${field}:${file.name}:${file.size}:${file.lastModified}`;
}

function readStoredSessionId(file: File, field: UploadFieldName): string | null {
  try {
    return sessionStorage.getItem(sessionStorageKey(file, field));
  } catch {
    return null;
  }
}

function storeSessionId(file: File, field: UploadFieldName, sessionId: string): void {
  try {
    sessionStorage.setItem(sessionStorageKey(file, field), sessionId);
  } catch {
    // ignore quota / private mode
  }
}

function clearStoredSessionId(file: File, field: UploadFieldName): void {
  try {
    sessionStorage.removeItem(sessionStorageKey(file, field));
  } catch {
    // ignore
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function createUploadSession(file: File, field: UploadFieldName): Promise<UploadSession> {
  return request<UploadSession>('/api/uploads/sessions', {
    method: 'POST',
    body: JSON.stringify({
      field,
      originalName: file.name,
      sizeBytes: file.size,
    }),
  });
}

async function getUploadSession(sessionId: string): Promise<UploadSession> {
  return request<UploadSession>(`/api/uploads/sessions/${sessionId}`);
}

async function ensureUploadSession(file: File, field: UploadFieldName): Promise<UploadSession> {
  const storedId = readStoredSessionId(file, field);
  if (storedId) {
    try {
      const existing = await getUploadSession(storedId);
      if (existing.status === 'receiving' && existing.sizeBytes === file.size) {
        return existing;
      }
    } catch {
      clearStoredSessionId(file, field);
    }
  }
  const created = await createUploadSession(file, field);
  storeSessionId(file, field, created.sessionId);
  return created;
}

async function putChunk(sessionId: string, offset: number, blob: Blob): Promise<number> {
  let lastError: unknown;
  for (let attempt = 0; attempt < UPLOAD_CHUNK_RETRIES; attempt++) {
    try {
      const res = await fetch(apiUrl(`/api/uploads/sessions/${sessionId}`), {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/octet-stream',
          'X-Upload-Offset': String(offset),
        },
        body: blob,
      });
      const data = await res.json().catch(() => ({})) as { offset?: number; error?: string };
      if (res.status === 409 && typeof data.offset === 'number') {
        return data.offset;
      }
      if (!res.ok) {
        throw new ApiError(res.status, data.error || `Upload chunk failed (${res.status})`);
      }
      if (typeof data.offset !== 'number') {
        throw new Error('Upload session response missing offset');
      }
      return data.offset;
    } catch (err) {
      lastError = err;
      if (err instanceof ApiError && err.status >= 400 && err.status < 500 && err.status !== 409) {
        throw err;
      }
      if (attempt < UPLOAD_CHUNK_RETRIES - 1) {
        await sleep(400 * 2 ** attempt);
      }
    }
  }
  throw lastError instanceof Error ? lastError : new Error('Upload chunk failed');
}

async function uploadFileInChunks(
  file: File,
  field: UploadFieldName,
  onBytes: (bytes: number) => void,
): Promise<string> {
  let session = await ensureUploadSession(file, field);
  let offset = session.offset;
  onBytes(offset);

  while (offset < file.size) {
    const remaining = file.size - offset;
    const length = Math.min(UPLOAD_CHUNK_SIZE_BYTES, remaining);
    const blob = file.slice(offset, offset + length);
    const nextOffset = await putChunk(session.sessionId, offset, blob);
    if (nextOffset <= offset) {
      session = await getUploadSession(session.sessionId);
      if (session.offset <= offset) {
        throw new Error('Upload did not advance; try again');
      }
      offset = session.offset;
    } else {
      offset = nextOffset;
    }
    onBytes(offset);
  }

  return session.sessionId;
}

export interface ResumableUploadInput {
  recordId?: number;
  name?: string;
  description?: string;
  direction?: string;
  recordTypeId?: number;
  uploadMode: 'standard' | 'neural';
  outputType?: string;
  quality?: number;
  tileSize?: number;
  format?: string;
  file?: File | null;
  latentMap?: File | null;
  weights?: File | null;
}

export async function uploadRtiResumable(
  input: ResumableUploadInput,
  onProgress: (percent: number) => void,
): Promise<ProcessingEnqueueResponse> {
  const parts: Array<{ file: File; field: UploadFieldName }> = [];
  if (input.uploadMode === 'neural') {
    if (!input.latentMap || !input.weights) {
      throw new Error('Both latent map image and weights JSON files are required.');
    }
    parts.push({ file: input.latentMap, field: 'latentMap' }, { file: input.weights, field: 'weights' });
  } else {
    if (!input.file) {
      throw new Error('Please choose an RTI file.');
    }
    parts.push({ file: input.file, field: 'file' });
  }

  const totalBytes = parts.reduce((sum, part) => sum + part.file.size, 0);
  const received = new Map<UploadFieldName, number>();
  const report = () => {
    const loaded = [...received.values()].reduce((sum, n) => sum + n, 0);
    onProgress(totalBytes > 0 ? Math.min(100, Math.round((loaded / totalBytes) * 100)) : 100);
  };

  const sessionIds: Partial<Record<UploadFieldName, string>> = {};
  for (const part of parts) {
    sessionIds[part.field] = await uploadFileInChunks(part.file, part.field, (bytes) => {
      received.set(part.field, bytes);
      report();
    });
  }

  const body: CompleteUploadRequest = {
    recordId: input.recordId,
    name: input.name,
    description: input.description,
    direction: input.direction,
    recordTypeId: input.recordTypeId,
    uploadMode: input.uploadMode,
    outputType: input.outputType,
    quality: input.quality,
    tileSize: input.tileSize,
    format: input.format,
    fileSessionId: sessionIds.file,
    latentMapSessionId: sessionIds.latentMap,
    weightsSessionId: sessionIds.weights,
  };

  const result = await request<ProcessingEnqueueResponse>('/api/uploads/complete', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  for (const part of parts) {
    clearStoredSessionId(part.file, part.field);
  }
  return result;
}
