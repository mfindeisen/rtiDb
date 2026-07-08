import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import type { Express } from 'express';
import { verifyPassword, parsePermissions } from '../lib/auth/password.js';
import type { ServerContext } from '../types/index.js';

export function registerAuthRoutes(app: Express, { db, schema, config }: Pick<ServerContext, 'db' | 'schema' | 'config'>) {
  app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    try {
      const user = db.select().from(schema.users).where(eq(schema.users.username, username)).get();
      if (user && verifyPassword(password, user.passwordHash)) {
        const permissions = parsePermissions(user.permissions);
        const token = jwt.sign(
          { id: user.id, username: user.username, role: user.role, permissions },
          config.jwtSecret,
          { expiresIn: '24h' },
        );
        res.json({ success: true, token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Server database error' });
    }
  });
}
