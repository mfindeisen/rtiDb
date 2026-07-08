export interface LoginResponse {
  success: true;
  token: string;
}

export interface LoginErrorResponse {
  error: string;
}
