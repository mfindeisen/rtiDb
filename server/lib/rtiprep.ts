import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

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
}

export interface ProcessRtiToTiffOptions {
  onProgress?: RtiprepProgressCallback;
  weightsPath?: string;
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

  return new Promise((resolve, reject) => {
    const args = ['-q', quality.toString(), '-t', tileSize.toString(), '-o', outputDir, '-legacy', '-openlime'];
    if (format === 'png') args.push('-p');
    args.push(inputFile);

    const proc = spawn(binPath, args, { env: { ...process.env, GOGC: '20' } });

    proc.stdout.on('data', (data: Buffer) => {
      const text = data.toString();

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
    });

    proc.stderr.on('data', (data: Buffer) => {
      console.error(`[rtiprep Error] ${data.toString()}`);
    });

    proc.on('close', (code) => {
      if (code === 0) {
        log(`Successfully generated web format in ${outputDir}`);
        if (options.onProgress) options.onProgress(100, 'Processing complete!');
        resolve(outputDir);
      } else {
        reject(new Error(`rtiprep exited with code ${code}`));
      }
    });

    proc.on('error', (err) => {
      console.error('Failed to start rtiprep process:', err);
      reject(err);
    });
  });
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

  return new Promise((resolve, reject) => {
    const args = ['-tiff'];
    if (options.weightsPath) {
      args.push('-weights', options.weightsPath);
    }
    args.push('-o', outputFile, inputFile);
    const proc = spawn(binPath, args, { env: { ...process.env, GOGC: '20' } });

    proc.stdout.on('data', (data: Buffer) => {
      const text = data.toString().trim();
      if (!text) return;
      console.log(`[rtiprep] ${text}`);

      if (text.includes('Loaded:')) {
        if (options.onProgress) options.onProgress(10, text);
      } else if (text.includes('Generating')) {
        if (options.onProgress) options.onProgress(20, text);
      } else if (text.includes('Success')) {
        if (options.onProgress) options.onProgress(99, text);
      }
    });

    proc.stderr.on('data', (data: Buffer) => {
      console.error(`[rtiprep error] ${data.toString()}`);
    });

    proc.on('close', (code) => {
      if (code === 0) {
        log(`GeoTIFF generated: ${outputFile}`);
        resolve(outputFile);
      } else {
        reject(new Error(`rtiprep exited with code ${code}`));
      }
    });

    proc.on('error', (err) => {
      console.error('Failed to start rtiprep process:', err);
      reject(err);
    });
  });
}
