import jwt from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';
import type { AuthContext } from '../types/index.js';
import type { JwtUser } from '../types/index.js';
import type { Permission } from '../types/index.js';

const TOKEN_COOKIE = 'adminToken';

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

function verifyToken(token: string, jwtSecret: string): JwtUser | null {
  try {
    return jwt.verify(token, jwtSecret) as JwtUser;
  } catch {
    return null;
  }
}

function wantsHtml(req: Request): boolean {
  const accept = req.headers.accept ?? '';
  return accept.includes('text/html') || accept.includes('*/*');
}

function redirectToLogin(req: Request, res: Response) {
  const redirect = encodeURIComponent(req.originalUrl);
  res.redirect(302, `/login?redirect=${redirect}`);
}

export function createAuthMiddleware(JWT_SECRET: string): AuthContext {
  const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const user = verifyToken(token, JWT_SECRET);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    req.user = user;
    next();
  };

  const optionalAuthMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    const token = extractToken(req);
    if (token) {
      const user = verifyToken(token, JWT_SECRET);
      if (user) req.user = user;
    }
    next();
  };

  const sessionAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = extractToken(req);
    if (!token) {
      if (wantsHtml(req)) return redirectToLogin(req, res);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = verifyToken(token, JWT_SECRET);
    if (!user) {
      if (wantsHtml(req)) return redirectToLogin(req, res);
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    req.user = user;
    next();
  };

  const verifyAuthHandler = (req: Request, res: Response) => {
    const token = extractToken(req);
    if (!token || !verifyToken(token, JWT_SECRET)) {
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

  return {
    authMiddleware,
    optionalAuthMiddleware,
    sessionAuthMiddleware,
    verifyAuthHandler,
    requirePermission,
    requireAdmin,
  };
}

export const AUTH_TOKEN_COOKIE = TOKEN_COOKIE;
