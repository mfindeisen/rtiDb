import { describe, expect, it, beforeEach } from 'vitest';
import {
  attachProgressClientForTests,
  broadcastProgress,
  resetProgressClientsForTests,
} from './progress.js';

describe('broadcastProgress', () => {
  beforeEach(() => {
    resetProgressClientsForTests();
  });

  it('delivers events to clients without a record filter', () => {
    const events: unknown[] = [];
    attachProgressClientForTests(null, {
      write(chunk: string) {
        events.push(JSON.parse(chunk.trim().replace(/^data: /, '')));
        return true;
      },
    });

    broadcastProgress(7, 42, 'tiling');
    expect(events).toEqual([{ id: 7, progress: 42, message: 'tiling' }]);
  });

  it('skips clients that did not subscribe to the record id', () => {
    const subscribed: unknown[] = [];
    const skipped: unknown[] = [];

    attachProgressClientForTests(new Set([7]), {
      write(chunk: string) {
        subscribed.push(JSON.parse(chunk.trim().replace(/^data: /, '')));
        return true;
      },
    });
    attachProgressClientForTests(new Set([99]), {
      write(chunk: string) {
        skipped.push(JSON.parse(chunk.trim().replace(/^data: /, '')));
        return true;
      },
    });

    broadcastProgress(7, 10, '');
    expect(subscribed).toHaveLength(1);
    expect(skipped).toHaveLength(0);
  });
});
