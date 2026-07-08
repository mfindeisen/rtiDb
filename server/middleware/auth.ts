import jwt from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';
import type { AuthContext } from '../types/index.js';
import type { JwtUser } from '../types/index.js';
import type { Permission } from '../types/index.js';

export function createAuthMiddleware(JWT_SECRET: string): AuthContext {
  const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
      req.user = jwt.verify(token, JWT_SECRET) as JwtUser;
      next();
    } catch {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
  };

  const optionalAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        req.user = jwt.verify(token, JWT_SECRET) as JwtUser;
      } catch {
        // ignore invalid token for optional auth
      }
    }
    next();
  };

  const requirePermission = (permission: Permission) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (req.user.role === 'admin') {
      return next();
    }
    if (req.user.permissions?.includes(permission)) {
      return next();
    }
    return res.status(403).json({ error: `Forbidden: Requires permission '${permission}'` });
  };

  const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role === 'admin') {
      return next();
    }
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  };

  return { authMiddleware, optionalAuthMiddleware, requirePermission, requireAdmin };
}
