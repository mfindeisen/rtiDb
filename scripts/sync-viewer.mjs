#!/usr/bin/env node
/**
 * Build modernRtiViewer and copy dist/ into client/public/modern-viewer/.
 *
 * Prefers the sibling workspace ../modernRtiViewer (local development).
 * Falls back to the git submodule at deps/modernRtiViewer.
 */
import { spawnSync } from 'child_process';
import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const siblingViewer = join(root, '..', 'modernRtiViewer');
const submoduleViewer = join(root, 'deps', 'modernRtiViewer');
const viewerRoot = existsSync(join(siblingViewer, 'package.json'))
  ? siblingViewer
  : submoduleViewer;
const dest = join(root, 'client', 'public', 'modern-viewer');

console.log(`Using viewer source: ${viewerRoot}`);

function run(cmd, args, cwd) {
  const result = spawnSync(cmd, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

if (!existsSync(join(viewerRoot, 'package.json'))) {
  console.error('modernRtiViewer not found (looked at ../modernRtiViewer and deps/modernRtiViewer).');
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
