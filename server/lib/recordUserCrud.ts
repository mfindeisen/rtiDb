import { eq, and } from 'drizzle-orm';
import type { Response } from 'express';
import { formatCatalogDateTime } from './metadataFields.js';
import type { AppDb, AppSchema } from '../types/index.js';

export function catalogNow(): string {
  return formatCatalogDateTime(new Date().toISOString());
}

export function respondResourceError(res: Response, err: unknown, action: string): void {
  console.error(`${action}:`, err);
  res.status(500).json({ error: `Failed to ${action}` });
}

export function findUserOwnedNote(
  db: AppDb,
  schema: AppSchema,
  noteId: number,
  recordId: number,
  userId: number,
) {
  return db.select({ id: schema.recordNotes.id })
    .from(schema.recordNotes)
    .where(and(
      eq(schema.recordNotes.id, noteId),
      eq(schema.recordNotes.recordId, recordId),
      eq(schema.recordNotes.userId, userId),
    ))
    .get();
}

export function findUserOwnedAnnotation(
  db: AppDb,
  schema: AppSchema,
  annotationId: number,
  recordId: number,
  userId: number,
) {
  return db.select({ id: schema.recordAnnotations.id })
    .from(schema.recordAnnotations)
    .where(and(
      eq(schema.recordAnnotations.id, annotationId),
      eq(schema.recordAnnotations.recordId, recordId),
      eq(schema.recordAnnotations.userId, userId),
    ))
    .get();
}
