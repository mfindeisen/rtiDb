import path from 'path';
import fs from 'fs/promises';
import { eq } from 'drizzle-orm';
import type { Request } from 'express';
import { processRTI, processRtiToTiff } from './rtiprep.js';
import { normalizeMetadata, formatCatalogDate, type CatalogMetadata } from './metadataFields.js';
import { updateRecordImageEmbedding } from './recordEmbeddings.js';
import { broadcastProgress } from './progress.js';
import type { AppDb, AppSchema, ProcessingOptions, RecordMetadata } from '../types/index.js';

interface ProcessingPipelineContext {
  db: AppDb;
  schema: AppSchema;
  uploadDir: string;
  snapshotRecordAfterSystem: (recordId: number, action: string, comment?: string | null) => void;
}

interface UploadedFile {
  path: string;
  originalname: string;
}

interface MulterFileMap {
  file?: UploadedFile[];
  latentMap?: UploadedFile[];
  weights?: UploadedFile[];
}

export function createProcessingPipeline({ db, schema, uploadDir, snapshotRecordAfterSystem }: ProcessingPipelineContext) {
  async function runProcessingPipeline(
    recordId: number,
    originalFilePath: string,
    weightsPath: string | null,
    options: ProcessingOptions,
    outputType: string,
  ): Promise<void> {
    const isGeoTiff = outputType === 'geotiff' || outputType === 'neural';
    try {
      broadcastProgress(recordId, 0, '');

      if (isGeoTiff) {
        const tiffPath = await processRtiToTiff(originalFilePath, {
          weightsPath: weightsPath || undefined,
          onProgress: (percent: number | null | undefined, message: string) => {
            if (percent !== undefined && percent !== null) {
              db.update(schema.records).set({ progress: percent }).where(eq(schema.records.id, recordId)).run();
            }
            broadcastProgress(recordId, percent ?? 0, message);
          },
        });
        const tiffName = path.basename(tiffPath);
        const tiffPublicUrl = `/static/uploads/${tiffName}`;
        const thumbName = `${tiffName.substring(0, tiffName.lastIndexOf('.'))}.jpg`;
        const thumbPublicUrl = `/static/uploads/${thumbName}`;
        db.update(schema.records)
          .set({ tiffUrl: tiffPublicUrl, thumbnailUrl: thumbPublicUrl, status: 'done', progress: 100 })
          .where(eq(schema.records.id, recordId))
          .run();
        broadcastProgress(recordId, 100, '');
        try {
          await updateRecordImageEmbedding(db, schema, recordId, thumbPublicUrl, uploadDir);
          console.log(`CLIP embedding stored for record ${recordId}`);
        } catch (err) {
          console.error(`CLIP embedding failed for record ${recordId}:`, err);
        }
      } else {
        const outputDir = await processRTI(originalFilePath, {
          ...options,
          onProgress: (percent: number | null | undefined, message: string) => {
            if (percent !== undefined && percent !== null) {
              db.update(schema.records).set({ progress: percent }).where(eq(schema.records.id, recordId)).run();
            }
            broadcastProgress(recordId, percent ?? 0, message);
          },
        });
        const folderName = path.basename(outputDir);
        const publicUrl = `/static/uploads/${folderName}`;
        const thumbnailUrl = `${publicUrl}/1_1.${options.format || 'jpg'}`;
        db.update(schema.records)
          .set({ folderUrl: publicUrl, thumbnailUrl, status: 'done', progress: 100 })
          .where(eq(schema.records.id, recordId))
          .run();
        broadcastProgress(recordId, 100, '');
        try {
          await updateRecordImageEmbedding(db, schema, recordId, thumbnailUrl, uploadDir);
          console.log(`CLIP embedding stored for record ${recordId}`);
        } catch (err) {
          console.error(`CLIP embedding failed for record ${recordId}:`, err);
        }
      }

      try {
        await fs.unlink(originalFilePath);
        console.log(`Deleted original file: ${originalFilePath}`);
        if (weightsPath) {
          await fs.unlink(weightsPath);
          console.log(`Deleted weights file: ${weightsPath}`);
        }
        db.update(schema.records)
          .set({ originalFilePath: null, weightsFilePath: null })
          .where(eq(schema.records.id, recordId))
          .run();
      } catch (err) {
        console.error('Error unlinking original files on success:', err);
      }

      snapshotRecordAfterSystem(recordId, 'processing_completed', `RTI processing completed (${outputType})`);
    } catch (error) {
      console.error(`Error processing RTI ${recordId}:`, error);
      db.update(schema.records).set({ status: 'error' }).where(eq(schema.records.id, recordId)).run();
      const message = error instanceof Error ? error.message : 'RTI processing failed';
      snapshotRecordAfterSystem(recordId, 'processing_failed', message);
      broadcastProgress(recordId, -1, '');
    }
  }

  return { runProcessingPipeline };
}

