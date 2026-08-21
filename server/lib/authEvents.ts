import { and, desc, eq, gte, lte, sql, type SQL } from 'drizzle-orm';
import type { AuthEventListResponse, AuthEventType } from '@rtidb/shared/api/authEvents';
import { AUTH_EVENT_TYPES } from '@rtidb/shared/api/authEvents';
import type { AppDb, AppSchema } from '../types/index.js';
import { parsePageLimit } from './recordList.js';

export const AUTH_EVENT_RETENTION_DAYS = 90;
const USERNAME_MAX = 128;
const USER_AGENT_MAX = 200;

export function isAuthEventType(value: unknown): value is AuthEventType {
  return typeof value === 'string' && (AUTH_EVENT_TYPES as readonly string[]).includes(value);
}

function clip(value: string | null | undefined, max: number): string {
  return (value ?? '').trim().slice(0, max);
}

export function authEventRequestMeta(req: {
  ip?: string;
  socket?: { remoteAddress?: string };
  get?: (name: string) => string | undefined;
  headers?: { 'user-agent'?: string };
}): { ip: string | null; userAgent: string | null } {
  const ip = req.ip || req.socket?.remoteAddress || '';
  const ua = req.get?.('user-agent') ?? req.headers?.['user-agent'] ?? '';
  return {
    ip: clip(ip, 64) || null,
    userAgent: clip(ua, USER_AGENT_MAX) || null,
  };
}

export function pruneAuthEvents(db: AppDb, schema: AppSchema, now = new Date()): number {
  const cutoff = new Date(now.getTime() - AUTH_EVENT_RETENTION_DAYS * 24 * 60 * 60 * 1000).toISOString();
  return db.delete(schema.authEvents).where(sql`${schema.authEvents.createdAt} < ${cutoff}`).run().changes;
}

export function recordAuthEvent(
  db: AppDb,
  schema: AppSchema,
  input: {
    event: AuthEventType;
    userId?: number | null;
    username?: string | null;
    ip?: string | null;
    userAgent?: string | null;
    createdAt?: string;
  },
): void {
  db.insert(schema.authEvents).values({
    createdAt: input.createdAt ?? new Date().toISOString(),
    event: input.event,
    userId: input.userId ?? null,
    username: clip(input.username, USERNAME_MAX),
    ip: clip(input.ip, 64) || null,
    userAgent: clip(input.userAgent, USER_AGENT_MAX) || null,
  }).run();
  pruneAuthEvents(db, schema);
}

export function recordAuthEventSafe(
  db: AppDb,
  schema: AppSchema,
  input: Parameters<typeof recordAuthEvent>[2],
): void {
  try {
    recordAuthEvent(db, schema, input);
  } catch (err) {
    console.error('Failed to record auth event:', err);
  }
}

export function listAuthEvents(
  db: AppDb,
  schema: AppSchema,
  options: {
    page?: number;
    limit?: number;
    event?: AuthEventType;
    username?: string;
    userId?: number;
    from?: string;
    to?: string;
  } = {},
): AuthEventListResponse {
  const { page, limit, offset } = parsePageLimit(options.page, options.limit);
  const clauses: SQL[] = [];
  if (options.event) clauses.push(eq(schema.authEvents.event, options.event));
  if (options.userId) clauses.push(eq(schema.authEvents.userId, options.userId));
  const username = options.username?.trim().toLowerCase().replace(/[%_]/g, '');
  if (username) {
    clauses.push(sql`lower(${schema.authEvents.username}) like ${`%${username}%`}`);
  }
  if (options.from) clauses.push(gte(schema.authEvents.createdAt, options.from));
  if (options.to) clauses.push(lte(schema.authEvents.createdAt, options.to));
  const where = clauses.length ? and(...clauses) : undefined;

  const totalRow = where
    ? db.select({ n: sql<number>`count(*)` }).from(schema.authEvents).where(where).get()
    : db.select({ n: sql<number>`count(*)` }).from(schema.authEvents).get();
  const total = Number(totalRow?.n ?? 0);

  const rows = (where
    ? db.select().from(schema.authEvents).where(where).orderBy(desc(schema.authEvents.id)).limit(limit).offset(offset).all()
    : db.select().from(schema.authEvents).orderBy(desc(schema.authEvents.id)).limit(limit).offset(offset).all());

  return {
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
    results: rows.map((row) => ({
      id: row.id,
      createdAt: row.createdAt,
      event: row.event,
      userId: row.userId,
      username: row.username,
      ip: row.ip,
      userAgent: row.userAgent,
    })),
  };
}

export function latestSuccessfulLogins(db: AppDb, schema: AppSchema): Map<number, string> {
  const rows = db.select({
    userId: schema.authEvents.userId,
    createdAt: sql<string>`max(${schema.authEvents.createdAt})`,
  }).from(schema.authEvents)
    .where(eq(schema.authEvents.event, 'login'))
    .groupBy(schema.authEvents.userId)
    .all();

  const map = new Map<number, string>();
  for (const row of rows) {
    if (row.userId != null && row.createdAt) map.set(row.userId, row.createdAt);
  }
  return map;
}
