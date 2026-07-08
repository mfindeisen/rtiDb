import path from 'path';
import fs from 'fs/promises';
import { eq } from 'drizzle-orm';
import type { Express } from 'express';
import { normalizeMetadata, formatCatalogDate, formatCatalogDateTime } from '../lib/metadataFields.js';
import { assignSlugForRecord } from '../lib/slug.js';
import { handleRtiUpload, validateRecordForUpload } from '../lib/rtiUploadHandler.js';
import { sendError } from '../lib/httpErrors.js';
import { sendDatabaseError } from '../lib/userResources.js';
import type { ServerContext } from '../types/index.js';

export function registerRecordMutationRoutes(app: Express, ctx: ServerContext) {
  const {
    db,
    schema,
    uploadDir,
    uploadFields,
    fetchRecordOr404,
    snapshotRecordAfter,
    runProcessingPipeline,
    authMiddleware,
    requirePermission,
  } = ctx;

  app.post('/api/records', authMiddleware, requirePermission('edit_record'), (req, res) => {
    const { name, description, direction, metadata } = req.body;
    if (!name) return sendError(res, 400, 'Name is required');

    try {
      const now = formatCatalogDateTime(new Date().toISOString());
      const initialMetadata = normalizeMetadata({
        ...(metadata && typeof metadata === 'object' ? metadata : {}),
        recordStatus: metadata?.recordStatus || 'Draft',
        digitalRegistrationDate: formatCatalogDate(
          metadata?.digitalRegistrationDate || new Date().toISOString().slice(0, 10),
        ),
        lastEdit: now,
        editHistory: metadata?.editHistory || `[${formatCatalogDate(new Date().toISOString().slice(0, 10))}: Catalog record created]`,
      });

      const inserted = db.insert(schema.records).values({
        name,
        description: description || '',
        date: new Date().toISOString(),
        status: 'draft',
        direction: direction || 'ltr',
        metadata: initialMetadata,
      }).returning({ id: schema.records.id }).get();

      const created = db.select().from(schema.records).where(eq(schema.records.id, inserted.id)).get();
      const slug = assignSlugForRecord(db, schema, created);

      snapshotRecordAfter(inserted.id, 'created', req, 'Catalog record created');

      res.json({ success: true, id: inserted.id, slug, metadata: initialMetadata });
    } catch (err) {
      sendDatabaseError(res, err, 'Create record error');
    }
  });

  app.post('/api/records/:id/upload', authMiddleware, requirePermission('upload_rti'), uploadFields, async (req, res) => {
    const record = fetchRecordOr404(req, res);
    if (!record) return;
    if (!validateRecordForUpload(record, res)) return;

    await handleRtiUpload(ctx, req, res, {
      recordId: record.id,
      existingMetadata: normalizeMetadata(record.metadata),
      snapshotAction: 'upload_started',
      snapshotComment: 'RTI upload started',
    });
  });

  app.post('/api/upload', authMiddleware, requirePermission('upload_rti'), uploadFields, async (req, res) => {
    const { name, description, direction } = req.body;
    await handleRtiUpload(ctx, req, res, {
      name,
      description,
      direction,
      snapshotAction: 'created',
      snapshotComment: 'Record created with RTI upload',
    });
  });

  app.put('/api/records/:id', authMiddleware, requirePermission('edit_record'), (req, res) => {
    const { name, description, direction, metadata } = req.body;
    if (!name) return sendError(res, 400, 'Name is required');

    try {
      const existing = fetchRecordOr404(req, res);
      if (!existing) return;

      const now = formatCatalogDateTime(new Date().toISOString());
      let updatedMetadata = normalizeMetadata(existing.metadata);

      if (metadata && typeof metadata === 'object') {
        updatedMetadata = normalizeMetadata({ ...updatedMetadata, ...metadata, lastEdit: now });
      }

      db.update(schema.records).set({
        name,
        description: description ?? existing.description,
        direction: direction || 'ltr',
        metadata: updatedMetadata,
      }).where(eq(schema.records.id, existing.id)).run();

      if (!existing.slug) {
        assignSlugForRecord(db, schema, { ...existing, name, metadata: updatedMetadata });
      }

      snapshotRecordAfter(existing.id, 'updated', req, 'Catalog metadata updated');

      res.json({ success: true, metadata: updatedMetadata });
    } catch (err) {
      sendDatabaseError(res, err, 'Update error');
    }
  });

  app.put('/api/records/:id/publish', authMiddleware, requirePermission('edit_record'), (req, res) => {
    const { is_published } = req.body;
    if (typeof is_published !== 'boolean') return sendError(res, 400, 'is_published boolean required');

    try {
      const record = fetchRecordOr404(req, res);
      if (!record) return;
      db.update(schema.records).set({ isPublished: is_published ? 1 : 0 }).where(eq(schema.records.id, record.id)).run();
      snapshotRecordAfter(
        record.id,
        is_published ? 'published' : 'unpublished',
        req,
        is_published ? 'Record published' : 'Record unpublished',
      );
      res.json({ success: true });
    } catch (err) {
      sendDatabaseError(res, err, 'Publish error');
    }
  });

  app.delete('/api/records/:id', authMiddleware, requirePermission('delete_record'), async (req, res) => {
    try {
      const record = fetchRecordOr404(req, res);
      if (!record) return;

      db.delete(schema.records).where(eq(schema.records.id, record.id)).run();

      if (record.folderUrl) {
        const folderName = path.basename(record.folderUrl);
        const localPath = path.join(uploadDir, folderName);
        try {
          await fs.rm(localPath, { recursive: true, force: true });
          console.log(`Deleted folder: ${localPath}`);
        } catch (err) {
          console.error(`Failed to delete folder: ${localPath}`, err);
        }
      }

      if (record.tiffUrl) {
        const tiffPath = path.join(uploadDir, path.basename(record.tiffUrl));
        try {
          await fs.unlink(tiffPath);
          console.log(`Deleted tiff file: ${tiffPath}`);
        } catch (err) {
          console.error(`Failed to delete tiff file: ${tiffPath}`, err);
        }
      }

      if (record.thumbnailUrl) {
        const thumbPath = path.join(uploadDir, path.basename(record.thumbnailUrl));
        try {
          await fs.unlink(thumbPath);
          console.log(`Deleted thumbnail file: ${thumbPath}`);
        } catch {
          // ignore
        }
      }

      if (record.originalFilePath) {
        try {
          await fs.unlink(record.originalFilePath);
          console.log(`Deleted original file: ${record.originalFilePath}`);
        } catch {
          // ignore
        }
      }
      if (record.weightsFilePath) {
        try {
          await fs.unlink(record.weightsFilePath);
          console.log(`Deleted weights file: ${record.weightsFilePath}`);
        } catch {
          // ignore
        }
      }

      res.json({ success: true });
    } catch (err) {
      console.error('Delete error:', err);
      sendDatabaseError(res, err, 'Delete record error');
    }
  });

  app.post('/api/records/:id/rerun', authMiddleware, requirePermission('upload_rti'), async (req, res) => {
    try {
      const record = fetchRecordOr404(req, res);
      if (!record) return;
      if (record.status !== 'error') {
        return sendError(res, 400, 'Only failed records in error state can be rerun');
      }
      if (!record.originalFilePath) {
        return sendError(res, 400, 'Original files were already deleted or not found. Cannot rerun.');
      }

      try {
        await fs.access(record.originalFilePath);
      } catch {
        return sendError(res, 400, 'Original file no longer exists on server disk.');
      }

      db.update(schema.records).set({ status: 'processing', progress: 0 }).where(eq(schema.records.id, record.id)).run();
      snapshotRecordAfter(record.id, 'reprocessed', req, 'Processing rerun started');

      const options = {
        quality: record.quality || 90,
        tileSize: record.tileSize || 256,
        format: record.format || 'jpg',
      };

      void runProcessingPipeline(record.id, record.originalFilePath, record.weightsFilePath, options, record.outputType || 'tiles');

      res.json({ success: true });
    } catch (err) {
      console.error('Rerun error:', err);
      sendDatabaseError(res, err, 'Rerun error');
    }
  });
}
