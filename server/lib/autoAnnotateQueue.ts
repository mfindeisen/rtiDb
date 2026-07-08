import { eq, and } from 'drizzle-orm';
import fs from 'fs/promises';
import { proposeAutoAnnotations, type AutoAnnotatePhase } from './autoAnnotate.js';
import { validateAnnotationBody } from './annotations.js';
import { resolveThumbnailPath } from './recordEmbeddings.js';
import { formatCatalogDateTime } from './metadataFields.js';
import { createJobQueue, type BaseJob } from './jobQueue.js';
import type { AppDb, AppSchema, DbRecord } from '../types/index.js';

const JOB_TTL_MS = 15 * 60 * 1000;
const AI_COLOR = '#8b5cf6';

type AutoAnnotateJobStatus = 'queued' | 'processing' | 'done' | 'error';
type AutoAnnotateJobPhase = AutoAnnotatePhase | 'prepare' | 'done' | 'error' | null;

interface AutoAnnotateJob extends BaseJob {
  phase: AutoAnnotateJobPhase;
  created: number;
  methods: string[];
  model: string | null;
  error: string | null;
}

interface QueueItem {
  db: AppDb;
  schema: AppSchema;
  record: DbRecord;
  userId: number;
  uploadDir: string;
  replace: boolean;
}

export interface PublicAutoAnnotateJob {
  jobId: string;
  status: AutoAnnotateJobStatus;
  phase: AutoAnnotateJobPhase;
  position: number;
  created: number;
  methods: string[];
  model: string | null;
  error: string | null;
  createdAt: number;
  startedAt: number | null;
  finishedAt: number | null;
}

export interface EnqueueAutoAnnotateParams {
  db: AppDb;
  schema: AppSchema;
  record: DbRecord;
  userId: number;
  uploadDir: string;
  replace?: boolean;
}

function toPublic(job: AutoAnnotateJob): PublicAutoAnnotateJob {
  return {
    jobId: job.id,
    status: job.status,
    phase: job.phase,
    position: job.position,
    created: job.created,
    methods: job.methods,
    model: job.model,
    error: job.error,
    createdAt: job.createdAt,
    startedAt: job.startedAt,
    finishedAt: job.finishedAt,
  };
}

const queue = createJobQueue<AutoAnnotateJob, QueueItem, PublicAutoAnnotateJob>({
  ttlMs: JOB_TTL_MS,
  createJob: (id, position) => ({
    id,
    status: 'queued',
    phase: null,
    position,
    created: 0,
    methods: [],
    model: null,
    error: null,
    createdAt: Date.now(),
    startedAt: null,
    finishedAt: null,
  }),
  toPublic,
  processItem: async (item, job) => {
    job.phase = 'prepare';

    try {
      if (item.record.status !== 'done' || !item.record.thumbnailUrl) {
        throw new Error('Record must be processed with a thumbnail before auto-annotation');
      }

      const thumbPath = resolveThumbnailPath(item.record.thumbnailUrl, item.uploadDir);
      if (!thumbPath) throw new Error('Thumbnail path could not be resolved');
      await fs.access(thumbPath);

      if (item.replace) {
        item.db.delete(item.schema.recordAnnotations)
          .where(and(
            eq(item.schema.recordAnnotations.recordId, item.record.id),
            eq(item.schema.recordAnnotations.userId, item.userId),
            eq(item.schema.recordAnnotations.source, 'ai'),
          ))
          .run();
      }

      const proposal = await proposeAutoAnnotations(
        thumbPath,
        item.record.metadata,
        { onProgress: (phase) => { job.phase = phase; } },
      );

      job.model = proposal.model;
      job.methods = proposal.methods;

      const now = formatCatalogDateTime(new Date().toISOString());
      let created = 0;

      for (const ann of proposal.annotations) {
        const validationError = validateAnnotationBody({ type: ann.type, geometry: ann.geometry });
        if (validationError) continue;

        item.db.insert(item.schema.recordAnnotations).values({
          recordId: item.record.id,
          userId: item.userId,
          type: ann.type,
          geometry: ann.geometry,
          label: ann.label,
          color: ann.color || AI_COLOR,
          rtiView: ann.rtiView,
          source: 'ai',
          createdAt: now,
          updatedAt: now,
        }).run();
        created++;
      }

      job.created = created;
      job.status = 'done';
      job.phase = 'done';

      if (created === 0) {
        job.error = 'No annotations could be generated (model found nothing and catalog metadata is empty).';
      }
    } catch (err) {
      job.status = 'error';
      job.phase = 'error';
      job.error = err instanceof Error ? err.message : 'Auto-annotation failed';
    }
  },
});

export function getAutoAnnotateJob(jobId: string): PublicAutoAnnotateJob | null {
  return queue.get(jobId);
}

export function enqueueAutoAnnotate({
  db,
  schema,
  record,
  userId,
  uploadDir,
  replace = false,
}: EnqueueAutoAnnotateParams): PublicAutoAnnotateJob {
  return queue.enqueue({
    db,
    schema,
    record,
    userId,
    uploadDir,
    replace,
  });
}
