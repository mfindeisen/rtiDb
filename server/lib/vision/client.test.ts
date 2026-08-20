import { EventEmitter } from 'events';
import { afterEach, describe, expect, it } from 'vitest';
import type { ChildProcess } from 'child_process';
import { computeClipEmbedding, setVisionSpawnForTests, shutdownVisionWorker } from './client.js';
import type { VisionRequest } from './protocol.js';

class FakeVisionChild extends EventEmitter {
  killed = false;
  connected = true;
  lastRequest: VisionRequest | null = null;

  send(message: VisionRequest): boolean {
    this.lastRequest = message;
    queueMicrotask(() => {
      this.emit('message', {
        id: message.id,
        ok: true,
        op: 'clip',
        embedding: [1, 0],
      });
    });
    return true;
  }

  kill(): boolean {
    this.killed = true;
    this.connected = false;
    return true;
  }
}

describe('vision client', () => {
  afterEach(() => {
    shutdownVisionWorker();
    setVisionSpawnForTests(null);
  });

  it('computes CLIP embeddings in a child process, not the API process', async () => {
    const fake = new FakeVisionChild();
    setVisionSpawnForTests(() => fake as unknown as ChildProcess);

    const embedding = await computeClipEmbedding('/tmp/seal.jpg');
    expect(embedding).toEqual([1, 0]);
    expect(fake.lastRequest).toMatchObject({ op: 'clip', imagePath: '/tmp/seal.jpg' });
  });
});
