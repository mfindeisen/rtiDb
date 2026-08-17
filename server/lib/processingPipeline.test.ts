import { describe, expect, it } from 'vitest';
import { isPngLatentMap } from './processingPipeline.js';

describe('isPngLatentMap', () => {
  it('accepts PNG names', () => {
    expect(isPngLatentMap({ originalname: 'latent_map.png' })).toBe(true);
    expect(isPngLatentMap({ originalname: 'map.PNG', mimetype: 'image/png' })).toBe(true);
  });

  it('rejects JPEG so the 4th latent channel is not dropped', () => {
    expect(isPngLatentMap({ originalname: 'latent_map.jpg' })).toBe(false);
    expect(isPngLatentMap({ originalname: 'map.png', mimetype: 'image/jpeg' })).toBe(false);
  });
});
