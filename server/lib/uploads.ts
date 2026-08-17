import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import type { RequestHandler } from 'express';

export interface UploadMiddlewareResult {
  uploadDir: string;
  uploadFields: RequestHandler;
  imageSearchUpload: multer.Multer;
}

/** Keep a timestamped disk name free of path separators and control chars. */
export function sanitizeUploadFilename(originalname: string, fallbackExt = ''): string {
  const base = path.basename(String(originalname || '').replace(/\\/g, '/')).replace(/[\0\r\n]/g, '');
  const ext = path.extname(base).slice(0, 16);
  const stem = path.basename(base, ext).replace(/[^a-zA-Z0-9._-]+/g, '_').replace(/^[._]+/, '').slice(0, 80);
  const safeExt = /^\.[a-zA-Z0-9]+$/.test(ext) ? ext.toLowerCase() : fallbackExt;
  return `${stem || 'upload'}${safeExt}`;
}

export function createUploadMiddleware(serverDir: string, maxFileSizeBytes = 2 * 1024 * 1024 * 1024): UploadMiddlewareResult {
  const uploadDir = path.join(serverDir, 'uploads');
  const storage = multer.diskStorage({
    destination: async (_req, _file, cb) => {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
      cb(null, `${Date.now()}-${sanitizeUploadFilename(file.originalname)}`);
    },
  });

  const upload = multer({ storage, limits: { fileSize: maxFileSizeBytes } });
  const uploadFields = upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'latentMap', maxCount: 1 },
    { name: 'weights', maxCount: 1 },
  ]);

  const imageSearchUpload = multer({
    storage: multer.diskStorage({
      destination: async (_req, _file, cb) => {
        const tempDir = path.join(uploadDir, 'search-temp');
        await fs.mkdir(tempDir, { recursive: true });
        cb(null, tempDir);
      },
      filename: (_req, file, cb) => {
        const safe = sanitizeUploadFilename(file.originalname, '.jpg');
        cb(null, `query-${Date.now()}${path.extname(safe) || '.jpg'}`);
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 },
  });

  return { uploadDir, uploadFields, imageSearchUpload };
}
