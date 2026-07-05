import fs from 'fs/promises';
import { findSimilarRecords } from './imageSearch.js';
import { saveCachedImageSearch } from './imageSearchCache.js';

const JOB_TTL_MS = 10 * 60 * 1000;

/** @type {Map<string, object>} */
const jobs = new Map();
/** @type {Array<{ id: string, filePath: string, uploadDir: string, limit: number, contentHash: string | null, fetchRecords: () => unknown[] }>} */
const queue = [];
let jobSeq = 0;
let workerActive = false;

function updateQueuePositions() {
  queue.forEach((item, index) => {
    const job = jobs.get(item.id);
    if (job?.status === 'queued') job.position = index + 1;
  });
}

function publicJob(job) {
  return {
    jobId: job.id,
    status: job.status,
    phase: job.phase,
    position: job.position,
    total: job.total,
    results: job.results,
    error: job.error,
    cached: false,
    createdAt: job.createdAt,
    startedAt: job.startedAt,
    finishedAt: job.finishedAt,
  };
}

export function getImageSearchJob(jobId) {
  const job = jobs.get(jobId);
  return job ? publicJob(job) : null;
}

export function enqueueImageSearch({ filePath, uploadDir, limit, fetchRecords, contentHash = null }) {
  const id = String(++jobSeq);
  const job = {
    id,
    status: 'queued',
    phase: null,
    position: queue.length + 1,
    total: 0,
    results: null,
    error: null,
    createdAt: Date.now(),
    startedAt: null,
    finishedAt: null,
  };
  jobs.set(id, job);
  queue.push({ id, filePath, uploadDir, limit, contentHash, fetchRecords });
  updateQueuePositions();
  void drainQueue();
  return publicJob(job);
}

async function drainQueue() {
  if (workerActive || queue.length === 0) return;
  workerActive = true;

  while (queue.length > 0) {
    const item = queue.shift();
    updateQueuePositions();

    const job = jobs.get(item.id);
    if (!job) continue;

    job.status = 'processing';
    job.position = 0;
    job.startedAt = Date.now();
    job.phase = 'embedding';

    try {
      const records = item.fetchRecords();
      const results = await findSimilarRecords(item.filePath, records, item.uploadDir, {
        limit: item.limit,
        onProgress: (phase) => {
          job.phase = phase;
        },
      });
      job.status = 'done';
      job.phase = 'done';
      job.results = results;
      job.total = results.length;
      job.finishedAt = Date.now();

      if (item.contentHash) {
        saveCachedImageSearch(item.contentHash, item.limit, results);
      }
    } catch (err) {
      job.status = 'error';
      job.phase = 'error';
      job.error = err.message || 'Image search failed';
      job.finishedAt = Date.now();
      console.error(`Image search job ${item.id} failed:`, err);
    } finally {
      try {
        await fs.unlink(item.filePath);
      } catch {
        // ignore cleanup errors
      }
      setTimeout(() => jobs.delete(item.id), JOB_TTL_MS);
    }
  }

  workerActive = false;
}

export function getImageSearchQueueStats() {
  return {
    queued: queue.length,
    processing: workerActive ? 1 : 0,
  };
}
