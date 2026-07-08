export const DEFAULT_ANNOTATION_COLOR = '#f59e0b';

export const ANNOTATION_COLOR_PRESETS = [
  '#f59e0b',
  '#ef4444',
  '#22c55e',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
  '#64748b',
] as const;

export function normalizeAnnotationColor(color: string | null | undefined): string {
  if (!color) return DEFAULT_ANNOTATION_COLOR;
  const trimmed = color.trim();
  return ANNOTATION_COLOR_PRESETS.includes(trimmed as (typeof ANNOTATION_COLOR_PRESETS)[number])
    || /^#[0-9a-fA-F]{6}$/.test(trimmed)
    ? trimmed
    : DEFAULT_ANNOTATION_COLOR;
}

export function loadStoredAnnotationColor(): string {
  try {
    return normalizeAnnotationColor(localStorage.getItem('rtiAnnotationColor'));
  } catch {
    return DEFAULT_ANNOTATION_COLOR;
  }
}

export function storeAnnotationColor(color: string): void {
  try {
    localStorage.setItem('rtiAnnotationColor', normalizeAnnotationColor(color));
  } catch {
    // ignore storage errors
  }
}
