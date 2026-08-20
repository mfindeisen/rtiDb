import path from 'path';
import fs from 'fs/promises';
import { normalizeMetadata } from './metadataFields.js';
import { sanitizeUploadFilename } from './uploads.js';
import type { DbRecord } from '../types/index.js';
import type { RecordSourceFile, RecordSourceFileKind } from '@rtidb/shared/api/records';

export type { RecordSourceFile, RecordSourceFileKind };

export function isPathInsideDir(rootDir: string, candidatePath: string): boolean {
  const root = path.resolve(rootDir);
  const candidate = path.resolve(candidatePath);
  const rel = path.relative(root, candidate);
  return rel !== '' && !rel.startsWith('..') && !path.isAbsolute(rel);
}

export function stripUploadTimestampPrefix(diskName: string): string {
  return String(diskName || '').replace(/^\d+-/, '');
}

export function suggestedSourceDownloadName(
  record: Pick<DbRecord, 'id' | 'metadata'>,
  diskPath: string,
  kind: RecordSourceFileKind,
): string {
  const ext = path.extname(diskPath);
  if (kind === 'original') {
    const rtiFileName = normalizeMetadata(record.metadata).rtiFileName?.trim();
    if (rtiFileName) {
      const base = path.basename(rtiFileName.replace(/\\/g, '/'));
      const withExt = path.extname(base) ? base : `${base}${ext}`;
      return sanitizeUploadFilename(withExt, ext);
    }
  }
  const fromDisk = stripUploadTimestampPrefix(path.basename(diskPath));
  const fallback = `record-${record.id}${kind === 'weights' ? '-weights' : ''}${ext}`;
  return sanitizeUploadFilename(fromDisk || fallback, ext);
}

export async function listAvailableSourceFiles(
  record: DbRecord,
  uploadDir: string,
): Promise<RecordSourceFile[]> {
  const files: RecordSourceFile[] = [];
  const original = await statIfDownloadable(uploadDir, record.originalFilePath);
  if (original) {
    files.push({
      kind: 'original',
      fileName: suggestedSourceDownloadName(record, original.path, 'original'),
      sizeBytes: original.size,
    });
  }
  const weights = await statIfDownloadable(uploadDir, record.weightsFilePath);
  if (weights) {
    files.push({
      kind: 'weights',
      fileName: suggestedSourceDownloadName(record, weights.path, 'weights'),
      sizeBytes: weights.size,
    });
  }
  return files;
}

export async function resolveSourceFilePath(
  record: DbRecord,
  uploadDir: string,
  kind: RecordSourceFileKind,
): Promise<{ absPath: string; fileName: string } | null> {
  const stored = kind === 'weights' ? record.weightsFilePath : record.originalFilePath;
  const info = await statIfDownloadable(uploadDir, stored);
  if (!info) return null;
  return {
    absPath: info.path,
    fileName: suggestedSourceDownloadName(record, info.path, kind),
  };
}

export function parseSourceFileKind(value: unknown): RecordSourceFileKind {
  return value === 'weights' ? 'weights' : 'original';
}

async function statIfDownloadable(
  uploadDir: string,
  storedPath: string | null | undefined,
): Promise<{ path: string; size: number } | null> {
  if (!storedPath) return null;
  if (!isPathInsideDir(uploadDir, storedPath)) return null;
  try {
    const abs = path.resolve(storedPath);
    const st = await fs.stat(abs);
    if (!st.isFile()) return null;
    return { path: abs, size: st.size };
  } catch {
    return null;
  }
}
