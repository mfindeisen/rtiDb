import crypto from 'crypto';

const PBKDF2_ITERATIONS = 310_000;

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, 64, 'sha512').toString('hex');
  return `${PBKDF2_ITERATIONS}:${salt}:${hash}`;
}

export function verifyPassword(password: string, storedPassword: string | null | undefined): boolean {
  if (!storedPassword) return false;

  const parts = storedPassword.split(':');
  let iterations = PBKDF2_ITERATIONS;
  let salt: string;
  let expectedHash: string;

  if (parts.length === 3) {
    iterations = Number(parts[0]) || PBKDF2_ITERATIONS;
    salt = parts[1]!;
    expectedHash = parts[2]!;
  } else if (parts.length === 2) {
    // Legacy rows: salt:hash with 1000 iterations
    iterations = 1000;
    salt = parts[0]!;
    expectedHash = parts[1]!;
  } else {
    return false;
  }

  const verifyHash = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512');
  const expected = Buffer.from(expectedHash, 'hex');
  if (verifyHash.length !== expected.length) return false;
  return crypto.timingSafeEqual(verifyHash, expected);
}

/** Drizzle JSON columns return arrays; legacy rows may still be JSON strings. */
export function parsePermissions(value: unknown): string[] {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}
