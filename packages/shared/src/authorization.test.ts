import { describe, expect, it } from 'vitest';
import {
  hasPermission,
  canAccessAdmin,
  userCanCollaborate,
  userCanAnnotate,
  userCanViewRecord,
  userCanManageRecords,
  RESEARCHER_DEFAULT_PERMISSIONS,
} from './authorization.js';

describe('authorization', () => {
  it('grants all permissions to admin', () => {
    const admin = { id: 1, username: 'admin', role: 'admin' as const, permissions: [] };
    expect(hasPermission(admin, 'delete_record')).toBe(true);
    expect(canAccessAdmin(admin)).toBe(true);
    expect(userCanAnnotate(admin)).toBe(true);
  });

  it('checks explicit permissions for researcher', () => {
    const researcher = {
      id: 2,
      username: 'r',
      role: 'researcher' as const,
      permissions: RESEARCHER_DEFAULT_PERMISSIONS,
    };
    expect(userCanCollaborate(researcher)).toBe(true);
    expect(userCanAnnotate(researcher)).toBe(true);
    expect(hasPermission(researcher, 'delete_record')).toBe(false);
    expect(canAccessAdmin(researcher)).toBe(false);
  });

  it('allows editor admin panel access', () => {
    const editor = { id: 3, username: 'e', role: 'editor' as const, permissions: [] };
    expect(canAccessAdmin(editor)).toBe(true);
  });

  it('allows public access to published records only', () => {
    const published = { isPublished: 1 };
    const draft = { isPublished: 0 };
    expect(userCanViewRecord(null, published)).toBe(true);
    expect(userCanViewRecord(null, draft)).toBe(false);
    expect(userCanViewRecord(
      { id: 1, username: 'e', role: 'editor', permissions: [] },
      draft,
    )).toBe(true);
    expect(userCanManageRecords(
      { id: 2, username: 'r', role: 'researcher', permissions: RESEARCHER_DEFAULT_PERMISSIONS },
    )).toBe(false);
  });
});
