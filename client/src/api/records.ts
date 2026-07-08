import type {
  CreateRecordResponse,
  RecordDetail,
  RecordRow,
  SuccessResponse,
  UpdateMetadataResponse,
} from '@rtidb/shared/api/records';
import type { AutoAnnotateJob } from '@rtidb/shared/api/jobs';
import type { CatalogMetadata } from '@rtidb/shared';
import { ApiError, apiUrl, authHeaders, request } from './client';

export async function listRecords(params?: Record<string, string>): Promise<RecordRow[]> {
  const query = params ? `?${new URLSearchParams(params)}` : '';
  return request<RecordRow[]>(`/api/records${query}`);
}

export async function getRecord(id: number | string): Promise<RecordDetail> {
  return request<RecordDetail>(`/api/records/${id}`);
}

export async function createRecord(payload: {
  name: string;
  description?: string;
  direction?: string;
  metadata?: Partial<CatalogMetadata>;
}): Promise<CreateRecordResponse> {
  return request<CreateRecordResponse>('/api/records', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateRecord(
  id: number,
  payload: Record<string, unknown>,
): Promise<UpdateMetadataResponse> {
  return request<UpdateMetadataResponse>(`/api/records/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteRecord(id: number): Promise<SuccessResponse> {
  return request<SuccessResponse>(`/api/records/${id}`, { method: 'DELETE' });
}

export async function publishRecord(id: number, publish: boolean): Promise<SuccessResponse> {
  return request<SuccessResponse>(`/api/records/${id}/publish`, {
    method: 'PUT',
    body: JSON.stringify({ is_published: publish }),
  });
}

export async function rerunProcessing(id: number): Promise<SuccessResponse> {
  return request<SuccessResponse>(`/api/records/${id}/rerun`, { method: 'POST' });
}

export async function updateMetadata(
  id: number,
  metadata: Partial<CatalogMetadata>,
): Promise<UpdateMetadataResponse> {
  return request<UpdateMetadataResponse>(`/api/records/${id}/metadata`, {
    method: 'PATCH',
    body: JSON.stringify({ metadata }),
  });
}

export async function startAutoAnnotate(id: number, replace = false): Promise<AutoAnnotateJob> {
  return request<AutoAnnotateJob>(`/api/records/${id}/auto-annotate`, {
    method: 'POST',
    body: JSON.stringify({ replace }),
  });
}

export async function getAutoAnnotateJob(recordId: number, jobId: string): Promise<AutoAnnotateJob> {
  return request<AutoAnnotateJob>(`/api/records/${recordId}/auto-annotate/jobs/${jobId}`);
}

export function exportRecordUrl(id: number | string, format: string): string {
  return apiUrl(`/api/records/${id}/export?format=${encodeURIComponent(format)}`);
}

export function uploadWithProgress(
  url: string,
  formData: FormData,
  onProgress: (percent: number) => void,
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', apiUrl(url));
    for (const [key, value] of Object.entries(authHeaders())) {
      xhr.setRequestHeader(key, value);
    }
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch {
          resolve(xhr.responseText);
        }
      } else {
        reject(new ApiError(xhr.status, xhr.responseText || `Upload failed (${xhr.status})`));
      }
    };
    xhr.onerror = () => reject(new Error('Upload failed'));
    xhr.send(formData);
  });
}

export async function uploadNewRecord(
  formData: FormData,
  onProgress: (percent: number) => void,
): Promise<unknown> {
  return uploadWithProgress('/api/upload', formData, onProgress);
}

export async function uploadToRecord(
  id: number,
  formData: FormData,
  onProgress: (percent: number) => void,
): Promise<unknown> {
  return uploadWithProgress(`/api/records/${id}/upload`, formData, onProgress);
}
