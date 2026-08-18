import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_ANNOTATION_STROKE_WIDTH,
  loadStoredAnnotationStrokeWidth,
  normalizeAnnotationStrokeWidth,
  storeAnnotationStrokeWidth,
} from './annotationStroke.js';

describe('annotationStroke', () => {
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

  it('clamps and rounds stroke widths', () => {
    expect(normalizeAnnotationStrokeWidth(undefined)).toBe(DEFAULT_ANNOTATION_STROKE_WIDTH);
    expect(normalizeAnnotationStrokeWidth('4.4')).toBe(4);
    expect(normalizeAnnotationStrokeWidth(0)).toBe(1);
    expect(normalizeAnnotationStrokeWidth(99)).toBe(12);
  });

  it('persists the last chosen width', () => {
    storeAnnotationStrokeWidth(6);
    expect(loadStoredAnnotationStrokeWidth()).toBe(6);
  });
});
