import type { Permission } from '@rtidb/shared/permissions';
import {
  hasPermission as sharedHasPermission,
  canAccessAdmin as sharedCanAccessAdmin,
  userCanCollaborate as sharedCanCollaborate,
  userCanAnnotate as sharedCanAnnotate,
  userCanComment as sharedCanComment,
} from '@rtidb/shared/authorization';
import type { JwtUser } from '@rtidb/shared/auth';

const TOKEN_KEY = 'adminToken';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export async function syncSessionCookie(): Promise<void> {
  const token = getToken();
  if (!token) return;
  try {
    await fetch('/api/auth/sync-session', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
  } catch {
    // ignore sync failures; API calls still use Authorization header
  }
}

export function parseTokenPayload(): JwtUser | null {
  const token = getToken();
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split('.')[1]!)) as JwtUser;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!parseTokenPayload();
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  void fetch('/api/logout', { method: 'POST', credentials: 'include' }).catch(() => {});
}

export function hasPermission(permission: Permission): boolean {
  return sharedHasPermission(parseTokenPayload(), permission);
}

export function canAccessAdmin(): boolean {
  return sharedCanAccessAdmin(parseTokenPayload());
}

export function canCollaborate(): boolean {
  return sharedCanCollaborate(parseTokenPayload());
}

export function canAnnotate(): boolean {
  return sharedCanAnnotate(parseTokenPayload());
}

export function canComment(): boolean {
  return sharedCanComment(parseTokenPayload());
}

export function currentUserId(): number | null {
  return parseTokenPayload()?.id ?? null;
}

export function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function isResearcherRole(): boolean {
  const payload = parseTokenPayload();
  return payload?.role === 'researcher';
}

/** Default landing route after login (optional redirect from query). */
export function postLoginPath(redirect: unknown): string {
  const payload = parseTokenPayload();
  if (!payload) return '/login';

  const safeRedirect = typeof redirect === 'string' && redirect.startsWith('/') && redirect !== '/login'
    ? redirect
    : null;
  if (safeRedirect) return safeRedirect;

  if (payload.role === 'researcher') return '/';
  if (canAccessAdmin()) return '/admin';
  return '/';
}
