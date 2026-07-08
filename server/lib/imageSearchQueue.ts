import fs from 'fs/promises';
import { findSimilarRecords, type ImageSearchMatch, type ImageSearchPhase } from './imageSearch.js';
import { saveCachedImageSearch } from './imageSearchCache.js';
import { createJobQueue, type BaseJob } from './jobQueue.js';
import type { DbRecord } from '../types/index.js';

const JOB_TTL_MS = 10 * 60 * 1000;

type ImageSearchJobStatus = 'queued' | 'processing' | 'done' | 'error';
type ImageSearchJobPhase = ImageSearchPhase | 'done' | 'error' | null;

interface ImageSearchJob extends BaseJob {
  status: ImageSearchJobStatus;
  phase: ImageSearchJobPhase;
  total: number;
  results: ImageSearchMatch[] | null;
  error: string | null;
}

interface QueueItem {
  filePath: string;
  uploadDir: string;
  limit: number;
  contentHash: string | null;
  fetchRecords: () => DbRecord[];
}

export interface PublicImageSearchJob {
  jobId: string;
  status: ImageSearchJobStatus;
  phase: ImageSearchJobPhase;
  position: number;
  total: number;
  results: ImageSearchMatch[] | null;
  error: string | null;
  cached: false;
  createdAt: number;
  startedAt: number | null;
  finishedAt: number | null;
}

function toPublic(job: ImageSearchJob): PublicImageSearchJob {
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

const queue = createJobQueue<ImageSearchJob, QueueItem, PublicImageSearchJob>({
  ttlMs: JOB_TTL_MS,
  createJob: (id, position) => ({
    id,
    status: 'queued',
    phase: null,
    position,
    total: 0,
    results: null,
    error: null,
    createdAt: Date.now(),
    startedAt: null,
    finishedAt: null,
  }),
  toPublic,
  processItem: async (item, job) => {
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

      if (item.contentHash) {
        saveCachedImageSearch(item.contentHash, item.limit, results);
      }
    } catch (err) {
      job.status = 'error';
      job.phase = 'error';
      job.error = err instanceof Error ? err.message : 'Image search failed';
    } finally {
      try {
        await fs.unlink(item.filePath);
      } catch {
        // ignore cleanup errors
      }
    }
  },
});

export function getImageSearchJob(jobId: string): PublicImageSearchJob | null {
  return queue.get(jobId);
}

export interface EnqueueImageSearchParams {
  filePath: string;
  uploadDir: string;
  limit: number;
  fetchRecords: () => DbRecord[];
  contentHash?: string | null;
}

export function enqueueImageSearch({
  filePath,
  uploadDir,
  limit,
  fetchRecords,
  contentHash = null,
}: EnqueueImageSearchParams): PublicImageSearchJob {
  return queue.enqueue({
    filePath,
    uploadDir,
    limit,
    contentHash,
    fetchRecords,
  });
}

export function getImageSearchQueueStats(): { queued: number; processing: number } {
  return queue.stats();
}
