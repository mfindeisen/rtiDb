import 'sharp';
import { pipeline, RawImage } from '@huggingface/transformers';
import { env } from '@huggingface/transformers';
import path from 'path';
import { CLIP_MODEL, type OwlDetectionHit, type VisionRequest, type VisionResponse } from './protocol.js';

env.cacheDir = process.env.TRANSFORMERS_CACHE
  || path.resolve(process.cwd(), 'data', 'transformers-cache');

type FeatureExtractor = (image: RawImage) => Promise<{ data: ArrayLike<number> }>;
type ZeroShotDetector = (
  imagePath: string,
  labels: string[],
  options: { threshold: number; top_k: number },
) => Promise<OwlDetectionHit[]>;

let clipPromise: Promise<FeatureExtractor> | null = null;
const owlPromises = new Map<string, Promise<ZeroShotDetector>>();

function getClip(): Promise<FeatureExtractor> {
  if (!clipPromise) {
    clipPromise = pipeline('image-feature-extraction', CLIP_MODEL) as Promise<FeatureExtractor>;
  }
  return clipPromise;
}

function getOwl(model: string): Promise<ZeroShotDetector> {
  let pending = owlPromises.get(model);
  if (!pending) {
    pending = pipeline('zero-shot-object-detection', model) as Promise<ZeroShotDetector>;
    owlPromises.set(model, pending);
  }
  return pending;
}

function normalizeVector(values: ArrayLike<number>): number[] {
  let norm = 0;
  for (let i = 0; i < values.length; i++) norm += values[i]! * values[i]!;
  norm = Math.sqrt(norm) || 1;
  const out = new Array<number>(values.length);
  for (let i = 0; i < values.length; i++) out[i] = values[i]! / norm;
  return out;
}

async function handle(request: VisionRequest): Promise<VisionResponse> {
  try {
    if (request.op === 'clip') {
      const extractor = await getClip();
      const image = await RawImage.read(request.imagePath);
      const output = await extractor(image);
      return { id: request.id, ok: true, op: 'clip', embedding: normalizeVector(output.data) };
    }
    if (request.op === 'owlvit') {
      const detector = await getOwl(request.model);
      const detections = await detector(request.imagePath, request.labels, {
        threshold: request.threshold,
        top_k: request.topK,
      });
      return { id: request.id, ok: true, op: 'owlvit', detections: detections || [] };
    }
    if (request.target === 'clip') await getClip();
    else await getOwl(request.model || 'Xenova/owlvit-base-patch32');
    return { id: request.id, ok: true, op: 'warmup' };
  } catch (err) {
    return {
      id: request.id,
      ok: false,
      error: err instanceof Error ? err.message : 'Vision worker failed',
    };
  }
}

async function warmupFromArgv(): Promise<boolean> {
  const warmup = process.argv.find((arg) => arg.startsWith('--warmup='));
  if (!warmup) return false;
  const target = warmup.slice('--warmup='.length);
  if (target === 'clip') await getClip();
  else if (target === 'owlvit') await getOwl(process.env.AUTO_ANNOTATE_MODEL || 'Xenova/owlvit-base-patch32');
  else throw new Error(`Unknown warmup target: ${target}`);
  console.log(`Vision worker cached ${target}`);
  return true;
}

if (process.send) {
  process.on('message', (msg: VisionRequest) => {
    void handle(msg).then((response) => {
      process.send?.(response);
    });
  });
} else {
  warmupFromArgv()
    .then((didWarmup) => {
      if (didWarmup) process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
