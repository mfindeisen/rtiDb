import type { AuthEventListResponse, AuthEventType } from '@rtidb/shared/api/authEvents';
import { request } from './client';

export async function listAuthEvents(params: {
  page?: number;
  limit?: number;
  event?: AuthEventType | '';
  username?: string;
}): Promise<AuthEventListResponse> {
  const query = new URLSearchParams();
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.event) query.set('event', params.event);
  if (params.username?.trim()) query.set('username', params.username.trim());
  const suffix = query.toString();
  return request<AuthEventListResponse>(`/api/auth/events${suffix ? `?${suffix}` : ''}`);
}
