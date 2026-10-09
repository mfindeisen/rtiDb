import type { NextFunction, Request, Response } from 'express';
import type { JwtUser } from '../types/index.js';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

/** Mutating routes that remain allowed in demo / read-only mode. */
const SAFE_MUTATION_PATHS = new Set([
  '/api/login',
  '/api/logout',
  '/api/auth/sync-session',
  '/api/search/image',
]);

export function normalizeApiPath(urlPath: string): string {
  const pathOnly = urlPath.split('?')[0] || '/';
  if (pathOnly.length > 1 && pathOnly.endsWith('/')) {
    return pathOnly.slice(0, -1);
  }
  return pathOnly;
}

export function isDemoMutationAllowed(method: string, urlPath: string): boolean {
  const upper = method.toUpperCase();
  if (SAFE_METHODS.has(upper)) return true;
  if (upper !== 'POST' && upper !== 'PUT' && upper !== 'PATCH' && upper !== 'DELETE') {
    return false;
  }
  return SAFE_MUTATION_PATHS.has(normalizeApiPath(urlPath));
}

/** Present every signed-in user as a permission-less researcher so the UI stays read-only. */
export function applyDemoSessionUser(user: JwtUser): JwtUser {
  return {
    id: user.id,
    username: user.username,
    role: 'researcher',
    permissions: [],
  };
}

export function createDemoReadOnlyMiddleware(enabled: boolean) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!enabled) return next();
    const path = normalizeApiPath(req.path || req.url || '/');
    if (isDemoMutationAllowed(req.method, path)) return next();
    return res.status(403).json({
      error: 'This demo instance is read-only. Uploads and edits are disabled.',
      demoMode: true,
    });
  };
}
