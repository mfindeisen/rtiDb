import { describe, expect, it } from 'vitest';
import { parseCorsOrigins, buildCorsOptions } from './cors.js';

describe('parseCorsOrigins', () => {
  it('parses comma-separated origins', () => {
    expect(parseCorsOrigins('https://a.test, https://b.test', false, null))
      .toEqual(['https://a.test', 'https://b.test']);
  });

  it('uses PUBLIC_BASE_URL in production when unset', () => {
    expect(parseCorsOrigins(undefined, true, 'https://rti.example.org'))
      .toEqual(['https://rti.example.org']);
  });

  it('defaults to local Vite origins in development', () => {
    expect(parseCorsOrigins(undefined, false, null))
      .toEqual(['http://localhost:5173', 'http://127.0.0.1:5173']);
  });
});

describe('buildCorsOptions', () => {
  it('exposes byte-range headers for GeoTIFF clients', () => {
    const options = buildCorsOptions({ corsOrigins: ['http://localhost:5173'] } as Parameters<typeof buildCorsOptions>[0]);
    expect(options.exposedHeaders).toEqual(['Accept-Ranges', 'Content-Range', 'Content-Length']);
  });
});
