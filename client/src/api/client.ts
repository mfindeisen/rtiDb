import { authHeaders, logout } from '@/composables/useAuth';
import { handleUnauthorized } from '@/lib/apiError';

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly body: string,
  ) {
    super(body || `Request failed with status ${status}`);
    this.name = 'ApiError';
  }
}

const baseUrl = import.meta.env.VITE_API_URL || '';

export function apiUrl(path: string): string {
  return `${baseUrl}${path}`;
}

export { authHeaders } from '@/composables/useAuth';

export async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { authHeaders } = await import('@/composables/useAuth');
  const headers = new Headers(init.headers);
  for (const [key, value] of Object.entries(authHeaders())) {
    headers.set(key, value);
  }
  if (init.body && !(init.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(apiUrl(path), { ...init, headers });
  if (!res.ok) {
    if (handleUnauthorized(res.status)) {
      throw new ApiError(res.status, '{"error":"Unauthorized"}');
    }
    throw new ApiError(res.status, await res.text());
  }

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return res.json() as Promise<T>;
  }

  return undefined as T;
}

export async function requestVoid(path: string, init: RequestInit = {}): Promise<void> {
  await request<unknown>(path, init);
}
