import type { Response } from 'express';
import type { Request } from 'express';
import { userCanViewRecord } from '@rtidb/shared/authorization';
import type { DbRecord } from '../types/index.js';

export function denyRecordAccess(res: Response, user: Request['user']): void {
  if (!user) {
    res.status(404).json({ error: 'Record not found' });
    return;
  }
  res.status(403).json({ error: 'Forbidden' });
}

export function ensureRecordViewAccess(req: Request, res: Response, record: DbRecord): boolean {
  if (userCanViewRecord(req.user, record)) {
    return true;
  }
  denyRecordAccess(res, req.user);
  return false;
}