export interface ParsedUploadFiles {
  isNeural: boolean;
  originalFilePath: string;
  weightsPath: string | null;
  uploadedFileName: string;
}

export interface ParsedUploadFilesError {
  error: string;
}

export function isParsedUploadError(
  result: ParsedUploadFiles | ParsedUploadFilesError,
): result is ParsedUploadFilesError {
  return 'error' in result;
}

export function parseUploadFiles(req: Request, uploadMode: string): ParsedUploadFiles | ParsedUploadFilesError {
  const files = req.files as MulterFileMap | undefined;
  const isNeural = uploadMode === 'neural';
  if (isNeural) {
    if (!files?.latentMap || !files?.weights) {
      return { error: 'Both latentMap image and weights JSON files are required for Neural RTI.' };
    }
    return {
      isNeural: true,
      originalFilePath: files.latentMap[0]!.path,
      weightsPath: files.weights[0]!.path,
      uploadedFileName: files.latentMap[0]!.originalname,
    };
  }
  if (!files?.file) {
    return { error: 'No file uploaded.' };
  }
  return {
    isNeural: false,
    originalFilePath: files.file[0]!.path,
    weightsPath: null,
    uploadedFileName: files.file[0]!.originalname,
  };
}

export interface UploadSettings {
  isNeural: boolean;
  isGeoTiff: boolean;
  options: ProcessingOptions;
  resolvedOutputType: string;
}

export function buildUploadSettings(body: Record<string, unknown>): UploadSettings {
  const { quality, tileSize, format, outputType, uploadMode } = body;
  const isNeural = uploadMode === 'neural';
  const isGeoTiff = isNeural || outputType === 'geotiff';
  const options: ProcessingOptions = {
    quality: parseInt(String(quality), 10) || 90,
    tileSize: parseInt(String(tileSize), 10) || 256,
    format: String(format || 'jpg'),
  };
  const resolvedOutputType = isNeural ? 'neural' : (isGeoTiff ? 'geotiff' : 'tiles');
  return { isNeural, isGeoTiff, options, resolvedOutputType };
}

export function buildRtiMetadata(
  uploadedFileName: string,
  options: ProcessingOptions,
  isNeural: boolean,
  _isGeoTiff: boolean,
  existingMetadata: RecordMetadata = {},
): CatalogMetadata {
  return normalizeMetadata({
    ...existingMetadata,
    rtiFileName: uploadedFileName.replace(/\.[^.]+$/, ''),
    digitalRegistrationDate: formatCatalogDate(
      existingMetadata.digitalRegistrationDate || new Date().toISOString().slice(0, 10),
    ),
    recordStatus: existingMetadata.recordStatus || 'Draft',
    metadataTileSize: String(options.tileSize),
    processingAlgorithm: isNeural ? 'Neural RTI' : 'HSH Fitter',
    viewerVersion: 'Modern (Three.js)',
  });
}
