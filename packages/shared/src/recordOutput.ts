export type RecordOutputKind = 'geotiff' | 'neural' | 'tiles';

export interface RecordOutputBadgeInfo {
  label: string;
  title: string;
  kind: RecordOutputKind;
}

export interface RecordOutputSource {
  status?: string;
  outputType?: string | null;
  format?: string | null;
  tileSize?: number | null;
  tiffUrl?: string | null;
  folderUrl?: string | null;
}

const TILE_FORMAT_LABELS: Record<string, string> = {
  jpg: 'JPG',
  jpeg: 'JPG',
  png: 'PNG',
  webp: 'WebP',
};

export function normalizeTileFormatLabel(format: string | null | undefined): string {
  const key = String(format || 'jpg').toLowerCase().trim();
  return TILE_FORMAT_LABELS[key] || key.toUpperCase();
}

export function resolveRecordOutputType(record: RecordOutputSource): string | null {
  if (record.outputType) return record.outputType;
  if (record.tiffUrl) return 'geotiff';
  if (record.folderUrl) return 'tiles';
  return null;
}

export function getRecordOutputBadge(record: RecordOutputSource): RecordOutputBadgeInfo | null {
  const outputType = resolveRecordOutputType(record);
  if (!outputType) return null;

  const hasAssets = !!record.folderUrl || !!record.tiffUrl;
  const status = record.status || '';
  const showForStatus = status === 'done' || status === 'processing' || status === 'error';
  if (!hasAssets && !showForStatus) return null;

  if (outputType === 'neural') {
    return {
      label: 'Neural GeoTIFF',
      title: 'Neural RTI packaged as pyramidal GeoTIFF',
      kind: 'neural',
    };
  }

  if (outputType === 'geotiff') {
    return {
      label: 'GeoTIFF',
      title: 'Single pyramidal GeoTIFF for the modern viewer',
      kind: 'geotiff',
    };
  }

  const formatLabel = normalizeTileFormatLabel(record.format);
  const tileSize = record.tileSize ? `${record.tileSize}px tiles` : 'tile folder';
  return {
    label: `Tiles · ${formatLabel}`,
    title: `Legacy tile folder (${formatLabel}, ${tileSize})`,
    kind: 'tiles',
  };
}

export function recordOutputBadgeClass(kind: RecordOutputKind): string {
  switch (kind) {
    case 'neural':
      return 'bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-500/30';
    case 'geotiff':
      return 'bg-sky-100 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30';
    default:
      return 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30';
  }
}
