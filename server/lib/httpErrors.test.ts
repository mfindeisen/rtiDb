import { describe, expect, it } from 'vitest';
import { errorHandler, HttpError } from './httpErrors.js';
import type { Request, Response, NextFunction } from 'express';

function mockRes() {
  const res = {
    headersSent: false,
    statusCode: 0,
    body: null as unknown,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(payload: unknown) {
      this.body = payload;
      return this;
    },
  };
  return res as typeof res & Response;
}

describe('errorHandler', () => {
  it('does not leak unhandled error messages', () => {
    const res = mockRes();
    errorHandler(new Error('secret disk path /var/data'), {} as Request, res, (() => {}) as NextFunction);
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: 'Internal server error' });
  });

  it('returns HttpError messages as-is', () => {
    const res = mockRes();
    errorHandler(new HttpError(409, 'Cannot delete'), {} as Request, res, (() => {}) as NextFunction);
    expect(res.statusCode).toBe(409);
    expect(res.body).toEqual({ error: 'Cannot delete' });
  });
});
