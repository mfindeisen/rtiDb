import { spawn, type ChildProcess } from 'child_process';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { ProcessingCancelledError } from './processingErrors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const binName = process.platform === 'win32' ? 'rtiprep.exe' : 'rtiprep';
const binPath = path.resolve(__dirname, './rtiprep', binName);

export type RtiprepProgressCallback = (percent: number | null, message: string) => void;

export interface ProcessRTIOptions {
  quality?: number;
  tileSize?: number;
  format?: string;
  onProgress?: RtiprepProgressCallback;
  signal?: AbortSignal;
}

export interface ProcessRtiToTiffOptions {
  onProgress?: RtiprepProgressCallback;
  weightsPath?: string;
  signal?: AbortSignal;
}

function killProcess(proc: ChildProcess) {
  if (proc.exitCode != null || proc.signalCode != null) return;
  try {
    proc.kill();
  } catch {
    // already exiting
  }
}

function runRtiprep(
  args: string[],
  handlers: {
    onStdout?: (text: string) => void;
    onStderr?: (text: string) => void;
    signal?: AbortSignal;
  },
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (handlers.signal?.aborted) {
      reject(new ProcessingCancelledError());
      return;
    }

    let settled = false;
    const settle = (fn: () => void) => {
      if (settled) return;
      settled = true;
      fn();
    };

    const proc = spawn(binPath, args, { env: { ...process.env, GOGC: '20' } });

    const onAbort = () => {
      killProcess(proc);
      settle(() => reject(new ProcessingCancelledError()));
    };

    if (handlers.signal) {
      handlers.signal.addEventListener('abort', onAbort, { once: true });
    }

    const cleanup = () => {
      handlers.signal?.removeEventListener('abort', onAbort);
    };

    proc.stdout.on('data', (data: Buffer) => {
      handlers.onStdout?.(data.toString());
    });

    proc.stderr.on('data', (data: Buffer) => {
      handlers.onStderr?.(data.toString());
    });

    proc.on('close', (code) => {
      cleanup();
      if (handlers.signal?.aborted) {
        settle(() => reject(new ProcessingCancelledError()));
        return;
      }
      if (code === 0) {
        settle(() => resolve());
      } else {
        settle(() => reject(new Error(`rtiprep exited with code ${code}`)));
      }
    });

    proc.on('error', (err) => {
      cleanup();
      settle(() => reject(err));
    });
  });
}

/**
 * Run rtiprep (Go binary) on an RTI file to produce standard quadtree tiles.
 */
export async function processRTI(inputFile: string, options: ProcessRTIOptions = {}): Promise<string> {
  const quality = options.quality || 90;
  const tileSize = options.tileSize || 256;
  const format = options.format || 'jpg';

  const parsedPath = path.parse(inputFile);
  const outputDir = path.join(parsedPath.dir, parsedPath.name);

  let currentPercent = 0;
  const log = (msg: string) => {
    console.log(msg);
    if (options.onProgress) options.onProgress(currentPercent, msg);
  };

  try {
    await fs.rm(outputDir, { recursive: true, force: true });
  } catch {
    // ignore missing output dir
  }

  log(`Starting rtiprep (Tile mode)...`);

  const normalizedFormat = format === 'jpeg' ? 'jpg' : format;
  const args = [
    '-q', quality.toString(),
    '-t', tileSize.toString(),
    '-o', outputDir,
    '-legacy',
    '-openlime',
    '-format', normalizedFormat,
    inputFile,
  ];

  await runRtiprep(args, {
    signal: options.signal,
    onStdout: (text) => {
      const lines = text.split('\n');
      for (const line of lines) {
        if (!line.trim()) continue;

        const progressMatch = line.match(/\[PROGRESS\]\s*(\d+),(\d+)/);
        if (progressMatch) {
          const current = parseInt(progressMatch[1]!, 10);
          const total = parseInt(progressMatch[2]!, 10);
          if (total > 0) {
            currentPercent = Math.min(99, Math.round((current / total) * 100));
            if (options.onProgress) {
              options.onProgress(currentPercent, `Generating layers... (${current}/${total})`);
            }
          }
        } else {
          console.log(`[rtiprep] ${line.trim()}`);
        }
      }
    },
    onStderr: (text) => {
      console.error(`[rtiprep Error] ${text}`);
    },
  });

  log(`Successfully generated web format in ${outputDir}`);
  if (options.onProgress) options.onProgress(100, 'Processing complete!');
  return outputDir;
}

/**
 * Run rtiprep (Go binary) on an RTI file to produce a single pyramidal TIFF.
 */
export async function processRtiToTiff(inputFile: string, options: ProcessRtiToTiffOptions = {}): Promise<string> {
  const parsedPath = path.parse(inputFile);
  const outputFile = path.join(parsedPath.dir, parsedPath.name + '.tif');

  const log = (msg: string) => {
    console.log(msg);
    if (options.onProgress) options.onProgress(null, msg);
  };

  log(`Starting rtiprep (GeoTIFF mode)...`);

  const args = ['-tiff'];
  if (options.weightsPath) {
    args.push('-weights', options.weightsPath);
  }
  args.push('-o', outputFile, inputFile);

  await runRtiprep(args, {
    signal: options.signal,
    onStdout: (text) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      console.log(`[rtiprep] ${trimmed}`);

      if (trimmed.includes('Loaded:')) {
        if (options.onProgress) options.onProgress(10, trimmed);
      } else if (trimmed.includes('Generating')) {
        if (options.onProgress) options.onProgress(20, trimmed);
      } else if (trimmed.includes('Success')) {
        if (options.onProgress) options.onProgress(99, trimmed);
      }
    },
    onStderr: (text) => {
      console.error(`[rtiprep error] ${text}`);
    },
  });

  log(`GeoTIFF generated: ${outputFile}`);
  return outputFile;
}
