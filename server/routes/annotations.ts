import { eq, and } from 'drizzle-orm';
import type { Express } from 'express';
import { parseAnnotationVisibility } from '@rtidb/shared/annotations';
import { requireAnnotate } from '../lib/collaboration.js';
import { validateAnnotationBody } from '../lib/annotations.js';
import { canListRecordAnnotations, listRecordAnnotations } from '../lib/annotationQueries.js';
import { catalogNow, respondResourceError, findUserOwnedAnnotation } from '../lib/recordUserCrud.js';
import type { ServerContext } from '../types/index.js';

export function registerAnnotationRoutes(app: Express, ctx: ServerContext) {
  const {
    db,
    schema,
    fetchAccessibleRecordOr404,
    authMiddleware,
    optionalAuthMiddleware,
  } = ctx;

  app.get('/api/records/:id/annotations', optionalAuthMiddleware, (req, res) => {
    const record = fetchAccessibleRecordOr404(req, res);
    if (!record) return;
    if (!canListRecordAnnotations(req.user, record)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    try {
      res.json(listRecordAnnotations(db, schema, record, req.user));
    } catch (err) {
      respondResourceError(res, err, 'list annotations');
    }
  });

  app.post('/api/records/:id/annotations', authMiddleware, requireAnnotate, (req, res) => {
    const record = fetchAccessibleRecordOr404(req, res);
    if (!record) return;
    const { type, geometry, label, color, rtiView, visibility } = req.body;
    if (!type || !geometry || !rtiView) {
      return res.status(400).json({ error: 'type, geometry, and rtiView are required' });
    }
    const validationError = validateAnnotationBody({ type, geometry });
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }
    try {
      const now = catalogNow();
      const parsedVisibility = parseAnnotationVisibility(visibility);
      const inserted = db.insert(schema.recordAnnotations).values({
        recordId: record.id,
        userId: req.user!.id,
        type,
        geometry,
        label: label ? String(label).trim() : null,
        color: color || '#f59e0b',
        rtiView,
        visibility: parsedVisibility,
        createdAt: now,
        updatedAt: now,
      }).returning({
        id: schema.recordAnnotations.id,
        type: schema.recordAnnotations.type,
        geometry: schema.recordAnnotations.geometry,
        label: schema.recordAnnotations.label,
        color: schema.recordAnnotations.color,
        rtiView: schema.recordAnnotations.rtiView,
        source: schema.recordAnnotations.source,
        visibility: schema.recordAnnotations.visibility,
        userId: schema.recordAnnotations.userId,
        createdAt: schema.recordAnnotations.createdAt,
        updatedAt: schema.recordAnnotations.updatedAt,
      }).get();

      res.json({
        ...inserted,
        username: req.user!.username,
      });
    } catch (err) {
      respondResourceError(res, err, 'create annotation');
    }
  });

  app.put('/api/records/:id/annotations/:annotationId', authMiddleware, requireAnnotate, (req, res) => {
    const record = fetchAccessibleRecordOr404(req, res);
    if (!record) return;
    const annotationId = Number(req.params.annotationId);
    const { label, color, visibility } = req.body;
    try {
      const existing = findUserOwnedAnnotation(db, schema, annotationId, record.id, req.user!.id);
      if (!existing) {
        return res.status(404).json({ error: 'Annotation not found' });
      }
      const now = catalogNow();
      const updates: {
        updatedAt: string;
        label?: string | null;
        color?: string;
        visibility?: string;
      } = { updatedAt: now };
      if (label !== undefined) updates.label = label ? String(label).trim() : null;
      if (color !== undefined) updates.color = color || '#f59e0b';
      if (visibility !== undefined) updates.visibility = parseAnnotationVisibility(visibility);
      db.update(schema.recordAnnotations).set(updates).where(eq(schema.recordAnnotations.id, annotationId)).run();
      res.json({ success: true, updatedAt: now });
    } catch (err) {
      respondResourceError(res, err, 'update annotation');
    }
  });

  app.delete('/api/records/:id/annotations/:annotationId', authMiddleware, requireAnnotate, (req, res) => {
    const record = fetchAccessibleRecordOr404(req, res);
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
