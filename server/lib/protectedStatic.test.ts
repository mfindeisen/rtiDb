import { describe, expect, it } from 'vitest';
import { userCanManageRecords, userCanViewRecord } from '@rtidb/shared/authorization';
import type { JwtUser } from '@rtidb/shared/auth';

type StaticAccess = 'serve' | 'not_found' | 'forbidden';

function resolveStaticUploadAccess(options: {
  relPath: string;
  record: { isPublished: number } | null;
  user: JwtUser | null | undefined;
}): StaticAccess {
  const { relPath, record, user } = options;
  if (relPath.startsWith('search-temp/')) return 'not_found';
  if (relPath.startsWith('incoming/')) return 'not_found';
  if (relPath.startsWith('branding/')) return 'serve';
  if (relPath.startsWith('archive/')) {
    if (!user || !userCanManageRecords(user)) {
      return user ? 'forbidden' : 'not_found';
    }
    return 'serve';
  }
  if (!record) return 'not_found';
  if (!userCanViewRecord(user, record)) {
    return user ? 'forbidden' : 'not_found';
  }
  return 'serve';
}

describe('protectedStatic access rules', () => {
  const published = { isPublished: 1 };
  const draft = { isPublished: 0 };
  const editor: JwtUser = { id: 1, username: 'e', role: 'editor', permissions: [] };

  it('denies unlinked upload paths', () => {
    expect(resolveStaticUploadAccess({
      relPath: '1730000000-sample.ptm',
      record: null,
      user: null,
    })).toBe('not_found');
  });

  it('allows public branding assets', () => {
    expect(resolveStaticUploadAccess({
      relPath: 'branding/logo.png',
      record: null,
      user: null,
    })).toBe('serve');
  });

  it('blocks search-temp files for everyone', () => {
    expect(resolveStaticUploadAccess({
      relPath: 'search-temp/query-1.jpg',
      record: null,
      user: editor,
    })).toBe('not_found');
  });

  it('blocks incoming chunk files for everyone', () => {
    expect(resolveStaticUploadAccess({
      relPath: 'incoming/abc.part',
      record: null,
      user: editor,
    })).toBe('not_found');
  });

  it('hides published record assets from anonymous users', () => {
    expect(resolveStaticUploadAccess({
      relPath: 'record-1/thumb.jpg',
      record: published,
      user: null,
    })).toBe('not_found');
  });

  it('allows published record assets for signed-in staff', () => {
    expect(resolveStaticUploadAccess({
      relPath: 'record-1/thumb.jpg',
      record: published,
      user: editor,
    })).toBe('serve');
  });

  it('hides draft record assets from anonymous users', () => {
    expect(resolveStaticUploadAccess({
      relPath: 'record-2/thumb.jpg',
      record: draft,
      user: null,
    })).toBe('not_found');
  });
});
