import type { Express, Request, Response, RequestHandler } from 'express';

interface ProgressClient {
  id: number;
  res: Response;
  recordIds: Set<number> | null;
}

let clients: ProgressClient[] = [];

function parseRecordIds(raw: unknown): Set<number> | null {
  if (typeof raw !== 'string' || !raw.trim()) return null;
  const ids = raw
    .split(',')
    .map((part) => Number.parseInt(part.trim(), 10))
    .filter((id) => Number.isFinite(id) && id > 0);
  if (ids.length === 0) return null;
  return new Set(ids);
}

export function resetProgressClientsForTests(): void {
  clients = [];
}

export function attachProgressClientForTests(
  recordIds: Set<number> | null,
  res: Pick<Response, 'write'>,
): void {
  clients.push({
    id: Date.now() + Math.random(),
    res: res as Response,
    recordIds,
  });
}

export function broadcastProgress(id: number, progress: number, message: string) {
  const payload = `data: ${JSON.stringify({ id, progress, message })}\n\n`;
  clients = clients.filter((client) => {
    if (client.recordIds && !client.recordIds.has(id)) {
      return true;
    }
    try {
      client.res.write(payload);
      return true;
    } catch {
      return false;
    }
  });
}

export function registerProgressRoutes(
  app: Express,
  authMiddleware: RequestHandler,
  requireUploadPermission: RequestHandler,
) {
  app.get('/api/progress', authMiddleware, requireUploadPermission, (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const clientId = Date.now();
    clients.push({
      id: clientId,
      res,
      recordIds: parseRecordIds(req.query.recordIds),
    });

    req.on('close', () => {
      clients = clients.filter((client) => client.id !== clientId);
    });
  });
}
