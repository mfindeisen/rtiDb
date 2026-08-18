import { describe, expect, it } from 'vitest';
import { parseScaleCalibration } from './scaleCalibration.js';

describe('parseScaleCalibration', () => {
  it('accepts a valid pixels-per-unit payload', () => {
    expect(parseScaleCalibration({ pixelsPerUnit: 20, unit: 'mm', knownLength: 10, pixelLength: 200 })).toEqual({
      pixelsPerUnit: 20,
      unit: 'mm',
      knownLength: 10,
      pixelLength: 200,
    });
  });

  it('rejects invalid payloads', () => {
    expect(parseScaleCalibration(null)).toBeNull();
    expect(parseScaleCalibration({ pixelsPerUnit: 0, unit: 'mm' })).toBeNull();
    expect(parseScaleCalibration({ pixelsPerUnit: 10, unit: 'yards' })).toBeNull();
  });
});
