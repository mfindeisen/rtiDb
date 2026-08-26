import type { Permission, UserRole } from '../permissions.js';

export interface ApiUser {
  id: number;
  username: string;
  role: UserRole;
  permissions: Permission[];
  lastLoginAt: string | null;
}

export interface CreateUserResponse {
  success: true;
  id: number;
}
