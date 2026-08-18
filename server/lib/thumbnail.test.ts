import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { describe, expect, it } from 'vitest';
import sharp from 'sharp';
import { firstExistingPath, GALLERY_THUMB_MAX_EDGE, writeGalleryThumbnail } from './thumbnail.js';

describe('writeGalleryThumbnail', () => {
  it('downscales a large image to the gallery max edge', async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'rti-thumb-'));
    const source = path.join(dir, 'source.png');
    const dest = path.join(dir, 'thumbnail.jpg');
    await sharp({
      create: { width: 800, height: 400, channels: 3, background: { r: 200, g: 40, b: 40 } },
    }).png().toFile(source);

    await writeGalleryThumbnail(source, dest);

    const info = await sharp(dest).metadata();
    expect(info.format).toBe('jpeg');
    expect(info.width).toBe(GALLERY_THUMB_MAX_EDGE);
    expect(info.height).toBe(GALLERY_THUMB_MAX_EDGE / 2);
  });

  it('replaces an oversized jpeg in place', async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'rti-thumb-'));
    const file = path.join(dir, 'preview.jpg');
    await sharp({
      create: { width: 640, height: 640, channels: 3, background: { r: 10, g: 20, b: 30 } },
    }).jpeg().toFile(file);

    await writeGalleryThumbnail(file, file);

    const info = await sharp(file).metadata();
    expect(info.width).toBe(GALLERY_THUMB_MAX_EDGE);
    expect(info.height).toBe(GALLERY_THUMB_MAX_EDGE);
  });
});

describe('firstExistingPath', () => {
  it('returns the first path that exists', async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'rti-thumb-'));
    const present = path.join(dir, 'a.jpg');
    await fs.writeFile(present, 'x');
    expect(await firstExistingPath([path.join(dir, 'missing.jpg'), present])).toBe(present);
    expect(await firstExistingPath([path.join(dir, 'missing.jpg')])).toBeNull();
  });
});
