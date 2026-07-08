import sharp from 'sharp';
import { pipeline } from '@huggingface/transformers';
import { getConfig } from '../config.js';
import { configureTransformersCache } from './transformersEnv.js';
import { normalizeMetadata } from './metadataFields.js';
import type { RectangleGeometry } from './annotations.js';
import type { RecordMetadata } from '../types/index.js';

configureTransformersCache();
const config = getConfig();
const OWL_MODEL = config.autoAnnotateModel;
const DETECTION_THRESHOLD = config.autoAnnotateThreshold;
const AI_COLOR = '#8b5cf6';

/** Seal / relief oriented prompts for zero-shot detection. */
const CANDIDATE_LABELS = [
  'human figure',
  'animal figure',
  'winged creature',
  'symbol',
  'inscription',
  'seal impression',
  'relief carving',
  'cuneiform sign',
];

export interface AnnotationRtiView {
  lightDir: { x: number; y: number; z: number };
  renderMode: number;
  specularExponent: number;
  colorGain: { r: number; g: number; b: number };
  camera: { cx: number; cy: number; zoom: number; targetX: number; targetY: number };
}

export const DEFAULT_ANNOTATION_RTI_VIEW: AnnotationRtiView = {
  lightDir: { x: 0, y: 0, z: 1 },
  renderMode: 0,
  specularExponent: 10,
  colorGain: { r: 1, g: 1, b: 1 },
  camera: { cx: 0, cy: 0, zoom: 1, targetX: 0, targetY: 0 },
};

export type AutoAnnotatePhase = 'loading' | 'detecting' | 'metadata';

export interface ProposedAnnotation {
  type: 'rectangle';
  geometry: RectangleGeometry;
  label: string;
  color: string;
  rtiView: AnnotationRtiView;
  method: 'owlvit' | 'metadata';
  score: number;
}

export interface AutoAnnotateProposal {
  annotations: ProposedAnnotation[];
  methods: string[];
  model: string;
  imageSize: { width: number; height: number };
  detectionCount: number;
}

interface OwlDetectionBox {
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
}

interface OwlDetectionHit {
  box: OwlDetectionBox;
  label: string;
  score: number;
}

type ZeroShotDetector = (
  imagePath: string,
  labels: string[],
  options: { threshold: number; top_k: number },
) => Promise<OwlDetectionHit[]>;

let detectorPromise: Promise<ZeroShotDetector> | null = null;

function getDetector(): Promise<ZeroShotDetector> {
  if (!detectorPromise) {
    detectorPromise = pipeline('zero-shot-object-detection', OWL_MODEL) as Promise<ZeroShotDetector>;
  }
  return detectorPromise;
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function boxToRectangle(box: OwlDetectionBox, width: number, height: number): RectangleGeometry | null {
  const x1 = clamp01(box.xmin / width);
  const y1 = clamp01(box.ymin / height);
  const x2 = clamp01(box.xmax / width);
  const y2 = clamp01(box.ymax / height);
  if (x2 - x1 < 0.02 || y2 - y1 < 0.02) return null;
  return { x1, y1, x2, y2 };
}

function formatAiLabel(text: string, score: number, method: ProposedAnnotation['method']): string {
  const pct = Math.round(score * 100);
  const prefix = method === 'metadata' ? '[AI · catalog]' : '[AI]';
  return `${prefix} ${text}${score > 0 ? ` (${pct}%)` : ''}`;
}

function metadataContext(metadata: RecordMetadata): string {
  const meta = normalizeMetadata(metadata);
  const parts = [
    meta.primaryMotif,
    meta.motifDescription,
    meta.culturalPeriod,
    meta.siteGeographicLocation,
    meta.objectType,
  ].filter(Boolean);
  return parts.join(' · ');
}

function buildMetadataFallback(metadata: RecordMetadata): ProposedAnnotation[] {
  const context = metadataContext(metadata);
  if (!context) return [];

  return [{
    type: 'rectangle',
    geometry: { x1: 0.12, y1: 0.12, x2: 0.88, y2: 0.88 },
    label: formatAiLabel(context.slice(0, 180), 0, 'metadata'),
    color: AI_COLOR,
    rtiView: DEFAULT_ANNOTATION_RTI_VIEW,
    method: 'metadata',
    score: 0,
  }];
}

function dedupeDetections(detections: ProposedAnnotation[]): ProposedAnnotation[] {
  const kept: ProposedAnnotation[] = [];
  for (const det of detections.sort((a, b) => b.score - a.score)) {
    const overlaps = kept.some((other) => iou(det.geometry, other.geometry) > 0.45);
    if (!overlaps) kept.push(det);
  }
  return kept.slice(0, 8);
}

function iou(a: RectangleGeometry, b: RectangleGeometry): number {
  const ix1 = Math.max(a.x1, b.x1);
  const iy1 = Math.max(a.y1, b.y1);
  const ix2 = Math.min(a.x2, b.x2);
  const iy2 = Math.min(a.y2, b.y2);
  const inter = Math.max(0, ix2 - ix1) * Math.max(0, iy2 - iy1);
  const areaA = (a.x2 - a.x1) * (a.y2 - a.y1);
  const areaB = (b.x2 - b.x1) * (b.y2 - b.y1);
  const union = areaA + areaB - inter;
  return union > 0 ? inter / union : 0;
}

export interface ProposeAutoAnnotationsOptions {
  onProgress?: (phase: AutoAnnotatePhase) => void;
}

/**
 * Run OWL-ViT zero-shot detection on a thumbnail, with metadata fallback.
 */
export async function proposeAutoAnnotations(
  imagePath: string,
  metadata: RecordMetadata | null | undefined = {},
  { onProgress }: ProposeAutoAnnotationsOptions = {},
): Promise<AutoAnnotateProposal> {
  onProgress?.('loading');
  const meta = await sharp(imagePath).metadata();
  const width = meta.width || 1;
  const height = meta.height || 1;

  onProgress?.('detecting');
  const detector = await getDetector();
  const raw = await detector(imagePath, CANDIDATE_LABELS, {
    threshold: DETECTION_THRESHOLD,
    top_k: 10,
  });

  const detections: ProposedAnnotation[] = [];
  for (const hit of raw || []) {
    const geometry = boxToRectangle(hit.box, width, height);
    if (!geometry) continue;
    detections.push({
      type: 'rectangle',
      geometry,
      label: formatAiLabel(hit.label, hit.score, 'owlvit'),
      color: AI_COLOR,
      rtiView: DEFAULT_ANNOTATION_RTI_VIEW,
      method: 'owlvit',
      score: hit.score,
    });
  }

  let annotations = dedupeDetections(detections);
  const methods: string[] = annotations.length ? ['owlvit'] : [];

  if (annotations.length === 0) {
    onProgress?.('metadata');
    annotations = buildMetadataFallback(metadata ?? {});
    if (annotations.length) methods.push('metadata');
  }

  return {
    annotations,
    methods,
    model: OWL_MODEL,
    imageSize: { width, height },
    detectionCount: detections.length,
  };
}

export async function warmupAutoAnnotateModel(): Promise<void> {
  await getDetector();
}
