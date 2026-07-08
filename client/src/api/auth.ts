import type { LoginResponse } from '@rtidb/shared/api/auth';
import { request } from './client';
import { setToken } from '@/composables/useAuth';

export async function login(username: string, password: string): Promise<LoginResponse> {
  const data = await request<LoginResponse>('/api/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  setToken(data.token);
  return data;
}
