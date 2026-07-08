import type { ProgressEvent } from '@rtidb/shared/api/records';
import { apiUrl } from './client';

export function subscribeProgress(onEvent: (event: ProgressEvent) => void): () => void {
  const source = new EventSource(apiUrl('/api/progress'));

  source.onmessage = (message) => {
    try {
      onEvent(JSON.parse(message.data) as ProgressEvent);
    } catch {
      // ignore malformed events
    }
  };

  return () => source.close();
}
