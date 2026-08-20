import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import { describe, expect, it } from 'vitest';
import type { NextFunction, Request, Response } from 'express';
import * as schema from '../schema.js';
import { createAuthMiddleware } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const JWT_SECRET = 'test-secret';

function createTestDb() {
  const sqlite = new Database(':memory:');
  sqlite.pragma('foreign_keys = ON');
  const db = drizzle(sqlite, { schema });
  migrate(db, { migrationsFolder: path.join(__dirname, '..', 'migrations') });
  return db;
}

function insertUser(
  db: ReturnType<typeof createTestDb>,
  values: { username: string; role: string; permissions: string[] },
) {
  return db.insert(schema.users).values({
    username: values.username,
    passwordHash: 'unused',
    role: values.role,
    permissions: values.permissions,
  }).returning().get();
}

function tokenFor(userId: number, claims?: { username?: string; role?: string; permissions?: string[] }) {
  return jwt.sign({
    id: userId,
    username: claims?.username ?? 'stale',
    role: claims?.role ?? 'admin',
    permissions: claims?.permissions ?? ['manage_users'],
  }, JWT_SECRET, { expiresIn: '24h' });
}

function mockReq(token?: string): Request {
  return {
    headers: token ? { authorization: `Bearer ${token}` } : {},
    originalUrl: '/api/records',
  } as Request;
}

function mockRes() {
  const res = {
    statusCode: 200,
    body: undefined as unknown,
    ended: false,
    redirected: undefined as string | undefined,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(payload: unknown) {
      this.body = payload;
      return this;
    },
    end() {
      this.ended = true;
      return this;
    },
    redirect(code: number, url: string) {
      this.statusCode = code;
      this.redirected = url;
      return this;
    },
  };
  return res as typeof res & Response;
}

describe('createAuthMiddleware', () => {
  it('loads role and permissions from SQLite, not the JWT blob', () => {
    const db = createTestDb();
    const user = insertUser(db, {
      username: 'editor',
      role: 'researcher',
      permissions: ['annotate'],
    });
    const { authMiddleware } = createAuthMiddleware(JWT_SECRET, db, schema);
    const req = mockReq(tokenFor(user.id, { role: 'admin', permissions: ['manage_users'] }));
    const res = mockRes();
    let nextCalled = false;

    authMiddleware(req, res, (() => { nextCalled = true; }) as NextFunction);

    expect(nextCalled).toBe(true);
    expect(req.user).toEqual({
      id: user.id,
      username: 'editor',
      role: 'researcher',
      permissions: ['annotate'],
    });
  });

  it('rejects tokens for deleted users', () => {
    const db = createTestDb();
    const user = insertUser(db, { username: 'gone', role: 'admin', permissions: [] });
    const token = tokenFor(user.id);
    db.delete(schema.users).where(eq(schema.users.id, user.id)).run();

    const { authMiddleware } = createAuthMiddleware(JWT_SECRET, db, schema);
    const req = mockReq(token);
    const res = mockRes();
    let nextCalled = false;

    authMiddleware(req, res, (() => { nextCalled = true; }) as NextFunction);

    expect(nextCalled).toBe(false);
    expect(res.statusCode).toBe(401);
  });

  it('does not attach a deleted user on optional auth', () => {
    const db = createTestDb();
    const user = insertUser(db, { username: 'gone', role: 'editor', permissions: ['edit_record'] });
    const token = tokenFor(user.id);
    db.delete(schema.users).where(eq(schema.users.id, user.id)).run();

    const { optionalAuthMiddleware } = createAuthMiddleware(JWT_SECRET, db, schema);
    const req = mockReq(token);
    const res = mockRes();
    let nextCalled = false;

    optionalAuthMiddleware(req, res, (() => { nextCalled = true; }) as NextFunction);

    expect(nextCalled).toBe(true);
    expect(req.user).toBeUndefined();
  });
});
