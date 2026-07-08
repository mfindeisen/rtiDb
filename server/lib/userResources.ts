import { eq, sql } from 'drizzle-orm';
import type { AppDb, AppSchema } from '../types/index.js';
import { hashPassword, parsePermissions } from './auth/password.js';
import { sendError } from './httpErrors.js';
import { RESEARCHER_DEFAULT_PERMISSIONS } from '@rtidb/shared/authorization';
import type { Permission } from '@rtidb/shared/permissions';

export function listAllRecords(db: AppDb, schema: AppSchema) {
  return db.select().from(schema.records).orderBy(sql`${schema.records.id} DESC`).all();
}

export function parseResourceId(raw: string | string[] | undefined): number | null {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export interface UserWriteInput {
  username: string;
  password?: string;
  role: string;
  permissions?: Permission[];
}

export function createUser(db: AppDb, schema: AppSchema, input: UserWriteInput) {
  const permissions = input.role === 'researcher'
    ? RESEARCHER_DEFAULT_PERMISSIONS
    : (input.permissions || []);

  return db.insert(schema.users).values({
    username: input.username,
    passwordHash: hashPassword(input.password || ''),
    role: input.role,
    permissions,
  }).returning({ id: schema.users.id }).get();
}

export function mapPublicUsers(
  users: Array<{ id: number; username: string; role: string; permissions: unknown }>,
) {
  return users.map((u) => ({
    ...u,
    permissions: parsePermissions(u.permissions),
  }));
}

export function usernameTaken(
  db: AppDb,
  schema: AppSchema,
  username: string,
  excludeId?: number,
): boolean {
  const existing = db.select({ id: schema.users.id })
    .from(schema.users)
    .where(excludeId
      ? sql`${schema.users.username} = ${username} AND ${schema.users.id} != ${excludeId}`
      : eq(schema.users.username, username))
    .get();
  return !!existing;
}

export function sendDatabaseError(res: import('express').Response, err: unknown, context: string): void {
  console.error(`${context}:`, err);
  sendError(res, 500, 'Database error');
}
