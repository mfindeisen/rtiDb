import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { env, pipeline } from '@huggingface/transformers';
import { normalizeMetadata } from './metadataFields.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OWL_MODEL = process.env.AUTO_ANNOTATE_MODEL || 'Xenova/owlvit-base-patch32';
const DETECTION_THRESHOLD = Number(process.env.AUTO_ANNOTATE_THRESHOLD) || 0.08;
const AI_COLOR = '#8b5cf6';

env.cacheDir = process.env.TRANSFORMERS_CACHE || path.join(__dirname, '..', 'data', 'transformers-cache');

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

export const DEFAULT_ANNOTATION_RTI_VIEW = {
  lightDir: { x: 0, y: 0, z: 1 },
  renderMode: 0,
  specularExponent: 10,
  colorGain: { r: 1, g: 1, b: 1 },
  camera: { cx: 0, cy: 0, zoom: 1, targetX: 0, targetY: 0 },
};

let detectorPromise = null;

function getDetector() {
  if (!detectorPromise) {
    detectorPromise = pipeline('zero-shot-object-detection', OWL_MODEL);
  }
  return detectorPromise;
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function boxToRectangle(box, width, height) {
  const x1 = clamp01(box.xmin / width);
  const y1 = clamp01(box.ymin / height);
  const x2 = clamp01(box.xmax / width);
  const y2 = clamp01(box.ymax / height);
  if (x2 - x1 < 0.02 || y2 - y1 < 0.02) return null;
  return { x1, y1, x2, y2 };
}

function formatAiLabel(text, score, method) {
  const pct = Math.round(score * 100);
  const prefix = method === 'metadata' ? '[AI · catalog]' : '[AI]';
  return `${prefix} ${text}${score > 0 ? ` (${pct}%)` : ''}`;
}

function metadataContext(metadata) {
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

function buildMetadataFallback(metadata) {
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

function dedupeDetections(detections) {
  const kept = [];
  for (const det of detections.sort((a, b) => b.score - a.score)) {
    const overlaps = kept.some((other) => iou(det.geometry, other.geometry) > 0.45);
    if (!overlaps) kept.push(det);
  }
  return kept.slice(0, 8);
}

function iou(a, b) {
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

/**
 * Run OWL-ViT zero-shot detection on a thumbnail, with metadata fallback.
 * @returns {Promise<{ annotations: object[], methods: string[], model: string, imageSize: { width, height } }>}
 */
export async function proposeAutoAnnotations(imagePath, metadata = {}, { onProgress } = {}) {
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

  const detections = [];
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
  const methods = annotations.length ? ['owlvit'] : [];

  if (annotations.length === 0) {
    onProgress?.('metadata');
    annotations = buildMetadataFallback(metadata);
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

export async function warmupAutoAnnotateModel() {
  await getDetector();
}
