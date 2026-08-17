import { describe, expect, it } from 'vitest';
import { canListRecordAnnotations } from './annotationQueries.js';
import type { DbRecord } from '../types/index.js';

describe('canListRecordAnnotations', () => {
  const publishedRecord = { isPublished: 1 } as DbRecord;
  const draftRecord = { isPublished: 0 } as DbRecord;

  it('allows guests on published records', () => {
    expect(canListRecordAnnotations(undefined, publishedRecord)).toBe(true);
  });

  it('denies guests on draft records', () => {
    expect(canListRecordAnnotations(undefined, draftRecord)).toBe(false);
  });

  it('allows staff on draft records', () => {
    expect(canListRecordAnnotations({
      id: 1,
      username: 'admin',
      role: 'admin',
      permissions: [],
    }, draftRecord)).toBe(true);
  });
});
