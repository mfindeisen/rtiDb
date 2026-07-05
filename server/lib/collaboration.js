/** Permissions for researcher collaboration (Phase 1+: notes, annotations, comments). */
export const COLLABORATION_PERMISSIONS = ['private_notes', 'annotate', 'comment'];

export function userCanCollaborate(user) {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return Array.isArray(user.permissions) && user.permissions.includes('private_notes');
}

export function requireCollaboration(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (userCanCollaborate(req.user)) {
    return next();
  }
  return res.status(403).json({ error: 'Forbidden: Researcher access required' });
}

export function userCanAnnotate(user) {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return Array.isArray(user.permissions) && user.permissions.includes('annotate');
}

export function requireAnnotate(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (userCanAnnotate(req.user)) {
    return next();
  }
  return res.status(403).json({ error: 'Forbidden: Annotate permission required' });
}
