export type JobStatus = 'queued' | 'processing' | 'done' | 'error';

export interface BaseJob {
  id: string;
  status: JobStatus;
  position: number;
  createdAt: number;
  startedAt: number | null;
  finishedAt: number | null;
}

export interface JobQueueOptions<TJob extends BaseJob, TItem, TPublic> {
  ttlMs: number;
  createJob: (id: string, position: number) => TJob;
  toPublic: (job: TJob) => TPublic;
  processItem: (item: TItem & { id: string }, job: TJob) => Promise<void>;
}

export interface JobQueue<TItem, TPublic> {
  enqueue: (item: TItem) => TPublic;
  get: (jobId: string) => TPublic | null;
  stats: () => { queued: number; processing: number };
}

export function createJobQueue<TJob extends BaseJob, TItem, TPublic>(
  options: JobQueueOptions<TJob, TItem, TPublic>,
): JobQueue<TItem, TPublic> {
  const jobs = new Map<string, TJob>();
  const queue: Array<TItem & { id: string }> = [];
  let jobSeq = 0;
  let workerActive = false;

  function updateQueuePositions(): void {
    queue.forEach((item, index) => {
      const job = jobs.get(item.id);
      if (job?.status === 'queued') job.position = index + 1;
    });
  }

  async function drainQueue(): Promise<void> {
    if (workerActive || queue.length === 0) return;
    workerActive = true;

    while (queue.length > 0) {
      const item = queue.shift()!;
      updateQueuePositions();

      const job = jobs.get(item.id);
      if (!job) continue;

      job.status = 'processing';
      job.position = 0;
      job.startedAt = Date.now();

      try {
        await options.processItem(item, job);
        if (job.status === 'processing') {
          job.status = 'done';
        }
      } catch (err) {
        if (job.status === 'processing') {
          job.status = 'error';
        }
        console.error(`Job ${item.id} failed:`, err);
      } finally {
        if (!job.finishedAt) job.finishedAt = Date.now();
        setTimeout(() => jobs.delete(item.id), options.ttlMs);
      }
    }

    workerActive = false;
  }

  return {
    enqueue(item: TItem): TPublic {
      const id = String(++jobSeq);
      const job = options.createJob(id, queue.length + 1);
      jobs.set(id, job);
      queue.push({ ...item, id });
      updateQueuePositions();
      void drainQueue();
      return options.toPublic(job);
    },
    get(jobId: string): TPublic | null {
      const job = jobs.get(jobId);
      return job ? options.toPublic(job) : null;
    },
    stats() {
      return {
        queued: queue.length,
        processing: workerActive ? 1 : 0,
      };
    },
  };
}
