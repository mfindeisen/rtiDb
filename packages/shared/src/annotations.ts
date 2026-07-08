/** Annotation type validation for record_annotations API. */

export const ANNOTATION_TYPES = ['point', 'circle', 'rectangle'] as const;
export type AnnotationType = (typeof ANNOTATION_TYPES)[number];

export interface PointGeometry {
  position?: [number, number];
  center?: [number, number];
}

export interface CircleGeometry {
  center: [number, number];
  radius: number;
}

export interface RectangleGeometry {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export type AnnotationGeometry = PointGeometry | CircleGeometry | RectangleGeometry;

export interface AnnotationBody {
  type: string;
  geometry: unknown;
}

export function validateAnnotationBody({ type, geometry }: AnnotationBody): string | null {
  if (!ANNOTATION_TYPES.includes(type as AnnotationType)) {
    return `Unsupported annotation type. Allowed: ${ANNOTATION_TYPES.join(', ')}`;
  }
  if (!geometry || typeof geometry !== 'object') {
    return 'geometry is required';
  }

  if (type === 'point') {
    const geo = geometry as PointGeometry;
    const pos = geo.position ?? geo.center;
    if (!Array.isArray(pos) || pos.length < 2) {
      return 'Point geometry requires position [x, y]';
    }
    return null;
  }

  if (type === 'circle') {
    const geo = geometry as CircleGeometry;
    if (!Array.isArray(geo.center) || geo.center.length < 2) {
      return 'Circle geometry requires center [x, y]';
    }
    if (typeof geo.radius !== 'number' || geo.radius <= 0) {
      return 'Circle geometry requires a positive radius';
    }
    return null;
  }

  if (type === 'rectangle') {
    const geo = geometry as RectangleGeometry;
    const keys: (keyof RectangleGeometry)[] = ['x1', 'y1', 'x2', 'y2'];
    for (const k of keys) {
      if (typeof geo[k] !== 'number') {
        return 'Rectangle geometry requires x1, y1, x2, y2';
      }
    }
    return null;
  }

  return 'Invalid annotation type';
}
