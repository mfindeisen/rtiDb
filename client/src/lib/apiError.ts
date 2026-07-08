import type { ApiError } from '@/api/client';
import { logout } from '@/composables/useAuth';

export interface ApiErrorBody {
  error?: string;
}

export function parseApiErrorBody(err: unknown): string {
  if (!(err instanceof Error)) {
    return 'Request failed';
  }
  if (!('body' in err) || typeof (err as ApiError).body !== 'string') {
    return err.message || 'Request failed';
  }
  try {
    const parsed = JSON.parse((err as ApiError).body) as ApiErrorBody;
    return parsed.error || (err as ApiError).body || err.message;
  } catch {
    return (err as ApiError).body || err.message;
  }
}

export function handleUnauthorized(status: number): boolean {
  if (status === 401) {
    logout();
    window.location.href = '/login';
    return true;
  }
  return false;
}
