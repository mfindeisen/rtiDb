export function getToken() {
  return localStorage.getItem('adminToken');
}

export function parseTokenPayload() {
  const token = getToken();
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return !!parseTokenPayload();
}

export function logout() {
  localStorage.removeItem('adminToken');
}

export function hasPermission(permission) {
  const payload = parseTokenPayload();
  if (!payload) return false;
  if (payload.role === 'admin') return true;
  return Array.isArray(payload.permissions) && payload.permissions.includes(permission);
}

export function canAccessAdmin() {
  const payload = parseTokenPayload();
  if (!payload) return false;
  if (payload.role === 'admin' || payload.role === 'editor') return true;
  return hasPermission('upload_rti') || hasPermission('edit_record') || hasPermission('delete_record');
}

export function canCollaborate() {
  const payload = parseTokenPayload();
  if (!payload) return false;
  if (payload.role === 'admin') return true;
  return Array.isArray(payload.permissions) && payload.permissions.includes('private_notes');
}

export function canAnnotate() {
  const payload = parseTokenPayload();
  if (!payload) return false;
  if (payload.role === 'admin') return true;
  return Array.isArray(payload.permissions) && payload.permissions.includes('annotate');
}

export function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function isResearcherRole() {
  const payload = parseTokenPayload();
  return payload?.role === 'researcher';
}

/** Default landing route after login (optional redirect from query). */
export function postLoginPath(redirect) {
  const payload = parseTokenPayload();
  if (!payload) return '/login';

  const safeRedirect = typeof redirect === 'string' && redirect.startsWith('/') && redirect !== '/login'
    ? redirect
    : null;
  if (safeRedirect) return safeRedirect;

  if (payload.role === 'researcher') return '/';
  if (canAccessAdmin()) return '/admin';
  return '/';
}
