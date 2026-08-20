import { sqliteTable, integer, text, primaryKey } from 'drizzle-orm/sqlite-core';
import type { ScaleCalibration } from '@rtidb/shared/scaleCalibration';

/** JSON metadata blob stored on records.metadata */
type RecordMetadataJson = Record<string, unknown>;

export const records = sqliteTable('records', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').unique(),
  name: text('name').notNull(),
  description: text('description').default(''),
  date: text('date').notNull(),
  status: text('status').notNull().default('processing'),
  progress: integer('progress').default(0),
  message: text('message'),
  direction: text('direction').default('ltr'),
  outputType: text('output_type').default('tiles'),
  folderUrl: text('folder_url'),
  tiffUrl: text('tiff_url'),
  thumbnailUrl: text('thumbnail_url'),
  imageEmbedding: text('image_embedding', { mode: 'json' }),
  isPublished: integer('is_published').default(0),
  originalFilePath: text('original_file_path'),
  weightsFilePath: text('weights_file_path'),
  quality: integer('quality'),
  tileSize: integer('tile_size'),
  format: text('format'),
  metadata: text('metadata', { mode: 'json' }).$type<RecordMetadataJson>().default({}),
  scaleCalibration: text('scale_calibration', { mode: 'json' }).$type<ScaleCalibration | null>(),
  recordTypeId: integer('record_type_id'),
});

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull().default('editor'),
  permissions: text('permissions', { mode: 'json' }).notNull().default('[]'),
});

export const recordNotes = sqliteTable('record_notes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  recordId: integer('record_id').notNull().references(() => records.id, { onDelete: 'cascade' }),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  body: text('body').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const recordRevisions = sqliteTable('record_revisions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  recordId: integer('record_id').notNull().references(() => records.id, { onDelete: 'cascade' }),
  revisionNumber: integer('revision_number').notNull(),
  action: text('action').notNull(),
  snapshot: text('snapshot', { mode: 'json' }).notNull(),
  changes: text('changes', { mode: 'json' }),
  comment: text('comment'),
  createdBy: integer('created_by'),
  createdByName: text('created_by_name'),
  createdAt: text('created_at').notNull(),
});

export const recordComments = sqliteTable('record_comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  recordId: integer('record_id').notNull().references(() => records.id, { onDelete: 'cascade' }),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  parentId: integer('parent_id'),
  body: text('body').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const recordAnnotations = sqliteTable('record_annotations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  recordId: integer('record_id').notNull().references(() => records.id, { onDelete: 'cascade' }),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  geometry: text('geometry', { mode: 'json' }).notNull(),
  label: text('label'),
  color: text('color').default('#f59e0b'),
  strokeWidth: integer('stroke_width').default(2),
  rtiView: text('rti_view', { mode: 'json' }).notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
  source: text('source').default('manual'),
  visibility: text('visibility').notNull().default('private'),
});

export const imageSearchCache = sqliteTable('image_search_cache', {
  contentHash: text('content_hash').notNull(),
  resultLimit: integer('result_limit').notNull(),
  results: text('results', { mode: 'json' }).notNull(),
  total: integer('total').notNull().default(0),
  catalogCount: integer('catalog_count').notNull().default(0),
  createdAt: text('created_at').notNull(),
  lastUsedAt: text('last_used_at').notNull(),
  hitCount: integer('hit_count').notNull().default(0),
}, (table) => [
  primaryKey({ columns: [table.contentHash, table.resultLimit] }),
]);

export const processingJobs = sqliteTable('processing_jobs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  recordId: integer('record_id').notNull().references(() => records.id, { onDelete: 'cascade' }),
  jobType: text('job_type').notNull().default('rti'),
  status: text('status').notNull().default('queued'),
  position: integer('position').notNull().default(0),
  payloadJson: text('payload_json').notNull(),
  error: text('error'),
  createdAt: text('created_at').notNull(),
  startedAt: text('started_at'),
  finishedAt: text('finished_at'),
});

export const siteSettings = sqliteTable('site_settings', {
  id: integer('id').primaryKey(),
  config: text('config', { mode: 'json' }).notNull().default({}),
});

export const recordTypes = sqliteTable('record_types', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').default(''),
  isDefault: integer('is_default').notNull().default(0),
  sortOrder: integer('sort_order').notNull().default(0),
  schema: text('schema', { mode: 'json' }).notNull(),
});

export const uploadSessions = sqliteTable('upload_sessions', {
  id: text('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  field: text('field').notNull(),
  originalName: text('original_name').notNull(),
  sizeBytes: integer('size_bytes').notNull(),
  receivedBytes: integer('received_bytes').notNull().default(0),
  tempPath: text('temp_path').notNull(),
  finalPath: text('final_path'),
  status: text('status').notNull().default('receiving'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const catalogViews = sqliteTable('catalog_views', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  recordTypeId: integer('record_type_id').references(() => recordTypes.id, { onDelete: 'set null' }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  isDefault: integer('is_default').notNull().default(0),
  isPublic: integer('is_public').notNull().default(1),
  config: text('config', { mode: 'json' }).notNull(),
});
