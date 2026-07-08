import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import type * as schema from '../schema.js';

export type AppSchema = typeof schema;
export type AppDb = BetterSQLite3Database<AppSchema>;

export type DbRecord = InferSelectModel<typeof schema.records>;
export type DbRecordInsert = InferInsertModel<typeof schema.records>;
export type DbUser = InferSelectModel<typeof schema.users>;
export type DbUserInsert = InferInsertModel<typeof schema.users>;
export type DbRecordNote = InferSelectModel<typeof schema.recordNotes>;
export type DbRecordRevision = InferSelectModel<typeof schema.recordRevisions>;
export type DbRecordAnnotation = InferSelectModel<typeof schema.recordAnnotations>;
export type DbImageSearchCache = InferSelectModel<typeof schema.imageSearchCache>;

/** Catalog metadata JSON stored on records.metadata */
export type RecordMetadata = Record<string, unknown>;
