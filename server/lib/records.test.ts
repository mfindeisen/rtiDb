import { describe, expect, it } from 'vitest';
import { coerceFilterValue, parseMetadataFiltersFromQuery, toClientRecordRow, metadataWithPublishStatus } from './records.js';
import type { DbRecord } from '../types/index.js';

describe('coerceFilterValue', () => {
  it('keeps strings and stringifies numbers', () => {
    expect(coerceFilterValue('lion')).toBe('lion');
    expect(coerceFilterValue(2024)).toBe('2024');
    expect(coerceFilterValue(true)).toBe('true');
  });

  it('rejects objects and arrays', () => {
    expect(coerceFilterValue({ x: 1 })).toBeNull();
    expect(coerceFilterValue(['lion'])).toBeNull();
  });
});

describe('parseMetadataFiltersFromQuery', () => {
  it('does not copy nested JSON objects into filters', () => {
    const filters = parseMetadataFiltersFromQuery({
      filters: JSON.stringify({ primaryMotif: 'lion', nested: { x: 1 }, year: 7 }),
    });
    expect(filters.primaryMotif).toBe('lion');
    expect(filters.year).toBe('7');
    expect(filters.nested).toBeUndefined();
  });
});

describe('toClientRecordRow', () => {
  it('omits original paths and embeddings', () => {
    const record = {
      id: 1,
      slug: 'seal',
      name: 'Seal',
      description: '',
      date: '2024-01-01',
      status: 'done',
      progress: 100,
      message: null,
      direction: 'ltr',
      outputType: 'tiles',
      folderUrl: '/uploads/seal',
      tiffUrl: null,
      thumbnailUrl: '/uploads/seal/thumb.jpg',
      imageEmbedding: [0.1, 0.2],
      isPublished: 1,
      originalFilePath: '/secret/file.ptm',
      weightsFilePath: '/secret/weights.npz',
      quality: 90,
      tileSize: 256,
      format: 'jpg',
      metadata: { primaryMotif: 'lion' },
    } as unknown as DbRecord;

    const row = toClientRecordRow(record) as unknown as Record<string, unknown>;
    expect(row.folderUrl).toBe('/uploads/seal');
    expect(row.thumbnailUrl).toBe('/uploads/seal/thumb.jpg');
    expect(row.originalFilePath).toBeUndefined();
    expect(row.weightsFilePath).toBeUndefined();
    expect(row.imageEmbedding).toBeUndefined();
    expect(row.metadata).toMatchObject({ primaryMotif: 'lion' });
    expect(row.recordTypeId).toBeNull();
    expect(row.recordTypeName).toBeNull();
  });
});

describe('metadataWithPublishStatus', () => {
  it('sets Published when publishing and Draft when unpublishing a published record', () => {
    expect(metadataWithPublishStatus({ recordStatus: 'Draft' }, true).recordStatus).toBe('Published');
    expect(metadataWithPublishStatus({ recordStatus: 'Published' }, false).recordStatus).toBe('Draft');
  });

  it('leaves Under Review alone when unpublishing', () => {
    expect(metadataWithPublishStatus({ recordStatus: 'Under Review' }, false).recordStatus).toBe('Under Review');
  });
});
