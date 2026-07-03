import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Run rtiprep (Go binary) on an RTI file to produce a single pyramidal TIFF.
 * @param {string} inputFile - Absolute path to the input .rti/.ptm file
 * @param {object} options   - { onProgress }
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
    // rtiprep binary is expected to be in the same lib directory as rtiprep/rtiprep
    //const binPath = path.resolve(__dirname, '../rtiprep/rtiprep');
    const binPath = path.resolve(__dirname, './rtiprep/rtiprep');

    const args = ['-tiff'];
    if (options.weightsPath) {
      args.push('-weights', options.weightsPath);
    }
    args.push('-o', outputFile, inputFile);
    const proc = spawn(binPath, args);

    proc.stdout.on('data', (data) => {
      const text = data.toString().trim();
      if (!text) return;
      console.log(`[rtiprep] ${text}`);

      // Parse optional progress lines: "Generating pyramidal tiled TIFF..."
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
