import { eq } from 'drizzle-orm';
import type { AppDb } from '../types/index.js';
import type { AppSchema } from '../types/index.js';
import type { ServerConfig } from '../config.js';
import { PERMISSIONS } from '@rtidb/shared/permissions';
import { hashPassword } from './auth/password.js';

export function seedAdminUser(db: AppDb, schema: AppSchema, config: ServerConfig): void {
  const existingAdmin = db
    .select({ id: schema.users.id })
    .from(schema.users)
    .where(eq(schema.users.username, config.adminUsername))
    .get();

  if (!existingAdmin) {
    db.insert(schema.users).values({
      username: config.adminUsername,
      passwordHash: hashPassword(config.adminPassword),
      role: 'admin',
      permissions: [...PERMISSIONS],
    }).run();
    console.log(`Seeded default admin user: ${config.adminUsername}`);
  }
}
