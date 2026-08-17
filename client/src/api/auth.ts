import type { LoginResponse } from '@rtidb/shared/api/auth';
import { ApiError, apiUrl } from './client';
import { setCurrentUser } from '@/composables/useAuth';

export async function login(username: string, password: string): Promise<LoginResponse> {
  const res = await fetch(apiUrl('/api/login'), {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new ApiError(res.status, await res.text());
  }

  const data = (await res.json()) as LoginResponse;
  setCurrentUser(data.user);
  return data;
}
