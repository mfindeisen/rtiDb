import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  log(`Starting C++ RTI Maker...`);

  return new Promise((resolve, reject) => {
    const binPath = path.resolve(__dirname, '../webGLRTIMaker-src/webGLRtiMaker');
    
    // Pass inputFile as a positional argument (first arg)
    const args = [inputFile, '-q', quality.toString(), '-t', tileSize.toString()];
    if (format === 'png') args.push('-p');

    const proc = spawn(binPath, args);

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
          console.log(`[C++] ${line.trim()}`);
        }
      }
    });

    proc.stderr.on('data', (data) => {
      console.error(`[C++ Error] ${data.toString()}`);
    });

    proc.on('close', (code) => {
      if (code === 0) {
        log(`Successfully generated web format in ${outputDir}`);
        if (options.onProgress) options.onProgress(100, "Processing complete!");
        resolve(outputDir);
      } else {
        reject(new Error(`webGLRtiMaker exited with code ${code}`));
      }
    });
    
    proc.on('error', (err) => {
      console.error('Failed to start C++ process:', err);
      reject(err);
    });
  });
}

export default processRTI;
