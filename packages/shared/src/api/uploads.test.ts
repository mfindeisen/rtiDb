import { describe, expect, it } from 'vitest';
import { chunkRanges, UPLOAD_CHUNK_SIZE_BYTES } from './uploads.js';

describe('chunkRanges', () => {
  it('returns no ranges for an empty file', () => {
    expect(chunkRanges(0)).toEqual([]);
  });

  it('keeps a small file as a single chunk', () => {
    expect(chunkRanges(1200, 8 * 1024 * 1024)).toEqual([{ offset: 0, length: 1200 }]);
  });

  it('splits a large file into 8 MiB pieces', () => {
    const size = UPLOAD_CHUNK_SIZE_BYTES * 2 + 100;
    expect(chunkRanges(size)).toEqual([
      { offset: 0, length: UPLOAD_CHUNK_SIZE_BYTES },
      { offset: UPLOAD_CHUNK_SIZE_BYTES, length: UPLOAD_CHUNK_SIZE_BYTES },
      { offset: UPLOAD_CHUNK_SIZE_BYTES * 2, length: 100 },
    ]);
  });
});
