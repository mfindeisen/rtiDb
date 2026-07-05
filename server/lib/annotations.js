/** Annotation type validation for record_annotations API. */

export const ANNOTATION_TYPES = ['point', 'circle', 'rectangle'];

export function validateAnnotationBody({ type, geometry }) {
  if (!ANNOTATION_TYPES.includes(type)) {
    return `Unsupported annotation type. Allowed: ${ANNOTATION_TYPES.join(', ')}`;
  }
  if (!geometry || typeof geometry !== 'object') {
    return 'geometry is required';
  }

  if (type === 'point') {
    const pos = geometry.position ?? geometry.center;
    if (!Array.isArray(pos) || pos.length < 2) {
      return 'Point geometry requires position [x, y]';
    }
    return null;
  }

  if (type === 'circle') {
    if (!Array.isArray(geometry.center) || geometry.center.length < 2) {
      return 'Circle geometry requires center [x, y]';
    }
    if (typeof geometry.radius !== 'number' || geometry.radius <= 0) {
      return 'Circle geometry requires a positive radius';
    }
    return null;
  }

  if (type === 'rectangle') {
    const keys = ['x1', 'y1', 'x2', 'y2'];
    for (const k of keys) {
      if (typeof geometry[k] !== 'number') {
        return 'Rectangle geometry requires x1, y1, x2, y2';
      }
    }
    return null;
  }

  return 'Invalid annotation type';
}
