export type MeasureUnit = 'mm' | 'cm' | 'µm' | 'in';

export interface ScaleCalibration {
  pixelsPerUnit: number;
  unit: MeasureUnit;
  knownLength?: number;
  pixelLength?: number;
}

export function parseMeasureUnit(value: unknown): MeasureUnit | null {
  if (value === 'mm' || value === 'cm' || value === 'µm' || value === 'in') return value;
  if (value === 'um' || value === 'micron' || value === 'microns') return 'µm';
  return null;
}

export function parseScaleCalibration(value: unknown): ScaleCalibration | null {
  if (!value || typeof value !== 'object') return null;
  const rec = value as Record<string, unknown>;
  const pixelsPerUnit = Number(rec.pixelsPerUnit);
  const unit = parseMeasureUnit(rec.unit);
  if (!Number.isFinite(pixelsPerUnit) || pixelsPerUnit <= 0 || !unit) return null;
  const next: ScaleCalibration = { pixelsPerUnit, unit };
  const knownLength = Number(rec.knownLength);
  const pixelLength = Number(rec.pixelLength);
  if (Number.isFinite(knownLength) && knownLength > 0) next.knownLength = knownLength;
  if (Number.isFinite(pixelLength) && pixelLength > 0) next.pixelLength = pixelLength;
  return next;
}
