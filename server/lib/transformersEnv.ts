import { env } from '@huggingface/transformers';
import { getConfig } from '../config.js';

export function configureTransformersCache(): void {
  env.cacheDir = getConfig().transformersCache;
}
