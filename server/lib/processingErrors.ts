export class ProcessingCancelledError extends Error {
  constructor() {
    super('Cancelled');
    this.name = 'ProcessingCancelledError';
  }
}

export function isProcessingCancelledError(error: unknown): boolean {
  return error instanceof ProcessingCancelledError
    || (error instanceof Error && error.name === 'ProcessingCancelledError');
}
