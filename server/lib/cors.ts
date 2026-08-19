import type { CorsOptions } from 'cors';
import type { ServerConfig } from '../config.js';

export function parseCorsOrigins(
  raw: string | undefined,
  isProduction: boolean,
  publicBaseUrl: string | null,
): string[] {
  if (raw?.trim()) {
    return raw.split(',').map((entry) => entry.trim()).filter(Boolean);
  }
  if (isProduction && publicBaseUrl) {
    return [publicBaseUrl];
  }
  return ['http://localhost:5173', 'http://127.0.0.1:5173'];
}

export function buildCorsOptions(config: ServerConfig): CorsOptions {
  const allowedOrigins = new Set(config.corsOrigins);

  return {
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    credentials: true,
    exposedHeaders: ['Accept-Ranges', 'Content-Range', 'Content-Length'],
  };
}
