import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { eq } from 'drizzle-orm';
import path from 'path';
import { fileURLToPath } from 'url';
import { describe, expect, it } from 'vitest';
import * as schema from '../schema.js';
import { ensureProcessingJobsSchema } from './schemaRepair.js';
import { ProcessingCancelledError } from './processingErrors.js';
import { createProcessingQueue } from './processingQueue.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createTestDb() {
  const sqlite = new Database(':memory:');
  sqlite.pragma('foreign_keys = ON');
  const db = drizzle(sqlite, { schema });
  migrate(db, { migrationsFolder: path.join(__dirname, '..', 'migrations') });
  ensureProcessingJobsSchema(sqlite);
  return db;
}

describe('createProcessingQueue', () => {
  it('persists jobs and processes them in order', async () => {
    const db = createTestDb();
    const processed: number[] = [];
    let releaseFirst: (() => void) | undefined;
    const firstBlocked = new Promise<void>((resolve) => {
      releaseFirst = resolve;
    });

    const queue = createProcessingQueue(db, schema, async (item) => {
      processed.push(item.recordId);
      if (processed.length === 1) {
        await firstBlocked;
      }
    });

    const record = db.insert(schema.records).values({
      name: 'Test',
      date: new Date().toISOString(),
      status: 'processing',
      originalFilePath: '/tmp/sample.ptm',
    }).returning({ id: schema.records.id }).get();

    const first = queue.enqueue({
      recordId: record.id,
      originalFilePath: '/tmp/sample.ptm',
      weightsPath: null,
      options: { quality: 90, tileSize: 256, format: 'jpg' },
      outputType: 'tiles',
    });
    const second = queue.enqueue({
      recordId: record.id,
      originalFilePath: '/tmp/sample2.ptm',
      weightsPath: null,
      options: { quality: 90, tileSize: 256, format: 'jpg' },
      outputType: 'tiles',
    });

    expect(first.position).toBe(1);
    expect(second.position).toBe(1);

    releaseFirst?.();
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(processed).toEqual([record.id, record.id]);
    expect(queue.get(first.jobId)?.status).toBe('done');
    expect(queue.get(second.jobId)?.status).toBe('done');
  });

  it('cancels a queued job without running the pipeline', async () => {
    const db = createTestDb();
    const processed: string[] = [];
    let releaseFirst: (() => void) | undefined;
    const firstBlocked = new Promise<void>((resolve) => {
      releaseFirst = resolve;
    });

    const queue = createProcessingQueue(db, schema, async (item) => {
      processed.push(item.originalFilePath);
      if (processed.length === 1) {
        await firstBlocked;
      }
    });

    const record = db.insert(schema.records).values({
      name: 'Queued',
      date: new Date().toISOString(),
      status: 'processing',
      originalFilePath: '/tmp/queued.ptm',
    }).returning({ id: schema.records.id }).get();

    const first = queue.enqueue({
      recordId: record.id,
      originalFilePath: '/tmp/queued.ptm',
      weightsPath: null,
      options: { quality: 90, tileSize: 256, format: 'jpg' },
      outputType: 'tiles',
    });
    const second = queue.enqueue({
      recordId: record.id,
      originalFilePath: '/tmp/queued2.ptm',
      weightsPath: null,
      options: { quality: 90, tileSize: 256, format: 'jpg' },
      outputType: 'tiles',
    });

    const result = queue.cancel(second.jobId);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.job.status).toBe('cancelled');

    releaseFirst?.();
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(processed).toEqual(['/tmp/queued.ptm']);
    expect(queue.get(first.jobId)?.status).toBe('done');
    expect(queue.get(second.jobId)?.status).toBe('cancelled');
  });

  it('aborts an in-flight job and marks it cancelled', async () => {
    const db = createTestDb();
    let started: () => void = () => {};
    const startedAt = new Promise<void>((resolve) => {
      started = resolve;
    });

    const queue = createProcessingQueue(db, schema, async (_item, signal) => {
      started();
      await new Promise<void>((resolve, reject) => {
        const timer = setTimeout(resolve, 5_000);
        signal.addEventListener('abort', () => {
          clearTimeout(timer);
          reject(new ProcessingCancelledError());
        }, { once: true });
      });
    });

    const record = db.insert(schema.records).values({
      name: 'Running',
      date: new Date().toISOString(),
      status: 'processing',
      originalFilePath: '/tmp/running.ptm',
    }).returning({ id: schema.records.id }).get();

    const job = queue.enqueue({
      recordId: record.id,
      originalFilePath: '/tmp/running.ptm',
      weightsPath: null,
      options: { quality: 90, tileSize: 256, format: 'jpg' },
      outputType: 'tiles',
    });

    await startedAt;
    const result = queue.cancel(job.jobId);
    expect(result.ok).toBe(true);

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(queue.get(job.jobId)?.status).toBe('cancelled');
    const row = db.select().from(schema.records).where(eq(schema.records.id, record.id)).get();
    expect(row?.status).toBe('error');
    expect(row?.message).toBe('Cancelled');
  });

  it('recovers interrupted processing jobs on startup', async () => {
    const db = createTestDb();
    const record = db.insert(schema.records).values({
      name: 'Recover',
      date: new Date().toISOString(),
      status: 'processing',
      originalFilePath: '/tmp/recover.ptm',
    }).returning({ id: schema.records.id }).get();

    db.insert(schema.processingJobs).values({
      recordId: record.id,
      jobType: 'rti',
      status: 'processing',
      position: 0,
      payloadJson: JSON.stringify({
        originalFilePath: '/tmp/recover.ptm',
        weightsPath: null,
        options: { quality: 90, tileSize: 256, format: 'jpg' },
        outputType: 'tiles',
      }),
      createdAt: new Date().toISOString(),
      startedAt: new Date().toISOString(),
    }).run();

    let processed = false;
    const queue = createProcessingQueue(db, schema, async () => {
      processed = true;
    });
    queue.recoverOnStartup();
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(processed).toBe(true);
    expect(queue.getLatestForRecord(record.id)?.status).toBe('done');
  });
});
