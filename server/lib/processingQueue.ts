import { and, asc, desc, eq, inArray, sql } from 'drizzle-orm';
import type { ProcessingJob } from '@rtidb/shared/api/jobs';
import type { AppDb, AppSchema, CancelProcessingResult, ProcessingOptions } from '../types/index.js';
import { isProcessingCancelledError } from './processingErrors.js';
import { broadcastProgress } from './progress.js';

export interface ProcessingJobItem {
  recordId: number;
  originalFilePath: string;
  weightsPath: string | null;
  options: ProcessingOptions;
  outputType: string;
}

interface ProcessingJobPayload {
  originalFilePath: string;
  weightsPath: string | null;
  options: ProcessingOptions;
  outputType: string;
}

export type { CancelProcessingResult } from '../types/index.js';

export interface ProcessingQueue {
  enqueue: (item: ProcessingJobItem) => ProcessingJob;
  get: (jobId: string) => ProcessingJob | null;
  getLatestForRecord: (recordId: number) => ProcessingJob | null;
  cancel: (jobId: string) => CancelProcessingResult;
  cancelLatestForRecord: (recordId: number) => CancelProcessingResult;
  recoverOnStartup: () => void;
  stats: () => { queued: number; processing: number };
}

function nowIso(): string {
  return new Date().toISOString();
}

function parsePayload(raw: string): ProcessingJobPayload {
  return JSON.parse(raw) as ProcessingJobPayload;
}

function toPublic(row: {
  id: number;
  recordId: number;
  status: string;
  position: number;
  error: string | null;
  createdAt: string;
  startedAt: string | null;
  finishedAt: string | null;
}): ProcessingJob {
  return {
    jobId: String(row.id),
    recordId: row.recordId,
    status: row.status as ProcessingJob['status'],
    position: row.position,
    error: row.error ?? null,
    createdAt: row.createdAt,
    startedAt: row.startedAt ?? null,
    finishedAt: row.finishedAt ?? null,
  };
}

