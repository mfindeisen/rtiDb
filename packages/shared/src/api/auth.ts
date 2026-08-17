import type { JwtUser } from '../auth.js';

export interface LoginResponse {
  success: true;
  user: JwtUser;
}

export interface MeResponse {
  user: JwtUser;
}

export interface LoginErrorResponse {
  error: string;
}
