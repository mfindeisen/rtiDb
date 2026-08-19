import type { CatalogView, RecordType, SiteConfig } from '@rtidb/shared/api/catalog';
import { request } from './client';

export async function getSiteConfig(): Promise<SiteConfig> {
  return request<SiteConfig>('/api/site-config');
}

export async function updateSiteConfig(payload: Partial<SiteConfig>): Promise<SiteConfig> {
  return request<SiteConfig>('/api/site-config', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function resetSiteConfig(): Promise<SiteConfig> {
  return request<SiteConfig>('/api/site-config/reset', { method: 'POST' });
}

export async function uploadSiteAsset(kind: 'logo' | 'favicon', file: File): Promise<SiteConfig> {
  const body = new FormData();
  body.append('file', file);
  return request<SiteConfig>(`/api/site-config/${kind}`, { method: 'POST', body });
}

export async function listRecordTypes(): Promise<RecordType[]> {
  return request<RecordType[]>('/api/record-types');
}

export async function createRecordType(payload: Record<string, unknown>): Promise<RecordType> {
  return request<RecordType>('/api/admin/record-types', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateRecordType(id: number, payload: Record<string, unknown>): Promise<RecordType> {
  return request<RecordType>(`/api/admin/record-types/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteRecordType(id: number): Promise<void> {
  await request(`/api/admin/record-types/${id}`, { method: 'DELETE' });
}

export async function listCatalogViews(admin = false): Promise<CatalogView[]> {
  return request<CatalogView[]>(admin ? '/api/admin/views' : '/api/views');
}

export async function createCatalogView(payload: Record<string, unknown>): Promise<CatalogView> {
  return request<CatalogView>('/api/admin/views', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateCatalogView(id: number, payload: Record<string, unknown>): Promise<CatalogView> {
  return request<CatalogView>(`/api/admin/views/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteCatalogView(id: number): Promise<void> {
  await request(`/api/admin/views/${id}`, { method: 'DELETE' });
}
