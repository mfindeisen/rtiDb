#!/usr/bin/env node
/**
 * Compile deps/rtiprep into server/lib/rtiprep/ for local development.
 * Requires: Go toolchain, git submodules initialized.
 */
import { spawnSync } from 'child_process';
import { chmodSync, existsSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const rtiprepRoot = join(root, 'deps', 'rtiprep');
const outDir = join(root, 'server', 'lib', 'rtiprep');
const binName = process.platform === 'win32' ? 'rtiprep.exe' : 'rtiprep';
const outPath = join(outDir, binName);

if (!existsSync(join(rtiprepRoot, 'go.mod'))) {
  console.error('deps/rtiprep not found.');
  console.error('Run: git submodule update --init --recursive');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

console.log(`Building rtiprep -> ${outPath}...`);
const result = spawnSync(
  'go',
  ['build', '-o', outPath, '.'],
  { cwd: rtiprepRoot, stdio: 'inherit', shell: process.platform === 'win32' },
);

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

if (process.platform !== 'win32') {
  chmodSync(outPath, 0o755);
}

console.log('rtiprep build complete.');
