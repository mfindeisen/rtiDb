import type { ProcessingOptions } from '../types/index.js';
import { createJobQueue, type BaseJob } from './jobQueue.js';

export interface ProcessingJobItem {
  recordId: number;
  originalFilePath: string;
  weightsPath: string | null;
  options: ProcessingOptions;
  outputType: string;
}

interface ProcessingJob extends BaseJob {
  recordId: number;
  error?: string;
}

export interface PublicProcessingJob {
  id: string;
  recordId: number;
  status: ProcessingJob['status'];
  position: number;
}

export function createProcessingQueue(
  runPipeline: (item: ProcessingJobItem) => Promise<void>,
) {
  return createJobQueue<ProcessingJob, ProcessingJobItem, PublicProcessingJob>({
    ttlMs: 60 * 60 * 1000,
    createJob: (id, position) => ({
      id,
      status: 'queued',
      position,
      recordId: 0,
      createdAt: Date.now(),
      startedAt: null,
      finishedAt: null,
    }),
    toPublic(job) {
      return {
        id: job.id,
        recordId: job.recordId,
        status: job.status,
        position: job.position,
      };
    },
    async processItem(item, job) {
      job.recordId = item.recordId;
      await runPipeline(item);
    },
  });
}
