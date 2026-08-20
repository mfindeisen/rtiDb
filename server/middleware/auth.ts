import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import type { NextFunction, Request, Response } from 'express';
import { PERMISSIONS, type Permission, type UserRole } from '@rtidb/shared/permissions';
import { userCanManageRecords } from '@rtidb/shared/authorization';
import { parsePermissions } from '../lib/auth/password.js';
import type { AuthContext, AppDb, AppSchema, JwtUser } from '../types/index.js';

const TOKEN_COOKIE = 'adminToken';
const USER_ROLES = new Set<string>(['admin', 'editor', 'researcher']);
const PERMISSION_SET = new Set<string>(PERMISSIONS);

function parseCookies(header?: string): Record<string, string> {
  if (!header) return {};
  const cookies: Record<string, string> = {};
  for (const part of header.split(';')) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const separator = trimmed.indexOf('=');
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator);
    const value = trimmed.slice(separator + 1);
    cookies[key] = decodeURIComponent(value);
  }
  return cookies;
}

function extractToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  return parseCookies(req.headers.cookie)[TOKEN_COOKIE] ?? null;
}

function tokenUserId(token: string, jwtSecret: string): number | null {
  try {
    const payload = jwt.verify(token, jwtSecret) as { id?: unknown };
    const id = Number(payload.id);
    if (!Number.isInteger(id) || id <= 0) return null;
    return id;
  } catch {
    return null;
  }
}

function jwtUserFromRow(row: {
  id: number;
  username: string;
  role: string;
  permissions: unknown;
}): JwtUser | null {
  if (!USER_ROLES.has(row.role)) return null;
  const permissions = parsePermissions(row.permissions)
    .filter((permission): permission is Permission => PERMISSION_SET.has(permission));
  return {
    id: row.id,
    username: row.username,
    role: row.role as UserRole,
    permissions,
  };
}

/** JWT proves identity; role and permissions always come from SQLite. */
export function hydrateRequestUser(
  token: string,
  jwtSecret: string,
  db: AppDb,
  schema: AppSchema,
): JwtUser | null {
  const userId = tokenUserId(token, jwtSecret);
  if (userId == null) return null;
  const row = db.select().from(schema.users).where(eq(schema.users.id, userId)).get();
  if (!row) return null;
  return jwtUserFromRow(row);
}

function wantsHtml(req: Request): boolean {
  const accept = req.headers.accept ?? '';
  return accept.includes('text/html') || accept.includes('*/*');
}

function redirectToLogin(req: Request, res: Response) {
  const redirect = encodeURIComponent(req.originalUrl);
  res.redirect(302, `/login?redirect=${redirect}`);
}

export function createAuthMiddleware(JWT_SECRET: string, db: AppDb, schema: AppSchema): AuthContext {
  const resolveUser = (req: Request): JwtUser | null => {
    const token = extractToken(req);
    if (!token) return null;
    return hydrateRequestUser(token, JWT_SECRET, db, schema);
  };

  const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const user = hydrateRequestUser(token, JWT_SECRET, db, schema);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    req.user = user;
    next();
  };

  const optionalAuthMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    const user = resolveUser(req);
    if (user) req.user = user;
    next();
  };

  const sessionAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = extractToken(req);
    if (!token) {
      if (wantsHtml(req)) return redirectToLogin(req, res);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = hydrateRequestUser(token, JWT_SECRET, db, schema);
    if (!user) {
      if (wantsHtml(req)) return redirectToLogin(req, res);
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    req.user = user;
    next();
  };

  const verifyAuthHandler = (req: Request, res: Response) => {
    const token = extractToken(req);
    if (!token || !hydrateRequestUser(token, JWT_SECRET, db, schema)) {
      return res.status(401).end();
    }
    return res.status(204).end();
  };

  const requirePermission = (permission: Permission) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (req.user.role === 'admin') {
      return next();
    }
    if (req.user.permissions?.includes(permission)) {
      return next();
    }
    return res.status(403).json({ error: `Forbidden: Requires permission '${permission}'` });
  };

  const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role === 'admin') {
      return next();
    }
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  };

  const requireManageRecords = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (!userCanManageRecords(req.user)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    return next();
  };

  return {
    authMiddleware,
    optionalAuthMiddleware,
    sessionAuthMiddleware,
    verifyAuthHandler,
    requirePermission,
    requireAdmin,
    requireManageRecords,
  };
}

export const AUTH_TOKEN_COOKIE = TOKEN_COOKIE;
