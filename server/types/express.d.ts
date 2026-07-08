import type { JwtUser } from '@rtidb/shared/auth';

declare global {
  namespace Express {
    interface User extends JwtUser {}
    interface Request {
      user?: JwtUser;
    }
  }
}

export {};
