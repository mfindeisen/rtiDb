#!/usr/bin/env node
/**
 * Build deps/modernRtiViewer and copy dist/ into client/public/modern-viewer/.
 * Requires: pnpm, git submodules initialized.
 */
import { spawnSync } from 'child_process';
import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const viewerRoot = join(root, 'deps', 'modernRtiViewer');
const dest = join(root, 'client', 'public', 'modern-viewer');

function run(cmd, args, cwd) {
  const result = spawnSync(cmd, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

if (!existsSync(join(viewerRoot, 'package.json'))) {
  console.error('deps/modernRtiViewer not found.');
  console.error('Run: git submodule update --init --recursive');
  process.exit(1);
}

console.log('Installing modernRtiViewer dependencies...');
run('pnpm', ['install'], viewerRoot);

console.log('Building modernRtiViewer...');
run('pnpm', ['run', 'build'], viewerRoot);

const distDir = join(viewerRoot, 'dist');
if (!existsSync(distDir)) {
  console.error(`Build output not found: ${distDir}`);
  process.exit(1);
}

console.log(`Syncing viewer assets to ${dest}...`);
rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });
cpSync(distDir, dest, { recursive: true });

console.log('modernRtiViewer sync complete.');
