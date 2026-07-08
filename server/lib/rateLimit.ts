import type { JwtUser } from '../types/index.js';
import { getConfig } from '../config.js';

const DEFAULT_MAX = 10;
const DEFAULT_WINDOW_MS = 60 * 60 * 1000;

const hitsByKey = new Map<string, number[]>();

function pruneOldHits(hits: number[], now: number, windowMs: number) {
  return hits.filter((t) => now - t < windowMs);
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterMs: number;
  limit: number;
  windowMs: number;
}

/** Fixed-window rate limiter (in-memory, per process). */
export function consumeRateLimit(
  key: string,
  {
    max = DEFAULT_MAX,
    windowMs = DEFAULT_WINDOW_MS,
  }: { max?: number; windowMs?: number } = {},
): RateLimitResult {
  const now = Date.now();
  const hits = pruneOldHits(hitsByKey.get(key) || [], now, windowMs);

  if (hits.length >= max) {
    const oldest = hits[0];
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: Math.max(0, windowMs - (now - oldest)),
      limit: max,
      windowMs,
    };
  }

  hits.push(now);
  hitsByKey.set(key, hits);

  return {
    allowed: true,
    remaining: max - hits.length,
    retryAfterMs: 0,
    limit: max,
    windowMs,
  };
}

export function imageSearchRateLimitKey(user: JwtUser | undefined) {
  return `image-search:${user?.id ?? user?.username ?? 'anonymous'}`;
}

export function getImageSearchRateLimit() {
  const config = getConfig();
  return {
    max: config.imageSearchRateLimit,
    windowMs: config.imageSearchRateWindowMs,
  };
}

/** @deprecated Use getImageSearchRateLimit() */
export const IMAGE_SEARCH_RATE_LIMIT = getImageSearchRateLimit();
