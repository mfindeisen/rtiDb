import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const binPath = path.resolve(__dirname, './rtiprep/rtiprep');

/**
 * Run rtiprep (Go binary) on an RTI file to produce standard quadtree tiles.
 * @param {string} inputFile - Absolute path to the input .rti/.ptm/.hsh file
 * @param {object} options   - { quality, tileSize, format, onProgress }
 * @returns {Promise<string>} - Absolute path to the output directory
 */
export async function processRTI(inputFile, options = {}) {
  const quality = options.quality || 90;
  const tileSize = options.tileSize || 256;
  const format = options.format || 'jpg';
  
  const parsedPath = path.parse(inputFile);
  const outputDir = path.join(parsedPath.dir, parsedPath.name);

  let currentPercent = 0;
  const log = (msg) => {
    console.log(msg);
    if (options.onProgress) options.onProgress(currentPercent, msg);
  };

  try {
    await fs.rm(outputDir, { recursive: true, force: true });
  } catch (e) {}

  log(`Starting rtiprep (Tile mode)...`);

  return new Promise((resolve, reject) => {
    const args = ['-q', quality.toString(), '-t', tileSize.toString(), '-o', outputDir, '-legacy'];
    if (format === 'png') args.push('-p');
    args.push(inputFile);

    const proc = spawn(binPath, args, { env: { ...process.env, GOGC: '20' } });

    proc.stdout.on('data', (data) => {
      const text = data.toString();
      
      // Parse multiple lines of stdout
      const lines = text.split('\n');
      for (const line of lines) {
        if (!line.trim()) continue;
        
        const progressMatch = line.match(/\[PROGRESS\]\s*(\d+),(\d+)/);
        if (progressMatch) {
          const current = parseInt(progressMatch[1], 10);
          const total = parseInt(progressMatch[2], 10);
          if (total > 0) {
            currentPercent = Math.min(99, Math.round((current / total) * 100)); // cap at 99 until finish
            if (options.onProgress) {
              options.onProgress(currentPercent, `Generating layers... (${current}/${total})`);
            }
          }
        } else {
          console.log(`[rtiprep] ${line.trim()}`);
        }
      }
    });

    proc.stderr.on('data', (data) => {
      console.error(`[rtiprep Error] ${data.toString()}`);
    });

    proc.on('close', (code) => {
      if (code === 0) {
        log(`Successfully generated web format in ${outputDir}`);
        if (options.onProgress) options.onProgress(100, "Processing complete!");
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
 * @param {string} inputFile - Absolute path to the input .rti/.ptm file
 * @param {object} options   - { onProgress, weightsPath }
 * @returns {Promise<string>} - Absolute path to the output .tif file
 */
export async function processRtiToTiff(inputFile, options = {}) {
  const parsedPath = path.parse(inputFile);
  const outputFile = path.join(parsedPath.dir, parsedPath.name + '.tif');

  const log = (msg) => {
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

    proc.stdout.on('data', (data) => {
      const text = data.toString().trim();
      if (!text) return;
      console.log(`[rtiprep] ${text}`);

      // Parse optional progress lines
      if (text.includes('Loaded:')) {
        if (options.onProgress) options.onProgress(10, text);
      } else if (text.includes('Generating')) {
        if (options.onProgress) options.onProgress(20, text);
      } else if (text.includes('Success')) {
        if (options.onProgress) options.onProgress(99, text);
      }
    });

    proc.stderr.on('data', (data) => {
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
