export const PERMISSIONS = [
  'upload_rti',
  'edit_record',
  'delete_record',
  'manage_users',
  'private_notes',
  'annotate',
  'comment',
] as const;

export type Permission = (typeof PERMISSIONS)[number];

export type UserRole = 'admin' | 'editor' | 'researcher';
