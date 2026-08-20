import { fork, type ChildProcess } from 'child_process';
import { fileURLToPath } from 'url';
import { getConfig } from '../../config.js';
import type { OwlDetectionHit, VisionRequest, VisionRequestBody, VisionResponse } from './protocol.js';

const DEFAULT_TIMEOUT_MS = 180_000;

type Pending = {
  resolve: (value: VisionResponse) => void;
  reject: (error: Error) => void;
  timer: ReturnType<typeof setTimeout>;
};

export type VisionSpawn = () => ChildProcess;

let spawnImpl: VisionSpawn = defaultSpawn;
let child: ChildProcess | null = null;
let nextId = 1;
const pending = new Map<number, Pending>();

function visionExecArgv(script: string): string[] {
  const execArgv = process.execArgv.filter((arg) => arg !== '--inspect' && !arg.startsWith('--inspect-'));
  const hasTsLoader = execArgv.some((arg) => arg.includes('tsx') || arg.includes('ts-node'));
  if (script.endsWith('.ts') && !hasTsLoader) {
    return ['--import', 'tsx', ...execArgv];
  }
  return execArgv;
}

function defaultSpawn(): ChildProcess {
  const script = fileURLToPath(new URL('./worker.ts', import.meta.url));
  let transformersCache = process.env.TRANSFORMERS_CACHE;
  try {
    transformersCache = transformersCache || getConfig().transformersCache;
  } catch {
    // Config is not loaded in unit tests; the worker falls back to cwd.
  }
  return fork(script, [], {
    execArgv: visionExecArgv(script),
    env: {
      ...process.env,
      ...(transformersCache ? { TRANSFORMERS_CACHE: transformersCache } : {}),
    },
    stdio: ['ignore', 'inherit', 'inherit', 'ipc'],
  });
}

function failAll(error: Error) {
  for (const [id, waiter] of pending) {
    clearTimeout(waiter.timer);
    waiter.reject(error);
    pending.delete(id);
  }
}

function onMessage(msg: VisionResponse) {
  const waiter = pending.get(msg.id);
  if (!waiter) return;
  clearTimeout(waiter.timer);
  pending.delete(msg.id);
  waiter.resolve(msg);
}

function onExit() {
  child = null;
  failAll(new Error('Vision worker exited'));
}

function ensureChild(): ChildProcess {
  if (child && !child.killed && child.connected) return child;
  const spawned = spawnImpl();
  spawned.on('message', onMessage);
  spawned.on('exit', onExit);
  spawned.on('error', (err) => {
    failAll(err instanceof Error ? err : new Error(String(err)));
  });
  child = spawned;
  return spawned;
}

export function setVisionSpawnForTests(spawn: VisionSpawn | null): void {
  shutdownVisionWorker();
  spawnImpl = spawn ?? defaultSpawn;
}

export function shutdownVisionWorker(): void {
  failAll(new Error('Vision worker shut down'));
  if (!child) return;
  child.removeListener('exit', onExit);
  child.kill();
  child = null;
}

export async function sendVisionRequest(
  request: VisionRequestBody,
  timeoutMs = DEFAULT_TIMEOUT_MS,
): Promise<VisionResponse> {
  const id = nextId++;
  const proc = ensureChild();
  const payload = { ...request, id } as VisionRequest;

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`Vision worker timed out (${request.op})`));
    }, timeoutMs);
    pending.set(id, { resolve, reject, timer });
    if (!proc.send(payload)) {
      clearTimeout(timer);
      pending.delete(id);
      reject(new Error('Vision worker is not reachable'));
    }
  });
}

export async function computeClipEmbedding(imagePath: string): Promise<number[]> {
  const response = await sendVisionRequest({ op: 'clip', imagePath });
  if (!response.ok) throw new Error(response.error);
  if (response.op !== 'clip') throw new Error('Unexpected vision worker response');
  return response.embedding;
}

export async function detectWithOwlVit(options: {
  imagePath: string;
  labels: string[];
  threshold: number;
  topK: number;
  model: string;
}): Promise<OwlDetectionHit[]> {
  const response = await sendVisionRequest({
    op: 'owlvit',
    imagePath: options.imagePath,
    labels: options.labels,
    threshold: options.threshold,
    topK: options.topK,
    model: options.model,
  });
  if (!response.ok) throw new Error(response.error);
  if (response.op !== 'owlvit') throw new Error('Unexpected vision worker response');
  return response.detections;
}

export async function warmupVisionModel(target: 'clip' | 'owlvit', model?: string): Promise<void> {
  const response = await sendVisionRequest({ op: 'warmup', target, model });
  if (!response.ok) throw new Error(response.error);
}
