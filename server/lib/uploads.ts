import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import type { RequestHandler } from 'express';

export interface UploadMiddlewareResult {
  uploadDir: string;
  uploadFields: RequestHandler;
  imageSearchUpload: multer.Multer;
}

export function createUploadMiddleware(serverDir: string): UploadMiddlewareResult {
  const uploadDir = path.join(serverDir, 'uploads');
  const storage = multer.diskStorage({
    destination: async (_req, _file, cb) => {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage });
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
        cb(null, `query-${Date.now()}${path.extname(file.originalname) || '.jpg'}`);
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 },
  });

  return { uploadDir, uploadFields, imageSearchUpload };
}
