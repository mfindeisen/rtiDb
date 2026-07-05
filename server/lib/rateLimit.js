const DEFAULT_MAX = 10;
const DEFAULT_WINDOW_MS = 60 * 60 * 1000;

/** @type {Map<string, number[]>} */
const hitsByKey = new Map();

function pruneOldHits(hits, now, windowMs) {
  return hits.filter((t) => now - t < windowMs);
}

/**
 * Fixed-window rate limiter (in-memory, per process).
 * @returns {{ allowed: boolean, remaining: number, retryAfterMs: number, limit: number, windowMs: number }}
 */
export function consumeRateLimit(key, {
  max = DEFAULT_MAX,
  windowMs = DEFAULT_WINDOW_MS,
} = {}) {
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

export function imageSearchRateLimitKey(user) {
  return `image-search:${user?.id ?? user?.username ?? 'anonymous'}`;
}

export const IMAGE_SEARCH_RATE_LIMIT = {
  max: Number(process.env.IMAGE_SEARCH_RATE_LIMIT) || DEFAULT_MAX,
  windowMs: Number(process.env.IMAGE_SEARCH_RATE_WINDOW_MS) || DEFAULT_WINDOW_MS,
};
