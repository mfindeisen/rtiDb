import { describe, expect, it } from 'vitest';
import { consumeRateLimit, loginRateLimitKey, peekRateLimit } from './rateLimit.js';
import { parseTrustProxy } from '../config.js';
import { sessionCookieSecure } from '../routes/auth.js';

describe('parseTrustProxy', () => {
  it('defaults to one hop in production and off in development', () => {
    expect(parseTrustProxy(undefined, true)).toBe(1);
    expect(parseTrustProxy('', false)).toBe(false);
  });

  it('parses boolean and hop-count values', () => {
    expect(parseTrustProxy('false', true)).toBe(false);
    expect(parseTrustProxy('true', false)).toBe(true);
    expect(parseTrustProxy('2', true)).toBe(2);
    expect(parseTrustProxy('0', true)).toBe(false);
  });
});

describe('sessionCookieSecure', () => {
  it('is never secure in development', () => {
    expect(sessionCookieSecure({ secure: true }, { isProduction: false, trustProxy: 1 })).toBe(false);
  });

  it('uses req.secure when the proxy is trusted', () => {
    const config = { isProduction: true, trustProxy: 1 as const };
    expect(sessionCookieSecure({ secure: true }, config)).toBe(true);
    expect(sessionCookieSecure({ secure: false }, config)).toBe(false);
  });

  it('assumes HTTPS in production without a trusted proxy', () => {
    expect(sessionCookieSecure({ secure: false }, { isProduction: true, trustProxy: false })).toBe(true);
  });
});

describe('rateLimit', () => {
  it('blocks after the configured number of hits', () => {
    const key = `test-${Date.now()}-${Math.random()}`;
    const opts = { max: 2, windowMs: 60_000 };
    expect(consumeRateLimit(key, opts).allowed).toBe(true);
    expect(consumeRateLimit(key, opts).allowed).toBe(true);
    expect(peekRateLimit(key, opts).allowed).toBe(false);
    expect(consumeRateLimit(key, opts).allowed).toBe(false);
  });

  it('keys login attempts by client IP', () => {
    expect(loginRateLimitKey({ ip: '203.0.113.9' })).toBe('login:203.0.113.9');
    expect(loginRateLimitKey({ socket: { remoteAddress: '127.0.0.1' } })).toBe('login:127.0.0.1');
  });
});
