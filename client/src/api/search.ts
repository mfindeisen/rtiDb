import type { SearchResults, ImageSearchCachedResponse, ImageSearchJobResponse } from '@rtidb/shared/api/search';
import { apiUrl, request } from './client';

export async function searchRecords(params: Record<string, string>): Promise<SearchResults> {
  const query = new URLSearchParams(params).toString();
  return request<SearchResults>(`/api/search?${query}`);
}

export function bulkExportUrl(params: Record<string, string>): string {
  const query = new URLSearchParams(params).toString();
  return apiUrl(`/api/export/records?${query}`);
}

export async function searchByImage(
  file: File,
  limit = 12,
  force = false,
): Promise<ImageSearchCachedResponse | ImageSearchJobResponse> {
  const formData = new FormData();
  formData.append('image', file);
  const query = new URLSearchParams({
    limit: String(limit),
    ...(force ? { force: '1' } : {}),
  });

  const res = await fetch(apiUrl(`/api/search/image?${query}`), {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json() as Promise<ImageSearchCachedResponse | ImageSearchJobResponse>;
}

export async function getImageSearchJob(jobId: string): Promise<ImageSearchJobResponse> {
  return request<ImageSearchJobResponse>(`/api/search/image/jobs/${jobId}`);
}
