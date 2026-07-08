import type { Express, Request, Response } from 'express';

interface ProgressClient {
  id: number;
  res: Response;
}

let clients: ProgressClient[] = [];

export function broadcastProgress(id: number, progress: number, message: string) {
  clients.forEach((client) => {
    client.res.write(`data: ${JSON.stringify({ id, progress, message })}\n\n`);
  });
}

export function registerProgressRoutes(app: Express) {
  app.get('/api/progress', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const clientId = Date.now();
    clients.push({ id: clientId, res });

    req.on('close', () => {
      clients = clients.filter((client) => client.id !== clientId);
    });
  });
}