export function createProcessingQueue(
  db: AppDb,
  schema: AppSchema,
  runPipeline: (item: ProcessingJobItem, signal: AbortSignal) => Promise<void>,
): ProcessingQueue {
  const { processingJobs, records } = schema;
  let workerActive = false;
  let currentJobId: number | null = null;
  let currentAbort: AbortController | null = null;

  function loadJob(jobId: number) {
    return db.select().from(processingJobs).where(eq(processingJobs.id, jobId)).get();
  }

  function refreshQueuePositions(): void {
    const queued = db.select()
      .from(processingJobs)
      .where(eq(processingJobs.status, 'queued'))
      .orderBy(asc(processingJobs.createdAt), asc(processingJobs.id))
      .all();

    queued.forEach((job, index) => {
      const position = index + 1;
      if (job.position !== position) {
        db.update(processingJobs).set({ position }).where(eq(processingJobs.id, job.id)).run();
      }
    });
  }

  function markRecordCancelled(recordId: number): void {
    db.update(records)
      .set({ status: 'error', message: 'Cancelled', progress: 0 })
      .where(eq(records.id, recordId))
      .run();
    broadcastProgress(recordId, -1, 'Cancelled');
  }

  function markJobCancelled(jobId: number, recordId: number): ProcessingJob {
    db.update(processingJobs)
      .set({ status: 'cancelled', error: 'Cancelled', position: 0, finishedAt: nowIso() })
      .where(eq(processingJobs.id, jobId))
      .run();

    const stillActive = db.select()
      .from(processingJobs)
      .where(and(
        eq(processingJobs.recordId, recordId),
        inArray(processingJobs.status, ['queued', 'processing']),
      ))
      .get();
    if (!stillActive) {
      markRecordCancelled(recordId);
    }

    const row = loadJob(jobId);
    return toPublic(row!);
  }

  async function processJob(jobId: number): Promise<void> {
    const row = loadJob(jobId);
    if (!row || row.status !== 'queued') return;

    const abort = new AbortController();
    currentJobId = jobId;
    currentAbort = abort;

    const claimed = db.update(processingJobs)
      .set({ status: 'processing', position: 0, startedAt: nowIso(), error: null })
      .where(and(eq(processingJobs.id, jobId), eq(processingJobs.status, 'queued')))
      .run();

    if (claimed.changes === 0) {
      if (currentJobId === jobId) {
        currentJobId = null;
        currentAbort = null;
      }
      return;
    }

    if (abort.signal.aborted) {
      markJobCancelled(jobId, row.recordId);
      currentJobId = null;
      currentAbort = null;
      return;
    }

    const payload = parsePayload(row.payloadJson);
    const item: ProcessingJobItem = {
      recordId: row.recordId,
      originalFilePath: payload.originalFilePath,
      weightsPath: payload.weightsPath,
      options: payload.options,
      outputType: payload.outputType,
    };

    try {
      await runPipeline(item, abort.signal);
      db.update(processingJobs)
        .set({ status: 'done', finishedAt: nowIso() })
        .where(eq(processingJobs.id, jobId))
        .run();
    } catch (err) {
      if (abort.signal.aborted || isProcessingCancelledError(err)) {
        markJobCancelled(jobId, row.recordId);
        return;
      }
      const message = err instanceof Error ? err.message : 'Processing failed';
      console.error(`Processing job ${jobId} failed:`, err);
      db.update(processingJobs)
        .set({ status: 'error', error: message, finishedAt: nowIso() })
        .where(eq(processingJobs.id, jobId))
        .run();
    } finally {
      if (currentJobId === jobId) {
        currentJobId = null;
        currentAbort = null;
      }
    }
  }

  async function drainQueue(): Promise<void> {
    if (workerActive) return;
    workerActive = true;

    try {
      while (true) {
        refreshQueuePositions();
        const next = db.select()
          .from(processingJobs)
          .where(eq(processingJobs.status, 'queued'))
          .orderBy(asc(processingJobs.createdAt), asc(processingJobs.id))
          .limit(1)
          .get();
        if (!next) break;
        await processJob(next.id);
      }
    } finally {
      workerActive = false;
    }
  }

  function enqueue(item: ProcessingJobItem): ProcessingJob {
    const queuedCount = db.select({ count: sql<number>`count(*)` })
      .from(processingJobs)
      .where(eq(processingJobs.status, 'queued'))
      .get()?.count ?? 0;

    const inserted = db.insert(processingJobs).values({
      recordId: item.recordId,
      jobType: 'rti',
      status: 'queued',
      position: queuedCount + 1,
      payloadJson: JSON.stringify({
        originalFilePath: item.originalFilePath,
        weightsPath: item.weightsPath,
        options: item.options,
        outputType: item.outputType,
      }),
      createdAt: nowIso(),
    }).returning().get();

    void drainQueue();
    return toPublic(inserted);
  }

  function cancelById(jobId: number): CancelProcessingResult {
    const row = loadJob(jobId);
    if (!row) return { ok: false, reason: 'not_found' };
    if (row.status === 'done' || row.status === 'error' || row.status === 'cancelled') {
      return { ok: false, reason: 'not_active', job: toPublic(row) };
    }

    if (row.status === 'queued') {
      const job = markJobCancelled(jobId, row.recordId);
      refreshQueuePositions();
      return { ok: true, job };
    }

    if (currentJobId === jobId && currentAbort) {
      currentAbort.abort();
    } else {
      markJobCancelled(jobId, row.recordId);
    }

    const latest = loadJob(jobId);
    return { ok: true, job: latest ? toPublic(latest) : markJobCancelled(jobId, row.recordId) };
  }

  function recoverOnStartup(): void {
    db.update(processingJobs)
      .set({ status: 'queued', startedAt: null, position: 0 })
      .where(eq(processingJobs.status, 'processing'))
      .run();

    const stuckRecords = db.select()
      .from(records)
      .where(eq(records.status, 'processing'))
      .all();

    for (const record of stuckRecords) {
      const activeJob = db.select()
        .from(processingJobs)
        .where(and(
          eq(processingJobs.recordId, record.id),
          inArray(processingJobs.status, ['queued', 'processing']),
        ))
        .get();
      if (activeJob || !record.originalFilePath) continue;

      enqueue({
        recordId: record.id,
        originalFilePath: record.originalFilePath,
        weightsPath: record.weightsFilePath,
        options: {
          quality: record.quality || 90,
          tileSize: record.tileSize || 256,
          format: record.format || 'jpg',
        },
        outputType: record.outputType || 'tiles',
      });
    }

    void drainQueue();
  }

  return {
    enqueue,
    get(jobId: string) {
      const id = Number.parseInt(jobId, 10);
      if (Number.isNaN(id)) return null;
      const row = loadJob(id);
      return row ? toPublic(row) : null;
    },
    getLatestForRecord(recordId: number) {
      const row = db.select()
        .from(processingJobs)
        .where(eq(processingJobs.recordId, recordId))
        .orderBy(desc(processingJobs.id))
        .limit(1)
        .get();
      return row ? toPublic(row) : null;
    },
    cancel(jobId: string) {
      const id = Number.parseInt(jobId, 10);
      if (Number.isNaN(id)) return { ok: false, reason: 'not_found' };
      return cancelById(id);
    },
    cancelLatestForRecord(recordId: number) {
      const row = db.select()
        .from(processingJobs)
        .where(and(
          eq(processingJobs.recordId, recordId),
          inArray(processingJobs.status, ['queued', 'processing']),
        ))
        .orderBy(desc(processingJobs.id))
        .limit(1)
        .get();
      if (!row) {
        const latest = db.select()
          .from(processingJobs)
          .where(eq(processingJobs.recordId, recordId))
          .orderBy(desc(processingJobs.id))
          .limit(1)
          .get();
        if (!latest) return { ok: false, reason: 'not_found' };
        return { ok: false, reason: 'not_active', job: toPublic(latest) };
      }
      return cancelById(row.id);
    },
    recoverOnStartup,
    stats() {
      const rows = db.select({
        status: processingJobs.status,
        count: sql<number>`count(*)`,
      })
        .from(processingJobs)
        .where(inArray(processingJobs.status, ['queued', 'processing']))
        .groupBy(processingJobs.status)
        .all();

      let queued = 0;
      let processing = 0;
      for (const row of rows) {
        if (row.status === 'queued') queued = row.count;
        if (row.status === 'processing') processing = row.count;
      }
      return { queued, processing };
    },
  };
}
