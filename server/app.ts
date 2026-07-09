import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import db, { schema } from './db.js';
import type { ServerConfig } from './config.js';
import { createAuthMiddleware } from './middleware/auth.js';
import { createUploadMiddleware } from './lib/uploads.js';
import { registerProgressRoutes } from './lib/progress.js';
import { createRecordHelpers } from './lib/recordHelpers.js';
import { createProcessingPipeline } from './lib/processingPipeline.js';
import { registerHealthRoutes, registerDocsRoutes, registerDiscoveryRoutes } from './routes/system.js';
import { registerAuthRoutes } from './routes/auth.js';
import { registerSearchRoutes } from './routes/search.js';
import { registerRecordReadRoutes } from './routes/recordsRead.js';
import { registerRevisionRoutes } from './routes/revisions.js';
import { registerNoteRoutes } from './routes/notes.js';
import { registerAnnotationRoutes } from './routes/annotations.js';
import { registerCommentRoutes } from './routes/comments.js';
import { registerRecordMutationRoutes } from './routes/recordMutations.js';
import { registerUserRoutes } from './routes/users.js';
import { errorHandler, notFoundHandler } from './lib/httpErrors.js';
import type { ServerContext } from './types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp(config: ServerConfig): Express {
  const app = express();
  const { uploadDir, uploadFields, imageSearchUpload } = createUploadMiddleware(__dirname);
  const auth = createAuthMiddleware(config.jwtSecret);
  const recordHelpers = createRecordHelpers({ db, schema });
  const { runProcessingPipeline } = createProcessingPipeline({
    db,
    schema,
    uploadDir,
    snapshotRecordAfterSystem: recordHelpers.snapshotRecordAfterSystem,
  });

  const ctx: ServerContext = {
    db,
    schema,
    uploadDir,
    uploadFields,
    imageSearchUpload,
    config,
    ...auth,
    ...recordHelpers,
    runProcessingPipeline,
  };

  app.use(cors());
  app.use(express.json());
  app.use('/static/uploads', express.static(uploadDir));

  registerHealthRoutes(app);
  registerDocsRoutes(app, auth.sessionAuthMiddleware);
  registerDiscoveryRoutes(app);
  registerProgressRoutes(app);
  registerAuthRoutes(app, ctx);
  registerSearchRoutes(app, ctx);
  registerRecordReadRoutes(app, ctx);
  registerRevisionRoutes(app, ctx);
  registerNoteRoutes(app, ctx);
  registerAnnotationRoutes(app, ctx);
  registerCommentRoutes(app, ctx);
  registerRecordMutationRoutes(app, ctx);
  registerUserRoutes(app, ctx);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

export default createApp;
