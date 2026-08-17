import type { Permission } from '@rtidb/shared/permissions';
import {
  hasPermission as sharedHasPermission,
  canAccessAdmin as sharedCanAccessAdmin,
  userCanCollaborate as sharedCanCollaborate,
  userCanAnnotate as sharedCanAnnotate,
  userCanComment as sharedCanComment,
} from '@rtidb/shared/authorization';
import type { JwtUser } from '@rtidb/shared/auth';
import { apiUrl } from '@/api/client';

const LEGACY_TOKEN_KEY = 'adminToken';

let currentUser: JwtUser | null = null;
let authInitPromise: Promise<void> | null = null;

function clearLegacyToken(): void {
  try {
    localStorage.removeItem(LEGACY_TOKEN_KEY);
  } catch {
    // ignore storage failures
  }
}

export function getCurrentUser(): JwtUser | null {
  return currentUser;
}

/** @deprecated Use getCurrentUser() */
export function parseTokenPayload(): JwtUser | null {
  return getCurrentUser();
}

export function setCurrentUser(user: JwtUser | null): void {
  currentUser = user;
}

async function fetchCurrentUser(): Promise<JwtUser | null> {
  let lastNetworkError = false;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(apiUrl('/api/auth/me'), { credentials: 'include' });
      if (res.status === 401 || res.status === 403) return null;
      if (!res.ok) {
        lastNetworkError = true;
        continue;
      }
      const data = (await res.json()) as { user: JwtUser };
      return data.user;
    } catch {
      lastNetworkError = true;
    }
  }
  if (lastNetworkError) {
    console.warn('Could not reach /api/auth/me; leaving session unchanged');
    return currentUser;
  }
  return null;
}

export function initAuth(): Promise<void> {
  if (!authInitPromise) {
    authInitPromise = (async () => {
      clearLegacyToken();
      currentUser = await fetchCurrentUser();
    })();
  }
  return authInitPromise;
}

export function waitForAuth(): Promise<void> {
  return authInitPromise ?? Promise.resolve();
}

export function isAuthenticated(): boolean {
  return currentUser !== null;
}

export async function logout(): Promise<void> {
  currentUser = null;
  clearLegacyToken();
  try {
    await fetch(apiUrl('/api/logout'), { method: 'POST', credentials: 'include' });
  } catch {
    // Local session is already cleared; ignore network failures.
  }
}

export function hasPermission(permission: Permission): boolean {
  return sharedHasPermission(currentUser, permission);
}

export function canAccessAdmin(): boolean {
  return sharedCanAccessAdmin(currentUser);
}

export function canCollaborate(): boolean {
  return sharedCanCollaborate(currentUser);
}

export function canAnnotate(): boolean {
  return sharedCanAnnotate(currentUser);
}

export function canComment(): boolean {
  return sharedCanComment(currentUser);
}

export function currentUserId(): number | null {
  return currentUser?.id ?? null;
}

export function isResearcherRole(): boolean {
  return currentUser?.role === 'researcher';
}

/** Default landing route after login (optional redirect from query). */
export function postLoginPath(redirect: unknown): string {
  if (!currentUser) return '/login';

  const safeRedirect = typeof redirect === 'string' && redirect.startsWith('/') && redirect !== '/login'
    ? redirect
    : null;
  if (safeRedirect) return safeRedirect;

  if (currentUser.role === 'researcher') return '/';
  if (canAccessAdmin()) return '/admin';
  return '/';
}
