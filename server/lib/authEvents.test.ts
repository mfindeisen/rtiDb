import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import path from 'path';
import { fileURLToPath } from 'url';
import { eq } from 'drizzle-orm';
import { describe, expect, it } from 'vitest';
import * as schema from '../schema.js';
import { hashPassword } from './auth/password.js';
import {
  AUTH_EVENT_RETENTION_DAYS,
  listAuthEvents,
  latestSuccessfulLogins,
  pruneAuthEvents,
  recordAuthEvent,
} from './authEvents.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createTestDb() {
  const sqlite = new Database(':memory:');
  sqlite.pragma('foreign_keys = ON');
  const db = drizzle(sqlite, { schema });
  migrate(db, { migrationsFolder: path.join(__dirname, '..', 'migrations') });
  const user = db.insert(schema.users).values({
    username: 'alice',
    passwordHash: hashPassword('secret'),
    role: 'editor',
    permissions: [],
  }).returning({ id: schema.users.id }).get();
  return { db, userId: user.id };
}

describe('auth events', () => {
  it('records login history and keeps the username after the user is deleted', () => {
    const { db, userId } = createTestDb();
    recordAuthEvent(db, schema, {
      event: 'login',
      userId,
      username: 'alice',
      ip: '127.0.0.1',
      createdAt: '2026-08-21T10:00:00.000Z',
    });
    recordAuthEvent(db, schema, {
      event: 'login_failed',
      username: 'nobody',
      ip: '10.0.0.2',
      createdAt: '2026-08-21T11:00:00.000Z',
    });

    const listed = listAuthEvents(db, schema, { event: 'login' });
    expect(listed.total).toBe(1);
    expect(listed.results[0]?.username).toBe('alice');
    expect(latestSuccessfulLogins(db, schema).get(userId)).toBe('2026-08-21T10:00:00.000Z');

    db.delete(schema.users).where(eq(schema.users.id, userId)).run();
    const afterDelete = listAuthEvents(db, schema);
    expect(afterDelete.results.some((row) => row.username === 'alice' && row.userId == null)).toBe(true);
  });

  it('filters by username and prunes events older than the retention window', () => {
    const { db, userId } = createTestDb();
    recordAuthEvent(db, schema, {
      event: 'login',
      userId,
      username: 'alice',
      createdAt: '2026-08-21T10:00:00.000Z',
    });
    const old = new Date(Date.now() - (AUTH_EVENT_RETENTION_DAYS + 2) * 24 * 60 * 60 * 1000).toISOString();
    db.insert(schema.authEvents).values({
      createdAt: old,
      event: 'login_failed',
      userId: null,
      username: 'stale',
      ip: null,
      userAgent: null,
    }).run();

    expect(listAuthEvents(db, schema, { username: 'ALI' }).results.map((r) => r.username)).toEqual(['alice']);
    expect(pruneAuthEvents(db, schema)).toBe(1);
    expect(listAuthEvents(db, schema).total).toBe(1);
  });
});
