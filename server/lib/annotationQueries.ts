import { and, eq, inArray, or, sql } from 'drizzle-orm';
import { userCanAnnotate, userCanViewRecord } from '@rtidb/shared/authorization';
import type { JwtUser } from '@rtidb/shared/auth';
import type { AppDb, AppSchema, DbRecord } from '../types/index.js';

export function canListRecordAnnotations(user: JwtUser | undefined, record: DbRecord): boolean {
  return userCanViewRecord(user, record);
}

export function listRecordAnnotations(db: AppDb, schema: AppSchema, record: DbRecord, user?: JwtUser) {
  const whereClause = user && userCanAnnotate(user)
    ? and(
      eq(schema.recordAnnotations.recordId, record.id),
      or(
        eq(schema.recordAnnotations.userId, user.id),
        inArray(schema.recordAnnotations.visibility, ['team', 'published']),
      ),
    )
    : and(
      eq(schema.recordAnnotations.recordId, record.id),
      eq(schema.recordAnnotations.visibility, 'published'),
    );

  return db.select({
    id: schema.recordAnnotations.id,
    type: schema.recordAnnotations.type,
    geometry: schema.recordAnnotations.geometry,
    label: schema.recordAnnotations.label,
    color: schema.recordAnnotations.color,
    rtiView: schema.recordAnnotations.rtiView,
    source: schema.recordAnnotations.source,
    visibility: schema.recordAnnotations.visibility,
    userId: schema.recordAnnotations.userId,
    username: schema.users.username,
    createdAt: schema.recordAnnotations.createdAt,
    updatedAt: schema.recordAnnotations.updatedAt,
  })
    .from(schema.recordAnnotations)
    .innerJoin(schema.users, eq(schema.recordAnnotations.userId, schema.users.id))
    .where(whereClause)
    .orderBy(sql`${schema.recordAnnotations.createdAt} DESC`)
    .all();
}
