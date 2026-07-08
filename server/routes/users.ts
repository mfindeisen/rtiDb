import { eq } from 'drizzle-orm';
import type { Express } from 'express';
import { hashPassword, parsePermissions } from '../lib/auth/password.js';
import { sendError } from '../lib/httpErrors.js';
import {
  mapPublicUsers,
  usernameTaken,
  sendDatabaseError,
} from '../lib/userResources.js';
import type { ServerContext } from '../types/index.js';

export function registerUserRoutes(app: Express, ctx: ServerContext) {
  const { db, schema, authMiddleware, requireAdmin } = ctx;

  app.get('/api/users', authMiddleware, requireAdmin, (_req, res) => {
    try {
      const users = db.select({
        id: schema.users.id,
        username: schema.users.username,
        role: schema.users.role,
        permissions: schema.users.permissions,
      }).from(schema.users).orderBy(schema.users.id).all();
      res.json(mapPublicUsers(users));
    } catch (err) {
      sendDatabaseError(res, err, 'Fetch users error');
    }
  });

  app.post('/api/users', authMiddleware, requireAdmin, (req, res) => {
    const { username, password, role, permissions } = req.body;
    if (!username || !password || !role) {
      return sendError(res, 400, 'Username, password, and role are required');
    }

    try {
      if (usernameTaken(db, schema, username)) {
        return sendError(res, 400, 'Username already exists');
      }

      const inserted = db.insert(schema.users).values({
        username,
        passwordHash: hashPassword(password),
        role,
        permissions: permissions || [],
      }).returning({ id: schema.users.id }).get();

      res.json({ success: true, id: inserted.id });
    } catch (err) {
      sendDatabaseError(res, err, 'Create user error');
    }
  });

  app.put('/api/users/:id', authMiddleware, requireAdmin, (req, res) => {
    const { username, password, role, permissions } = req.body;
    if (!username || !role) {
      return sendError(res, 400, 'Username and role are required');
    }

    try {
      if (usernameTaken(db, schema, username, Number(req.params.id))) {
        return sendError(res, 400, 'Username already exists');
      }

      const perms = permissions || [];
      const updateData = password
        ? { username, passwordHash: hashPassword(password), role, permissions: perms }
        : { username, role, permissions: perms };

      db.update(schema.users).set(updateData).where(eq(schema.users.id, Number(req.params.id))).run();

      res.json({ success: true });
    } catch (err) {
      sendDatabaseError(res, err, 'Update user error');
    }
  });

  app.delete('/api/users/:id', authMiddleware, requireAdmin, (req, res) => {
    if (req.user!.id == Number(req.params.id)) {
      return sendError(res, 400, 'Cannot delete your own administrator account');
    }

    try {
      const deleted = db.delete(schema.users)
        .where(eq(schema.users.id, Number(req.params.id)))
        .returning({ id: schema.users.id })
        .get();
      if (!deleted) {
        return sendError(res, 404, 'User not found');
      }
      res.json({ success: true });
    } catch (err) {
      sendDatabaseError(res, err, 'Delete user error');
    }
  });
}
