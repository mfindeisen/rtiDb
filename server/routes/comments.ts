import { eq, sql, and } from 'drizzle-orm';
import type { Express } from 'express';
import { requireComment } from '../lib/collaboration.js';
import {
  catalogNow,
  respondResourceError,
  findUserOwnedComment,
  findRecordComment,
} from '../lib/recordUserCrud.js';
import type { ServerContext } from '../types/index.js';

export function registerCommentRoutes(app: Express, ctx: ServerContext) {
  const { db, schema, fetchRecordOr404, authMiddleware } = ctx;

  app.get('/api/records/:id/comments', authMiddleware, requireComment, (req, res) => {
    const record = fetchRecordOr404(req, res);
    if (!record) return;
    try {
      const comments = db.select({
        id: schema.recordComments.id,
        body: schema.recordComments.body,
        parentId: schema.recordComments.parentId,
        userId: schema.recordComments.userId,
        username: schema.users.username,
        createdAt: schema.recordComments.createdAt,
        updatedAt: schema.recordComments.updatedAt,
      })
        .from(schema.recordComments)
        .innerJoin(schema.users, eq(schema.recordComments.userId, schema.users.id))
        .where(eq(schema.recordComments.recordId, record.id))
        .orderBy(sql`${schema.recordComments.createdAt} ASC`)
        .all();
      res.json(comments);
    } catch (err) {
      respondResourceError(res, err, 'list comments');
    }
  });

  app.post('/api/records/:id/comments', authMiddleware, requireComment, (req, res) => {
    const record = fetchRecordOr404(req, res);
    if (!record) return;
    const { body, parentId } = req.body;
    if (!body || !String(body).trim()) {
      return res.status(400).json({ error: 'Comment body is required' });
    }
    const parentIdNum = parentId != null ? Number(parentId) : null;
    if (parentIdNum != null) {
      if (!Number.isFinite(parentIdNum)) {
        return res.status(400).json({ error: 'Invalid parent comment' });
      }
      const parent = findRecordComment(db, schema, parentIdNum, record.id);
      if (!parent) {
        return res.status(400).json({ error: 'Parent comment not found on this record' });
      }
    }
    try {
      const now = catalogNow();
      const inserted = db.insert(schema.recordComments).values({
        recordId: record.id,
        userId: req.user!.id,
        parentId: parentIdNum,
        body: String(body).trim(),
        createdAt: now,
        updatedAt: now,
      }).returning({
        id: schema.recordComments.id,
        body: schema.recordComments.body,
        parentId: schema.recordComments.parentId,
        userId: schema.recordComments.userId,
        createdAt: schema.recordComments.createdAt,
        updatedAt: schema.recordComments.updatedAt,
      }).get();
      res.json({
        ...inserted,
        username: req.user!.username,
      });
    } catch (err) {
      respondResourceError(res, err, 'create comment');
    }
  });

  app.put('/api/records/:id/comments/:commentId', authMiddleware, requireComment, (req, res) => {
    const record = fetchRecordOr404(req, res);
    if (!record) return;
    const commentId = Number(req.params.commentId);
    const { body } = req.body;
    if (!body || !String(body).trim()) {
      return res.status(400).json({ error: 'Comment body is required' });
    }
    try {
      const existing = findUserOwnedComment(db, schema, commentId, record.id, req.user!.id);
      if (!existing) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      const now = catalogNow();
      db.update(schema.recordComments)
        .set({ body: String(body).trim(), updatedAt: now })
        .where(eq(schema.recordComments.id, commentId))
        .run();
      res.json({ success: true, updatedAt: now });
    } catch (err) {
      respondResourceError(res, err, 'update comment');
    }
  });

  app.delete('/api/records/:id/comments/:commentId', authMiddleware, requireComment, (req, res) => {
    const record = fetchRecordOr404(req, res);
    if (!record) return;
    const commentId = Number(req.params.commentId);
    try {
      const deleted = db.delete(schema.recordComments)
        .where(and(
          eq(schema.recordComments.id, commentId),
          eq(schema.recordComments.recordId, record.id),
          eq(schema.recordComments.userId, req.user!.id),
        ))
        .returning({ id: schema.recordComments.id })
        .get();
      if (!deleted) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      res.json({ success: true });
    } catch (err) {
      respondResourceError(res, err, 'delete comment');
    }
  });
}
