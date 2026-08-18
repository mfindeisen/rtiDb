import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_ANNOTATION_COLOR,
  hexToHsv,
  hsvToHex,
  isPresetAnnotationColor,
  loadStoredAnnotationColor,
  storeAnnotationColor,
} from './annotationColors.js';

describe('annotationColors', () => {
  const storage = new Map<string, string>();

  beforeEach(() => {
    storage.clear();
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => {
        storage.set(key, value);
      },
      removeItem: (key: string) => {
        storage.delete(key);
      },
      clear: () => {
        storage.clear();
      },
    });
  });

  it('migrates the legacy viewer storage key', () => {
    storage.set('annotationColor', '#3b82f6');
    expect(loadStoredAnnotationColor()).toBe('#3b82f6');
    expect(storage.get('rtiAnnotationColor')).toBe('#3b82f6');
    expect(storage.has('annotationColor')).toBe(false);
  });

  it('falls back to the default for unknown colors', () => {
    storeAnnotationColor('#123456');
    expect(loadStoredAnnotationColor()).toBe('#123456');
    storeAnnotationColor('not-a-color');
    expect(loadStoredAnnotationColor()).toBe(DEFAULT_ANNOTATION_COLOR);
  });

  it('round-trips primary HSV colors', () => {
    expect(hsvToHex(0, 1, 1)).toBe('#ff0000');
    expect(hexToHsv('#00ff00').h).toBe(120);
    expect(isPresetAnnotationColor('#ec4899')).toBe(true);
    expect(isPresetAnnotationColor('#abcdef')).toBe(false);
  });
});
