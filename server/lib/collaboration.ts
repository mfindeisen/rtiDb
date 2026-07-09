import type { NextFunction, Request, Response } from 'express';
import {
  userCanCollaborate,
  userCanAnnotate,
  userCanComment,
} from '@rtidb/shared/authorization';

export {
  COLLABORATION_PERMISSIONS,
  RESEARCHER_DEFAULT_PERMISSIONS,
  hasPermission,
  canAccessAdmin,
  userCanCollaborate,
  userCanAnnotate,
  userCanComment,
} from '@rtidb/shared/authorization';

export function requireCollaboration(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (userCanCollaborate(req.user)) {
    return next();
  }
  return res.status(403).json({ error: 'Forbidden: Researcher access required' });
}

export function requireAnnotate(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (userCanAnnotate(req.user)) {
    return next();
  }
  return res.status(403).json({ error: 'Forbidden: Annotate permission required' });
}

export function requireComment(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (userCanComment(req.user)) {
    return next();
  }
  return res.status(403).json({ error: 'Forbidden: Comment permission required' });
}
