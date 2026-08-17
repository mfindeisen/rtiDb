import type { Express } from 'express';
import { sendError } from '../lib/httpErrors.js';
import { routeParam } from '../lib/httpParams.js';
import type { ServerContext } from '../types/index.js';

export function registerProcessingJobRoutes(
  app: Express,
  {
    authMiddleware,
    requirePermission,
    fetchRecordOr404,
    getProcessingJob,
    getLatestProcessingJob,
  }: Pick<
    ServerContext,
    | 'authMiddleware'
    | 'requirePermission'
    | 'fetchRecordOr404'
    | 'getProcessingJob'
    | 'getLatestProcessingJob'
  >,
) {
  app.get('/api/processing/jobs/:jobId', authMiddleware, requirePermission('upload_rti'), (req, res) => {
    const jobId = routeParam(req.params.jobId);
    if (!jobId) return sendError(res, 400, 'Job id required');

    const job = getProcessingJob(jobId);
    if (!job) return sendError(res, 404, 'Job not found');
    res.json(job);
  });

  app.get('/api/records/:id/processing', authMiddleware, requirePermission('upload_rti'), (req, res) => {
    const record = fetchRecordOr404(req, res);
    if (!record) return;

    const job = getLatestProcessingJob(record.id);
    if (!job) return sendError(res, 404, 'No processing job found');
    res.json(job);
  });
}
