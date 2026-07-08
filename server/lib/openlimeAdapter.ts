import fs from 'fs/promises';
import path from 'path';

interface RtiDbContent {
  type?: string;
  width?: number;
  height?: number;
  coefficients?: number;
  scale?: number[];
  bias?: number[];
}

interface NormalizeBox {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface TreeNode {
  id: number;
  level: number;
  gridX: number;
  gridY: number;
  valid: boolean;
  normalizeBox?: NormalizeBox;
}

interface RtiDbDescriptor {
  format?: string;
  content?: RtiDbContent;
  tree?: { tileSize?: number; maxSize?: number; nodes?: TreeNode[] };
}

const TYPE_MAP: Record<string, string> = {
  HSH_RTI: 'hsh',
  HSH: 'hsh',
  LRGB_PTM: 'ptm',
  RGB_PTM: 'ptm',
  IMAGE: 'ptm',
};

/** Match OpenLIME's DeepZoom level count for an image. */
export function openLimeLevelCount(width: number, height: number, tileSize: number): number {
  const max = Math.max(width, height) / tileSize;
  return Math.ceil(Math.log(max) / Math.LN2) + 1;
}

/** Convert a DeepZoom tile center to padded-canvas normalized coordinates. */
export function deepZoomTileCenter(
  level: number,
  x: number,
  y: number,
  width: number,
  height: number,
  tileSize: number,
  maxSize: number,
): { normX: number; normY: number } {
  const nlevels = openLimeLevelCount(width, height, tileSize);
  const ilevel = nlevels - 1 - level;
  const side = tileSize * (1 << ilevel);
  const centerPx = Math.min(side * x + side / 2, Math.max(width - 0.5, 0));
  const centerPy = Math.min(side * y + side / 2, Math.max(height - 0.5, 0));
  const woffset = (maxSize - width) / 2;
  const hoffset = (maxSize - height) / 2;

  return {
    normX: (woffset + centerPx) / maxSize,
    normY: 1 - (hoffset + centerPy) / maxSize,
  };
}

function nodeContainsPoint(node: TreeNode, normX: number, normY: number): boolean {
  const box = node.normalizeBox;
  if (!box) return false;
  return (
    normX >= box.left &&
    normX <= box.right &&
    normY >= box.top &&
    normY <= box.bottom
  );
}

function deepZoomTileGrid(
  level: number,
  normX: number,
  normY: number,
): { gridX: number; gridY: number } {
  const gridSize = 1 << level;
  const gridX = Math.min(gridSize - 1, Math.max(0, Math.floor(normX * gridSize)));
  const gridY = Math.min(gridSize - 1, Math.max(0, gridSize - 1 - Math.floor(normY * gridSize)));
  return { gridX, gridY };
}

function nodeArea(node: TreeNode): number {
  const box = node.normalizeBox;
  if (!box) return Number.POSITIVE_INFINITY;
  return Math.max(0, box.right - box.left) * Math.max(0, box.bottom - box.top);
}

function pickNode(
  nodes: TreeNode[],
  level: number,
  normX: number,
  normY: number,
): TreeNode | undefined {
  const validNodes = nodes.filter((node) => node.valid !== false);
  const { gridX, gridY } = deepZoomTileGrid(level, normX, normY);

  const atLevelAndGrid = validNodes.find(
    (node) => node.level === level && node.gridX === gridX && node.gridY === gridY,
  );
  if (atLevelAndGrid) return atLevelAndGrid;

  const atLevelByBox = validNodes.find(
    (node) => node.level === level && nodeContainsPoint(node, normX, normY),
  );
  if (atLevelByBox) return atLevelByBox;

  const containing = validNodes
    .filter((node) => nodeContainsPoint(node, normX, normY))
    .sort((a, b) => nodeArea(a) - nodeArea(b));
  if (containing.length) return containing[0];

  return validNodes.find(
    (node) => node.level === level && node.gridX === gridX && node.gridY === gridY,
  );
}

/** OpenLIME stores one scalar per RGB channel; rtiprep stores one per coefficient image. */
function expandMaterialScalars(values: number[], nplanes: number): number[] {
  if (values.length === nplanes) return values;
  if (values.length > 0 && values.length * 3 === nplanes) {
    const expanded: number[] = [];
    for (const value of values) {
      expanded.push(value, value, value);
    }
    return expanded;
  }

  const fallback = values.length ? values[values.length - 1] : 1;
  const padded = [...values];
  while (padded.length < nplanes) padded.push(fallback);
  return padded.slice(0, nplanes);
}

function openLimePlaneCount(content: RtiDbContent, rtiType: string): number {
  const coefficients = content.coefficients ?? 9;
  if (rtiType === 'hsh' || rtiType === 'ptm') {
    return coefficients * 3;
  }
  return coefficients;
}

export function deepZoomTileToNodeId(
  level: number,
  x: number,
  y: number,
  descriptor: RtiDbDescriptor,
): number | null {
  const content = descriptor.content ?? {};
  const width = content.width ?? 0;
  const height = content.height ?? 0;
  const tileSize = descriptor.tree?.tileSize ?? 256;
  const maxSize = descriptor.tree?.maxSize ?? 0;
  const nodes = descriptor.tree?.nodes ?? [];

  if (!width || !height || !maxSize || !nodes.length) {
    return null;
  }

  const { normX, normY } = deepZoomTileCenter(level, x, y, width, height, tileSize, maxSize);
  return pickNode(nodes, level, normX, normY)?.id ?? null;
}

export function convertToOpenLimeInfo(descriptor: RtiDbDescriptor) {
  const content = descriptor.content ?? {};
  const width = content.width ?? 0;
  const height = content.height ?? 0;
  const format = descriptor.format ?? 'jpg';
  const rtiType = TYPE_MAP[String(content.type ?? 'HSH_RTI')] ?? 'hsh';
  const nplanes = openLimePlaneCount(content, rtiType);

  return {
    width,
    height,
    format,
    type: rtiType,
    colorspace: 'rgb',
    nplanes,
    materials: [
      {
        scale: expandMaterialScalars(content.scale ?? [], nplanes),
        bias: expandMaterialScalars(content.bias ?? [], nplanes),
      },
    ],
  };
}

export function buildDeepZoomXml(width: number, height: number, tileSize: number, format: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Image TileSize="${tileSize}" Overlap="0" Format="${format}" xmlns="http://schemas.microsoft.com/deepzoom/2008">
  <Size Width="${width}" Height="${height}"/>
</Image>`;
}

export async function readRtiDescriptor(folderPath: string): Promise<RtiDbDescriptor> {
  const jsonPath = path.join(folderPath, 'info.json');
  const raw = await fs.readFile(jsonPath, 'utf8');
  return JSON.parse(raw) as RtiDbDescriptor;
}

export function planeCount(nplanes: number): number {
  return Math.ceil(nplanes / 3);
}

export function tileFilePath(folderPath: string, nodeId: number, plane: number, format: string): string {
  return path.join(folderPath, `${nodeId}_${plane + 1}.${format}`);
}
