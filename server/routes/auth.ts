import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import type { Express, Request, Response } from 'express';
import { verifyPassword, parsePermissions } from '../lib/auth/password.js';
import { AUTH_TOKEN_COOKIE } from '../middleware/auth.js';
import {
  consumeRateLimit,
  getLoginRateLimit,
  loginRateLimitKey,
  peekRateLimit,
} from '../lib/rateLimit.js';
import type { ServerContext } from '../types/index.js';
import type { JwtUser } from '../types/index.js';

const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000;

export function sessionCookieSecure(
  req: Pick<Request, 'secure'>,
  config: { isProduction: boolean; trustProxy: boolean | number },
): boolean {
  if (!config.isProduction) return false;
  if (config.trustProxy === false) return true;
  return req.secure;
}

function setSessionCookie(res: Response, token: string, secure: boolean) {
  res.cookie(AUTH_TOKEN_COOKIE, token, {
    maxAge: SESSION_MAX_AGE_MS,
    sameSite: 'lax',
    path: '/',
    secure,
    httpOnly: true,
  });
}

function clearSessionCookie(res: Response, secure: boolean) {
  res.clearCookie(AUTH_TOKEN_COOKIE, {
    sameSite: 'lax',
    path: '/',
    secure,
    httpOnly: true,
  });
}

function sendRateLimited(res: Response, retryAfterMs: number) {
  const retryAfterSeconds = Math.max(1, Math.ceil(retryAfterMs / 1000));
  res.setHeader('Retry-After', String(retryAfterSeconds));
  return res.status(429).json({
    error: 'Too many login attempts. Try again later.',
    retryAfterSeconds,
  });
}

function issueSessionFromUser(
  res: Response,
  user: { id: number; username: string; role: string; permissions: unknown },
  jwtSecret: string,
  secure: boolean,
) {
  const permissions = parsePermissions(user.permissions);
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role, permissions },
    jwtSecret,
    { expiresIn: '24h' },
  );
  setSessionCookie(res, token, secure);
  return { id: user.id, username: user.username, role: user.role, permissions };
}

function issueSessionFromToken(
  req: Request,
  res: Response,
  db: ServerContext['db'],
  schema: ServerContext['schema'],
  jwtSecret: string,
  secure: boolean,
): boolean {
  const authHeader = req.headers.authorization;
  const bodyToken = typeof req.body?.token === 'string' ? req.body.token : null;
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7)
    : bodyToken;
  if (!token) return false;

  let payload: JwtUser;
  try {
    payload = jwt.verify(token, jwtSecret) as JwtUser;
  } catch {
    return false;
  }

  const user = db.select().from(schema.users).where(eq(schema.users.id, payload.id)).get();
  if (!user) return false;

  issueSessionFromUser(res, user, jwtSecret, secure);
  return true;
}

export function registerAuthRoutes(
  app: Express,
  {
    db,
    schema,
    config,
    verifyAuthHandler,
    authMiddleware,
  }: Pick<ServerContext, 'db' | 'schema' | 'config' | 'verifyAuthHandler' | 'authMiddleware'>,
) {
  app.get('/api/auth/verify', verifyAuthHandler);

  app.get('/api/auth/me', authMiddleware, (req, res) => {
    res.json({ user: req.user! });
  });

  app.post('/api/auth/sync-session', (req, res) => {
    const secure = sessionCookieSecure(req, config);
    if (!issueSessionFromToken(req, res, db, schema, config.jwtSecret, secure)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return res.json({ success: true });
  });

  app.post('/api/logout', (req, res) => {
    clearSessionCookie(res, sessionCookieSecure(req, config));
    res.json({ success: true });
  });

  app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const rateKey = loginRateLimitKey(req);
    const rateOpts = getLoginRateLimit();
    const preview = peekRateLimit(rateKey, rateOpts);
    if (!preview.allowed) {
      return sendRateLimited(res, preview.retryAfterMs);
    }

    try {
      const user = db.select().from(schema.users).where(eq(schema.users.username, username)).get();
      if (user && verifyPassword(password, user.passwordHash)) {
        const publicUser = issueSessionFromUser(
          res,
          user,
          config.jwtSecret,
          sessionCookieSecure(req, config),
        );
        res.json({
          success: true,
          user: publicUser,
        });
      } else {
        consumeRateLimit(rateKey, rateOpts);
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Server database error' });
    }
  });
}
