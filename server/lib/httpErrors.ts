import type { NextFunction, Request, RequestHandler, Response } from 'express';

export class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export function sendError(res: Response, status: number, message: string): Response {
  return res.status(status).json({ error: message });
}

export function asyncHandler(
  handler: (req: Request, res: Response, next: NextFunction) => unknown | Promise<unknown>,
): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

export function notFoundHandler(_req: Request, res: Response): void {
  sendError(res, 404, 'Not found');
}

export function errorHandler(err: unknown, _req: Request, res: Response, next: NextFunction): void {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof HttpError) {
    sendError(res, err.status, err.message);
    return;
  }

  if (isMulterLimitError(err)) {
    sendError(res, 413, 'Uploaded file is too large');
    return;
  }

  console.error('Unhandled error:', err);
  const message = err instanceof Error ? err.message : 'Internal server error';
  sendError(res, 500, message);
}

function isMulterLimitError(err: unknown): boolean {
  return typeof err === 'object'
    && err !== null
    && 'code' in err
    && (err as { code: unknown }).code === 'LIMIT_FILE_SIZE';
}
