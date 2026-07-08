import type { AnnotationGeometry } from '../annotations.js';

export interface AnnotationRtiView {
  lightDir: { x: number; y: number; z: number };
  renderMode: number;
  specularExponent: number;
  colorGain: { r: number; g: number; b: number };
  camera: { cx: number; cy: number; zoom: number; targetX: number; targetY: number };
}

export interface RecordAnnotation {
  id: number;
  type: string;
  geometry: AnnotationGeometry;
  label: string | null;
  color: string | null;
  rtiView: AnnotationRtiView;
  source?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AnnotationUpdateResponse {
  success: true;
  updatedAt: string;
}

export interface CreateAnnotationPayload {
  type: string;
  geometry: AnnotationGeometry;
  label?: string | null;
  color?: string;
  rtiView: AnnotationRtiView;
}

export interface UpdateAnnotationPayload {
  label?: string | null;
  color?: string;
}
