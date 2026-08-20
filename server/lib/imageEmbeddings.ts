import { computeClipEmbedding, warmupVisionModel } from './vision/client.js';

export type ImageEmbedding = number[];

/** L2-normalize a vector (for cosine similarity via dot product). */
export function normalizeVector(values: ArrayLike<number>): ImageEmbedding {
  let norm = 0;
  for (let i = 0; i < values.length; i++) norm += values[i]! * values[i]!;
  norm = Math.sqrt(norm) || 1;
  const out = new Array<number>(values.length);
  for (let i = 0; i < values.length; i++) out[i] = values[i]! / norm;
  return out;
}

/** Compute a 512-d CLIP embedding from a local image file path (runs in a child process). */
export async function computeImageEmbedding(imagePath: string): Promise<ImageEmbedding> {
  return computeClipEmbedding(imagePath);
}

/** Cosine similarity for L2-normalized vectors (returns 0–1 for typical CLIP matches). */
export function cosineSimilarity(a: ImageEmbedding | null | undefined, b: ImageEmbedding | null | undefined): number {
  if (!a || !b || a.length !== b.length) return 0;
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i]! * b[i]!;
  return dot;
}

/** Pre-download CLIP weights (Docker build / maintenance). */
export async function warmupClipModel(): Promise<void> {
  await warmupVisionModel('clip');
}
