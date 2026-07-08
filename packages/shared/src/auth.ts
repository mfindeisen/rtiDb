import type { Permission, UserRole } from './permissions.js';

/** Payload stored in JWT and attached to `req.user`. */
export interface JwtUser {
  id: number;
  username: string;
  role: UserRole;
  permissions: Permission[];
}
