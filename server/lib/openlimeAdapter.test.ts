import { describe, expect, it } from 'vitest';
import {
  convertToOpenLimeInfo,
  deepZoomTileToNodeId,
} from './openlimeAdapter.js';

const tree512Descriptor = {
  format: 'jpg',
  content: {
    type: 'HSH_RTI',
    width: 512,
    height: 512,
    coefficients: 4,
    scale: [1, 1, 1, 1],
    bias: [0, 0, 0, 0],
  },
  tree: {
    tileSize: 256,
    maxSize: 512,
    nodes: [
      {
        id: 1,
        level: 0,
        gridX: 0,
        gridY: 0,
        valid: true,
        normalizeBox: { left: 0, top: 0, right: 1, bottom: 1 },
      },
      {
        id: 2,
        level: 1,
        gridX: 0,
        gridY: 0,
        valid: true,
        normalizeBox: { left: 0, top: 0.5, right: 0.5, bottom: 1 },
      },
      {
        id: 3,
        level: 1,
        gridX: 1,
        gridY: 0,
        valid: true,
        normalizeBox: { left: 0.5, top: 0.5, right: 1, bottom: 1 },
      },
      {
        id: 4,
        level: 1,
        gridX: 0,
        gridY: 1,
        valid: true,
        normalizeBox: { left: 0, top: 0, right: 0.5, bottom: 0.5 },
      },
      {
        id: 5,
        level: 1,
        gridX: 1,
        gridY: 1,
        valid: true,
        normalizeBox: { left: 0.5, top: 0, right: 1, bottom: 0.5 },
      },
    ],
  },
};

describe('convertToOpenLimeInfo', () => {
  it('expands HSH scale and bias to one value per plane', () => {
    const info = convertToOpenLimeInfo({
      format: 'jpg',
      content: {
        type: 'HSH_RTI',
        width: 1024,
        height: 768,
        coefficients: 9,
        scale: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        bias: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
      },
      tree: { tileSize: 256, maxSize: 1024 },
    });

    expect(info.nplanes).toBe(27);
    expect(info.materials[0].scale).toHaveLength(27);
    expect(info.materials[0].bias).toHaveLength(27);
    expect(info.materials[0].scale.slice(0, 3)).toEqual([1, 1, 1]);
    expect(info.materials[0].scale.slice(3, 6)).toEqual([2, 2, 2]);
  });

  it('keeps already-expanded material arrays unchanged', () => {
    const scale = Array.from({ length: 18 }, (_, index) => index + 1);
    const bias = Array.from({ length: 18 }, (_, index) => index / 10);

    const info = convertToOpenLimeInfo({
      format: 'jpg',
      content: {
        type: 'RGB_PTM',
        width: 512,
        height: 512,
        coefficients: 6,
        scale,
        bias,
      },
    });

    expect(info.nplanes).toBe(18);
    expect(info.materials[0].scale).toEqual(scale);
    expect(info.materials[0].bias).toEqual(bias);
  });
});

describe('deepZoomTileToNodeId', () => {
  it('maps DeepZoom tiles to rtiprep node ids using normalizeBox', () => {
    expect(deepZoomTileToNodeId(1, 0, 0, tree512Descriptor)).toBe(2);
    expect(deepZoomTileToNodeId(1, 1, 0, tree512Descriptor)).toBe(3);
    expect(deepZoomTileToNodeId(1, 0, 1, tree512Descriptor)).toBe(4);
    expect(deepZoomTileToNodeId(1, 1, 1, tree512Descriptor)).toBe(5);
    expect(deepZoomTileToNodeId(0, 0, 0, tree512Descriptor)).toBe(1);
  });

  it('maps padded-canvas tiles for large non-square images', () => {
    const descriptor = {
      format: 'jpg',
      content: {
        type: 'HSH_RTI',
        width: 8256,
        height: 5504,
        coefficients: 4,
      },
      tree: {
        tileSize: 256,
        maxSize: 16384,
        nodes: [
          {
            id: 42,
            level: 2,
            gridX: 2,
            gridY: 1,
            valid: true,
            normalizeBox: { left: 0.5, top: 0.5, right: 0.75, bottom: 0.75 },
          },
        ],
      },
    };

    expect(deepZoomTileToNodeId(2, 1, 0, descriptor)).toBe(42);
  });
});
