import type { Express, Request, RequestHandler, Response } from 'express';
import type multer from 'multer';
import type { ServerConfig } from '../config.js';
import type { AppDb, AppSchema, DbRecord } from './db.js';
import type { Permission } from './permissions.js';

export interface AuthContext {
  authMiddleware: RequestHandler;
  optionalAuthMiddleware: RequestHandler;
  requirePermission: (permission: Permission) => RequestHandler;
  requireAdmin: RequestHandler;
}

export interface RecordHelpersContext {
  fetchRecordOr404: (req: Request, res: Response) => DbRecord | null;
  snapshotRecordAfter: (recordId: number, action: string, req: Request, comment?: string | null) => void;
  snapshotRecordAfterSystem: (recordId: number, action: string, comment?: string | null) => void;
}

export interface ProcessingOptions {
  quality: number;
  tileSize: number;
  format: string;
}

export interface ServerContext extends AuthContext, RecordHelpersContext {
  db: AppDb;
  schema: AppSchema;
  uploadDir: string;
  uploadFields: RequestHandler;
  imageSearchUpload: multer.Multer;
  config: ServerConfig;
  runProcessingPipeline: (
    recordId: number,
    originalFilePath: string,
    weightsPath: string | null,
    options: ProcessingOptions,
    outputType: string,
  ) => Promise<void>;
}

export type RouteRegistrar = (app: Express, ctx: ServerContext) => void;
