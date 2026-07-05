import path from 'path';
import { fileURLToPath } from 'url';
import { env, pipeline, RawImage } from '@huggingface/transformers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CLIP_MODEL = 'Xenova/clip-vit-base-patch32';

env.cacheDir = process.env.TRANSFORMERS_CACHE || path.join(__dirname, '..', 'data', 'transformers-cache');

let extractorPromise = null;

function getExtractor() {
  if (!extractorPromise) {
    extractorPromise = pipeline('image-feature-extraction', CLIP_MODEL);
  }
  return extractorPromise;
}

/** L2-normalize a vector (for cosine similarity via dot product). */
export function normalizeVector(values) {
  let norm = 0;
  for (let i = 0; i < values.length; i++) norm += values[i] * values[i];
  norm = Math.sqrt(norm) || 1;
  const out = new Array(values.length);
  for (let i = 0; i < values.length; i++) out[i] = values[i] / norm;
  return out;
}

/** Compute a 512-d CLIP embedding from a local image file path. */
export async function computeImageEmbedding(imagePath) {
  const extractor = await getExtractor();
  const image = await RawImage.read(imagePath);
  const output = await extractor(image);
  return normalizeVector(output.data);
}

/** Cosine similarity for L2-normalized vectors (returns 0–1 for typical CLIP matches). */
export function cosineSimilarity(a, b) {
  if (!a || !b || a.length !== b.length) return 0;
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot;
}

/** Pre-download CLIP weights (Docker build / maintenance). */
export async function warmupClipModel() {
  await getExtractor();
}
