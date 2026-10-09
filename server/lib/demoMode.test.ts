import { describe, expect, it } from 'vitest';
import type { NextFunction, Request, Response } from 'express';
import {
  applyDemoSessionUser,
  createDemoReadOnlyMiddleware,
  isDemoMutationAllowed,
  normalizeApiPath,
} from './demoMode.js';

describe('normalizeApiPath', () => {
  it('strips query and trailing slash', () => {
    expect(normalizeApiPath('/api/login/?x=1')).toBe('/api/login');
    expect(normalizeApiPath('/')).toBe('/');
  });
});

describe('isDemoMutationAllowed', () => {
  it('allows safe methods', () => {
    expect(isDemoMutationAllowed('GET', '/api/records')).toBe(true);
    expect(isDemoMutationAllowed('HEAD', '/api/records')).toBe(true);
    expect(isDemoMutationAllowed('OPTIONS', '/api/records')).toBe(true);
  });

  it('allows auth and image-search POSTs', () => {
    expect(isDemoMutationAllowed('POST', '/api/login')).toBe(true);
    expect(isDemoMutationAllowed('POST', '/api/logout')).toBe(true);
    expect(isDemoMutationAllowed('POST', '/api/auth/sync-session')).toBe(true);
    expect(isDemoMutationAllowed('POST', '/api/search/image')).toBe(true);
  });

  it('blocks catalog mutations', () => {
    expect(isDemoMutationAllowed('POST', '/api/records')).toBe(false);
    expect(isDemoMutationAllowed('PUT', '/api/records/1')).toBe(false);
    expect(isDemoMutationAllowed('DELETE', '/api/records/1')).toBe(false);
    expect(isDemoMutationAllowed('PATCH', '/api/site-config')).toBe(false);
  });
});

describe('applyDemoSessionUser', () => {
  it('strips write capabilities', () => {
    expect(applyDemoSessionUser({
      id: 1,
      username: 'admin',
      role: 'admin',
      permissions: ['manage_users', 'upload_rti'],
    })).toEqual({
      id: 1,
      username: 'admin',
      role: 'researcher',
      permissions: [],
    });
  });
});

describe('createDemoReadOnlyMiddleware', () => {
  it('is a no-op when disabled', () => {
    const mw = createDemoReadOnlyMiddleware(false);
    let nextCalled = false;
    mw({ method: 'POST', path: '/api/records' } as Request, {} as Response, (() => {
      nextCalled = true;
    }) as NextFunction);
    expect(nextCalled).toBe(true);
  });

  it('returns 403 for blocked mutations when enabled', () => {
    const mw = createDemoReadOnlyMiddleware(true);
    let statusCode = 0;
    let body: unknown;
    const res = {
      status(code: number) {
        statusCode = code;
        return this;
      },
      json(payload: unknown) {
        body = payload;
        return this;
      },
    } as unknown as Response;
    let nextCalled = false;
    mw({ method: 'POST', path: '/api/records' } as Request, res, (() => {
      nextCalled = true;
    }) as NextFunction);
    expect(nextCalled).toBe(false);
    expect(statusCode).toBe(403);
    expect(body).toMatchObject({ demoMode: true });
  });
});
