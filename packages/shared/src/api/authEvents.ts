export const AUTH_EVENT_TYPES = ['login', 'login_failed', 'logout', 'session_sync'] as const;
export type AuthEventType = (typeof AUTH_EVENT_TYPES)[number];

export interface AuthEventRow {
  id: number;
  createdAt: string;
  event: AuthEventType;
  userId: number | null;
  username: string;
  ip: string | null;
  userAgent: string | null;
}

export interface AuthEventListResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  results: AuthEventRow[];
}
