import { eq, sql, and } from 'drizzle-orm';
import type { Express } from 'express';
import { requireAnnotate } from '../lib/collaboration.js';
import { validateAnnotationBody } from '../lib/annotations.js';
import { catalogNow, respondResourceError, findUserOwnedAnnotation } from '../lib/recordUserCrud.js';
import type { ServerContext } from '../types/index.js';

export function registerAnnotationRoutes(app: Express, ctx: ServerContext) {
  const { db, schema, fetchRecordOr404, authMiddleware } = ctx;

  app.get('/api/records/:id/annotations', authMiddleware, requireAnnotate, (req, res) => {
    const record = fetchRecordOr404(req, res);
    if (!record) return;
    try {
      const rows = db.select({
        id: schema.recordAnnotations.id,
        type: schema.recordAnnotations.type,
        geometry: schema.recordAnnotations.geometry,
        label: schema.recordAnnotations.label,
        color: schema.recordAnnotations.color,
        rtiView: schema.recordAnnotations.rtiView,
        source: schema.recordAnnotations.source,
        createdAt: schema.recordAnnotations.createdAt,
        updatedAt: schema.recordAnnotations.updatedAt,
      })
        .from(schema.recordAnnotations)
        .where(and(
          eq(schema.recordAnnotations.recordId, record.id),
          eq(schema.recordAnnotations.userId, req.user!.id),
        ))
        .orderBy(sql`${schema.recordAnnotations.createdAt} DESC`)
        .all();
      res.json(rows);
    } catch (err) {
      respondResourceError(res, err, 'list annotations');
    }
  });

  app.post('/api/records/:id/annotations', authMiddleware, requireAnnotate, (req, res) => {
    const record = fetchRecordOr404(req, res);
    if (!record) return;
    const { type, geometry, label, color, rtiView } = req.body;
    if (!type || !geometry || !rtiView) {
      return res.status(400).json({ error: 'type, geometry, and rtiView are required' });
    }
    const validationError = validateAnnotationBody({ type, geometry });
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }
    try {
      const now = catalogNow();
      const inserted = db.insert(schema.recordAnnotations).values({
        recordId: record.id,
        userId: req.user!.id,
        type,
        geometry,
        label: label ? String(label).trim() : null,
        color: color || '#f59e0b',
        rtiView,
        createdAt: now,
        updatedAt: now,
      }).returning({
        id: schema.recordAnnotations.id,
        type: schema.recordAnnotations.type,
        geometry: schema.recordAnnotations.geometry,
        label: schema.recordAnnotations.label,
        color: schema.recordAnnotations.color,
        rtiView: schema.recordAnnotations.rtiView,
        createdAt: schema.recordAnnotations.createdAt,
        updatedAt: schema.recordAnnotations.updatedAt,
      }).get();
      res.json(inserted);
    } catch (err) {
      respondResourceError(res, err, 'create annotation');
    }
  });

  app.put('/api/records/:id/annotations/:annotationId', authMiddleware, requireAnnotate, (req, res) => {
    const record = fetchRecordOr404(req, res);
    if (!record) return;
    const annotationId = Number(req.params.annotationId);
    const { label, color } = req.body;
    try {
      const existing = findUserOwnedAnnotation(db, schema, annotationId, record.id, req.user!.id);
      if (!existing) {
        return res.status(404).json({ error: 'Annotation not found' });
      }
      const now = catalogNow();
      const updates: { updatedAt: string; label?: string | null; color?: string } = { updatedAt: now };
      if (label !== undefined) updates.label = label ? String(label).trim() : null;
      if (color !== undefined) updates.color = color || '#f59e0b';
      db.update(schema.recordAnnotations).set(updates).where(eq(schema.recordAnnotations.id, annotationId)).run();
      res.json({ success: true, updatedAt: now });
    } catch (err) {
      respondResourceError(res, err, 'update annotation');
    }
  });

  app.delete('/api/records/:id/annotations/:annotationId', authMiddleware, requireAnnotate, (req, res) => {
    const record = fetchRecordOr404(req, res);
    if (!record) return;
    const annotationId = Number(req.params.annotationId);
    try {
      const deleted = db.delete(schema.recordAnnotations)
        .where(and(
          eq(schema.recordAnnotations.id, annotationId),
          eq(schema.recordAnnotations.recordId, record.id),
          eq(schema.recordAnnotations.userId, req.user!.id),
        ))
        .returning({ id: schema.recordAnnotations.id })
        .get();
      if (!deleted) {
        return res.status(404).json({ error: 'Annotation not found' });
      }
      res.json({ success: true });
    } catch (err) {
      respondResourceError(res, err, 'delete annotation');
    }
  });
}
