import type { Express } from 'express';
import {
  listRevisions,
  getRevisionDetail,
  compareRevisions,
  getLatestRevision,
  userCanViewRevisions,
} from '../lib/recordRevisions.js';
import type { ServerContext } from '../types/index.js';
import { routeParam } from '../lib/httpParams.js';

export function registerRevisionRoutes(app: Express, ctx: ServerContext) {
  const { db, schema, fetchRecordOr404, optionalAuthMiddleware } = ctx;

  app.get('/api/records/:id/revisions', optionalAuthMiddleware, (req, res) => {
    const record = fetchRecordOr404(req, res);
    if (!record) return;
    if (!userCanViewRevisions(req.user, record)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    try {
      res.json({
        recordId: record.id,
        currentRevision: getLatestRevision(db, schema, record.id)?.revisionNumber ?? 0,
        revisions: listRevisions(db, schema, record.id),
      });
    } catch (err) {
      console.error('List revisions error:', err);
      res.status(500).json({ error: 'Failed to list revisions' });
    }
  });

  app.get('/api/records/:id/revisions/compare', optionalAuthMiddleware, (req, res) => {
    const record = fetchRecordOr404(req, res);
    if (!record) return;
    if (!userCanViewRevisions(req.user, record)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const from = parseInt(String(req.query.from), 10);
    const to = req.query.to === 'current' ? 'current' : parseInt(String(req.query.to), 10);
    if (!Number.isInteger(from) || from < 1) {
      return res.status(400).json({ error: 'Query param from must be a positive revision number' });
    }
    if (to !== 'current' && (!Number.isInteger(to) || to < 1)) {
      return res.status(400).json({ error: 'Query param to must be a positive revision number or "current"' });
    }

    try {
      const result = compareRevisions(db, schema, record.id, from, to);
      if (!result) return res.status(404).json({ error: 'Revision not found' });
      res.json(result);
    } catch (err) {
      console.error('Compare revisions error:', err);
      res.status(500).json({ error: 'Failed to compare revisions' });
    }
  });

  app.get('/api/records/:id/revisions/:revisionNumber', optionalAuthMiddleware, (req, res) => {
    const record = fetchRecordOr404(req, res);
    if (!record) return;
    if (!userCanViewRevisions(req.user, record)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const revisionNumber = parseInt(routeParam(req.params.revisionNumber), 10);
    if (!Number.isInteger(revisionNumber) || revisionNumber < 1) {
      return res.status(400).json({ error: 'Invalid revision number' });
    }

    try {
      const revision = getRevisionDetail(db, schema, record.id, revisionNumber);
      if (!revision) return res.status(404).json({ error: 'Revision not found' });
      res.json(revision);
    } catch (err) {
      console.error('Get revision error:', err);
      res.status(500).json({ error: 'Failed to load revision' });
    }
  });
}
