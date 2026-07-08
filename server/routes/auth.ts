import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import type { Express } from 'express';
import { verifyPassword, parsePermissions } from '../lib/auth/password.js';
import { AUTH_TOKEN_COOKIE } from '../middleware/auth.js';
import type { ServerContext } from '../types/index.js';

const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000;

function setSessionCookie(res: import('express').Response, token: string, secure: boolean) {
  res.cookie(AUTH_TOKEN_COOKIE, token, {
    maxAge: SESSION_MAX_AGE_MS,
    sameSite: 'lax',
    path: '/',
    secure,
    httpOnly: true,
  });
}

function clearSessionCookie(res: import('express').Response, secure: boolean) {
  res.clearCookie(AUTH_TOKEN_COOKIE, {
    sameSite: 'lax',
    path: '/',
    secure,
    httpOnly: true,
  });
}

function issueSessionFromToken(
  req: import('express').Request,
  res: import('express').Response,
  jwtSecret: string,
  secure: boolean,
): boolean {
  const authHeader = req.headers.authorization;
  const bodyToken = typeof req.body?.token === 'string' ? req.body.token : null;
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7)
    : bodyToken;
  if (!token) return false;

  try {
    jwt.verify(token, jwtSecret);
  } catch {
    return false;
  }

  setSessionCookie(res, token, secure);
  return true;
}

export function registerAuthRoutes(
  app: Express,
  { db, schema, config, verifyAuthHandler }: Pick<ServerContext, 'db' | 'schema' | 'config' | 'verifyAuthHandler'>,
) {
  app.get('/api/auth/verify', verifyAuthHandler);

  app.post('/api/auth/sync-session', (req, res) => {
    if (!issueSessionFromToken(req, res, config.jwtSecret, config.isProduction)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return res.json({ success: true });
  });

  app.post('/api/logout', (_req, res) => {
    clearSessionCookie(res, config.isProduction);
    res.json({ success: true });
  });

  app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    try {
      const user = db.select().from(schema.users).where(eq(schema.users.username, username)).get();
      if (user && verifyPassword(password, user.passwordHash)) {
        const permissions = parsePermissions(user.permissions);
        const token = jwt.sign(
          { id: user.id, username: user.username, role: user.role, permissions },
          config.jwtSecret,
          { expiresIn: '24h' },
        );
        setSessionCookie(res, token, config.isProduction);
        res.json({ success: true, token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Server database error' });
    }
  });
}
