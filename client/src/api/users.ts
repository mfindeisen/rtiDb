import type { ApiUser, CreateUserResponse } from '@rtidb/shared/api/users';
import type { SuccessResponse } from '@rtidb/shared/api/records';
import type { Permission, UserRole } from '@rtidb/shared/permissions';
import { request } from './client';

export async function listUsers(): Promise<ApiUser[]> {
  return request<ApiUser[]>('/api/users');
}

export async function createUser(payload: {
  username: string;
  password: string;
  role: UserRole;
  permissions?: Permission[];
}): Promise<CreateUserResponse> {
  return request<CreateUserResponse>('/api/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateUser(
  id: number,
  payload: {
    username: string;
    password?: string;
    role: UserRole;
    permissions?: Permission[];
  },
): Promise<SuccessResponse> {
  return request<SuccessResponse>(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteUser(id: number): Promise<SuccessResponse> {
  return request<SuccessResponse>(`/api/users/${id}`, { method: 'DELETE' });
}
