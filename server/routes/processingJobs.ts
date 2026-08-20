import type { Express } from 'express';
import { sendError } from '../lib/httpErrors.js';
import { routeParam } from '../lib/httpParams.js';
import type { ServerContext } from '../types/index.js';

export function registerProcessingJobRoutes(
  app: Express,
  {
    authMiddleware,
    requirePermission,
    requireManageRecords,
    fetchRecordOr404,
    getProcessingJob,
    getLatestProcessingJob,
    cancelProcessingJob,
    cancelRecordProcessing,
  }: Pick<
    ServerContext,
    | 'authMiddleware'
    | 'requirePermission'
    | 'requireManageRecords'
    | 'fetchRecordOr404'
    | 'getProcessingJob'
    | 'getLatestProcessingJob'
    | 'cancelProcessingJob'
    | 'cancelRecordProcessing'
  >,
) {
  app.get('/api/processing/jobs/:jobId', authMiddleware, requirePermission('upload_rti'), (req, res) => {
    const jobId = routeParam(req.params.jobId);
    if (!jobId) return sendError(res, 400, 'Job id required');

    const job = getProcessingJob(jobId);
    if (!job) return sendError(res, 404, 'Job not found');
    res.json(job);
  });

  app.post('/api/processing/jobs/:jobId/cancel', authMiddleware, requirePermission('upload_rti'), (req, res) => {
    const jobId = routeParam(req.params.jobId);
    if (!jobId) return sendError(res, 400, 'Job id required');

    const result = cancelProcessingJob(jobId);
    if (result.ok === false && result.reason === 'not_found') return sendError(res, 404, 'Job not found');
    if (result.ok === false) return res.status(409).json({ error: 'Job is not active', job: result.job });
    res.json(result.job);
  });

  app.get('/api/records/:id/processing', authMiddleware, requireManageRecords, (req, res) => {
    const record = fetchRecordOr404(req, res);
    if (!record) return;

    const job = getLatestProcessingJob(record.id);
    if (!job) return sendError(res, 404, 'No processing job found');
    res.json(job);
  });

  app.post('/api/records/:id/processing/cancel', authMiddleware, requirePermission('upload_rti'), (req, res) => {
    const record = fetchRecordOr404(req, res);
    if (!record) return;

    const result = cancelRecordProcessing(record.id);
    if (result.ok === false && result.reason === 'not_found') return sendError(res, 404, 'No processing job found');
    if (result.ok === false) return res.status(409).json({ error: 'Job is not active', job: result.job });
    res.json(result.job);
  });
}
