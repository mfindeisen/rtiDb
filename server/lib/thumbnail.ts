import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import sharp from 'sharp';

/** Longest edge of gallery/search JPEG previews. */
export const GALLERY_THUMB_MAX_EDGE = 256;

async function pathExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Write a small JPEG preview. If source and dest are the same file, replace it in place.
 */
export async function writeGalleryThumbnail(sourcePath: string, destPath: string): Promise<void> {
  await fs.mkdir(path.dirname(destPath), { recursive: true });
  const sameFile = path.resolve(sourcePath) === path.resolve(destPath);
  const outPath = sameFile
    ? path.join(os.tmpdir(), `rti-thumb-${process.pid}-${Date.now()}-${Math.random().toString(16).slice(2)}.jpg`)
    : destPath;

  await sharp(sourcePath)
    .rotate()
    .resize(GALLERY_THUMB_MAX_EDGE, GALLERY_THUMB_MAX_EDGE, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({ quality: 72, mozjpeg: true })
    .toFile(outPath);

  if (sameFile) {
    try {
      await fs.rename(outPath, destPath);
    } catch {
      await fs.copyFile(outPath, destPath);
      await fs.unlink(outPath).catch(() => undefined);
    }
  }
}

export async function firstExistingPath(candidates: string[]): Promise<string | null> {
  for (const candidate of candidates) {
    if (await pathExists(candidate)) return candidate;
  }
  return null;
}
