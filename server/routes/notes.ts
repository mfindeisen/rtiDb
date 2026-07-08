import { eq, sql, and } from 'drizzle-orm';
import type { Express } from 'express';
import { requireCollaboration } from '../lib/collaboration.js';
import { catalogNow, respondResourceError, findUserOwnedNote } from '../lib/recordUserCrud.js';
import type { ServerContext } from '../types/index.js';

export function registerNoteRoutes(app: Express, ctx: ServerContext) {
  const { db, schema, fetchRecordOr404, authMiddleware } = ctx;

  app.get('/api/records/:id/notes', authMiddleware, requireCollaboration, (req, res) => {
    const record = fetchRecordOr404(req, res);
    if (!record) return;
    try {
      const notes = db.select({
        id: schema.recordNotes.id,
        body: schema.recordNotes.body,
        createdAt: schema.recordNotes.createdAt,
        updatedAt: schema.recordNotes.updatedAt,
      })
        .from(schema.recordNotes)
        .where(and(
          eq(schema.recordNotes.recordId, record.id),
          eq(schema.recordNotes.userId, req.user!.id),
        ))
        .orderBy(sql`${schema.recordNotes.createdAt} DESC`)
        .all();
      res.json(notes);
    } catch (err) {
      respondResourceError(res, err, 'list notes');
    }
  });

  app.post('/api/records/:id/notes', authMiddleware, requireCollaboration, (req, res) => {
    const record = fetchRecordOr404(req, res);
    if (!record) return;
    const { body } = req.body;
    if (!body || !String(body).trim()) {
      return res.status(400).json({ error: 'Note body is required' });
    }
    try {
      const now = catalogNow();
      const inserted = db.insert(schema.recordNotes).values({
        recordId: record.id,
        userId: req.user!.id,
        body: String(body).trim(),
        createdAt: now,
        updatedAt: now,
      }).returning({
        id: schema.recordNotes.id,
        body: schema.recordNotes.body,
        createdAt: schema.recordNotes.createdAt,
        updatedAt: schema.recordNotes.updatedAt,
      }).get();
      res.json(inserted);
    } catch (err) {
      respondResourceError(res, err, 'create note');
    }
  });

  app.put('/api/records/:id/notes/:noteId', authMiddleware, requireCollaboration, (req, res) => {
    const record = fetchRecordOr404(req, res);
    if (!record) return;
    const noteId = Number(req.params.noteId);
    const { body } = req.body;
    if (!body || !String(body).trim()) {
      return res.status(400).json({ error: 'Note body is required' });
    }
    try {
      const existing = findUserOwnedNote(db, schema, noteId, record.id, req.user!.id);
      if (!existing) {
        return res.status(404).json({ error: 'Note not found' });
      }
      const now = catalogNow();
      db.update(schema.recordNotes)
        .set({ body: String(body).trim(), updatedAt: now })
        .where(eq(schema.recordNotes.id, noteId))
        .run();
      res.json({ success: true, updatedAt: now });
    } catch (err) {
      respondResourceError(res, err, 'update note');
    }
  });

  app.delete('/api/records/:id/notes/:noteId', authMiddleware, requireCollaboration, (req, res) => {
    const record = fetchRecordOr404(req, res);
    if (!record) return;
    const noteId = Number(req.params.noteId);
    try {
      const deleted = db.delete(schema.recordNotes)
        .where(and(
          eq(schema.recordNotes.id, noteId),
          eq(schema.recordNotes.recordId, record.id),
          eq(schema.recordNotes.userId, req.user!.id),
        ))
        .returning({ id: schema.recordNotes.id })
        .get();
      if (!deleted) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.json({ success: true });
    } catch (err) {
      respondResourceError(res, err, 'delete note');
    }
  });
}
