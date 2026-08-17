import { describe, expect, it } from 'vitest';
import { sanitizeUploadFilename } from './uploads.js';

describe('sanitizeUploadFilename', () => {
  it('keeps a simple basename and lowercases the extension', () => {
    expect(sanitizeUploadFilename('seal.PTM')).toBe('seal.ptm');
  });

  it('strips path traversal and control characters', () => {
    expect(sanitizeUploadFilename('..\\..\\etc\\passwd')).toBe('passwd');
    expect(sanitizeUploadFilename('ok\0.exe.ptm')).toBe('ok.exe.ptm');
  });

  it('replaces unsafe characters and falls back when empty', () => {
    expect(sanitizeUploadFilename('a b/c*.rti')).toBe('c_.rti');
    expect(sanitizeUploadFilename('')).toBe('upload');
    expect(sanitizeUploadFilename('???', '.jpg')).toBe('upload.jpg');
  });
});
