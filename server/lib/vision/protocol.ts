export const CLIP_MODEL = 'Xenova/clip-vit-base-patch32';

export interface OwlDetectionBox {
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
}

export interface OwlDetectionHit {
  box: OwlDetectionBox;
  label: string;
  score: number;
}

export type VisionRequestBody =
  | { op: 'clip'; imagePath: string }
  | {
      op: 'owlvit';
      imagePath: string;
      labels: string[];
      threshold: number;
      topK: number;
      model: string;
    }
  | { op: 'warmup'; target: 'clip' | 'owlvit'; model?: string };

export type VisionRequest = VisionRequestBody & { id: number };

export type VisionSuccess =
  | { id: number; ok: true; op: 'clip'; embedding: number[] }
  | { id: number; ok: true; op: 'owlvit'; detections: OwlDetectionHit[] }
  | { id: number; ok: true; op: 'warmup' };

export type VisionFailure = { id: number; ok: false; error: string };

export type VisionResponse = VisionSuccess | VisionFailure;
