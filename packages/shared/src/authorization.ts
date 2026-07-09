import type { Permission } from './permissions.js';
import type { JwtUser } from './auth.js';

export const COLLABORATION_PERMISSIONS = ['private_notes', 'annotate', 'comment'] as const;

export const RESEARCHER_DEFAULT_PERMISSIONS: Permission[] = ['private_notes', 'annotate', 'comment'];

export function hasPermission(user: JwtUser | null | undefined, permission: Permission): boolean {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return Array.isArray(user.permissions) && user.permissions.includes(permission);
}

export function canAccessAdmin(user: JwtUser | null | undefined): boolean {
  if (!user) return false;
  if (user.role === 'admin' || user.role === 'editor') return true;
  return hasPermission(user, 'upload_rti')
    || hasPermission(user, 'edit_record')
    || hasPermission(user, 'delete_record');
}

export function userCanCollaborate(user: JwtUser | null | undefined): boolean {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return Array.isArray(user.permissions) && user.permissions.includes('private_notes');
}

export function userCanAnnotate(user: JwtUser | null | undefined): boolean {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return Array.isArray(user.permissions) && user.permissions.includes('annotate');
}

export function userCanComment(user: JwtUser | null | undefined): boolean {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return Array.isArray(user.permissions) && user.permissions.includes('comment');
}

export function requireUser(user: JwtUser | undefined): JwtUser {
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}
