import { eq, and } from 'drizzle-orm';
import { proposeAutoAnnotations } from './autoAnnotate.js';
import { validateAnnotationBody } from './annotations.js';
import { resolveThumbnailPath } from './recordEmbeddings.js';
import { formatCatalogDateTime } from './metadataFields.js';
import fs from 'fs/promises';

const JOB_TTL_MS = 15 * 60 * 1000;
const AI_COLOR = '#8b5cf6';

/** @type {Map<string, object>} */
const jobs = new Map();
/** @type {Array<object>} */
const queue = [];
let jobSeq = 0;
let workerActive = false;

function publicJob(job) {
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

function updateQueuePositions() {
  queue.forEach((item, index) => {
    const job = jobs.get(item.id);
    if (job?.status === 'queued') job.position = index + 1;
  });
}

export function getAutoAnnotateJob(jobId) {
  const job = jobs.get(jobId);
  return job ? publicJob(job) : null;
}

export function enqueueAutoAnnotate({
  db,
  schema,
  record,
  userId,
  uploadDir,
  replace = false,
}) {
  const id = String(++jobSeq);
  const job = {
    id,
    status: 'queued',
    phase: null,
    position: queue.length + 1,
    created: 0,
    methods: [],
    model: null,
    error: null,
    createdAt: Date.now(),
    startedAt: null,
    finishedAt: null,
  };
  jobs.set(id, job);
  queue.push({ id, db, schema, record, userId, uploadDir, replace });
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
      job.finishedAt = Date.now();

      if (created === 0) {
        job.error = 'No annotations could be generated (model found nothing and catalog metadata is empty).';
      }
    } catch (err) {
      job.status = 'error';
      job.phase = 'error';
      job.error = err.message || 'Auto-annotation failed';
      job.finishedAt = Date.now();
      console.error(`Auto-annotate job ${item.id} failed:`, err);
    } finally {
      setTimeout(() => jobs.delete(item.id), JOB_TTL_MS);
    }
  }

  workerActive = false;
}
