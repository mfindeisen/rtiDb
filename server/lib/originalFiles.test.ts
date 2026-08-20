import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { afterEach, describe, expect, it } from 'vitest';
import type { DbRecord } from '../types/index.js';
import {
  isPathInsideDir,
  listAvailableSourceFiles,
  parseSourceFileKind,
  resolveSourceFilePath,
  stripUploadTimestampPrefix,
  suggestedSourceDownloadName,
} from './originalFiles.js';

const tempDirs: string[] = [];

async function makeUploadDir() {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'rti-original-'));
  tempDirs.push(dir);
  return dir;
}

afterEach(async () => {
  await Promise.all(tempDirs.splice(0).map((dir) => fs.rm(dir, { recursive: true, force: true })));
});

describe('isPathInsideDir', () => {
  it('accepts files under the upload root', () => {
    expect(isPathInsideDir('/data/uploads', '/data/uploads/archive/1/scan.ptm')).toBe(true);
  });

  it('rejects the root itself and path traversal', () => {
    expect(isPathInsideDir('/data/uploads', '/data/uploads')).toBe(false);
    expect(isPathInsideDir('/data/uploads', '/data/uploads/../secret.ptm')).toBe(false);
    expect(isPathInsideDir('/data/uploads', '/etc/passwd')).toBe(false);
  });
});

describe('suggestedSourceDownloadName', () => {
  it('strips the multer timestamp prefix', () => {
    expect(stripUploadTimestampPrefix('1730000000-seal.ptm')).toBe('seal.ptm');
  });

  it('prefers metadata rtiFileName plus the disk extension', () => {
    expect(suggestedSourceDownloadName(
      { id: 9, metadata: { rtiFileName: 'Ban-Papyrus_1000' } },
      '/uploads/archive/9/173-scan.ptm',
      'original',
    )).toBe('Ban-Papyrus_1000.ptm');
  });

  it('falls back to the sanitized disk name', () => {
    expect(suggestedSourceDownloadName(
      { id: 3, metadata: {} },
      '/uploads/archive/3/1730000000-weights.json',
      'weights',
    )).toBe('weights.json');
  });
});

describe('listAvailableSourceFiles', () => {
  it('omits paths outside the upload dir and missing files', async () => {
    const uploadDir = await makeUploadDir();
    const record = {
      id: 1,
      metadata: { rtiFileName: 'seal' },
      originalFilePath: '/etc/passwd',
      weightsFilePath: path.join(uploadDir, 'missing.json'),
    } as unknown as DbRecord;

    expect(await listAvailableSourceFiles(record, uploadDir)).toEqual([]);
  });

  it('returns original and weights that exist under the upload dir', async () => {
    const uploadDir = await makeUploadDir();
    const archiveDir = path.join(uploadDir, 'archive', '4');
    await fs.mkdir(archiveDir, { recursive: true });
    const originalPath = path.join(archiveDir, '173-scan.ptm');
    const weightsPath = path.join(archiveDir, '173-decoder.json');
    await fs.writeFile(originalPath, 'ptm');
    await fs.writeFile(weightsPath, '{}');

    const record = {
      id: 4,
      metadata: { rtiFileName: 'scan' },
      originalFilePath: originalPath,
      weightsFilePath: weightsPath,
    } as unknown as DbRecord;

    expect(await listAvailableSourceFiles(record, uploadDir)).toEqual([
      { kind: 'original', fileName: 'scan.ptm', sizeBytes: 3 },
      { kind: 'weights', fileName: 'decoder.json', sizeBytes: 2 },
    ]);
  });
});

describe('resolveSourceFilePath', () => {
  it('resolves the original file for download', async () => {
    const uploadDir = await makeUploadDir();
    const filePath = path.join(uploadDir, '173-scan.hsh');
    await fs.writeFile(filePath, 'hsh');
    const record = {
      id: 2,
      metadata: { rtiFileName: 'rock-art' },
      originalFilePath: filePath,
      weightsFilePath: null,
    } as unknown as DbRecord;

    const resolved = await resolveSourceFilePath(record, uploadDir, 'original');
    expect(resolved).toEqual({ absPath: path.resolve(filePath), fileName: 'rock-art.hsh' });
    expect(await resolveSourceFilePath(record, uploadDir, 'weights')).toBeNull();
  });
});

describe('parseSourceFileKind', () => {
  it('defaults to original', () => {
    expect(parseSourceFileKind('weights')).toBe('weights');
    expect(parseSourceFileKind('original')).toBe('original');
    expect(parseSourceFileKind(undefined)).toBe('original');
  });
});
