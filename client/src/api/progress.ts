import type { ProgressEvent } from '@rtidb/shared/api/records';
import { apiUrl } from './client';

export function subscribeProgress(
  onEvent: (event: ProgressEvent) => void,
  recordIds: number[] = [],
): () => void {
  const params = new URLSearchParams();
  if (recordIds.length > 0) {
    params.set('recordIds', recordIds.join(','));
  }
  const query = params.toString();
  const source = new EventSource(
    apiUrl(`/api/progress${query ? `?${query}` : ''}`),
    { withCredentials: true },
  );

  source.onmessage = (message) => {
    try {
      onEvent(JSON.parse(message.data) as ProgressEvent);
    } catch {
      // ignore malformed events
    }
  };

  return () => source.close();
}
