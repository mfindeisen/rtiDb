#!/usr/bin/env node
/**
 * Start API, Vite app, and VitePress docs together (Windows-safe).
 */
import { spawn } from 'node:child_process';

const children = [];

function run(label, args) {
  const child = spawn('pnpm', args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: { ...process.env, FORCE_COLOR: '1' },
  });
  child.on('error', (err) => {
    console.error(`[${label}] failed to start:`, err);
    shutdown(1);
  });
  child.on('exit', (code, signal) => {
    if (shuttingDown) return;
    if (signal) {
      shutdown(1);
      return;
    }
    if (code && code !== 0) {
      console.error(`[${label}] exited with code ${code}`);
      shutdown(code);
    }
  });
  children.push(child);
}

let shuttingDown = false;

function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) {
    if (!child.killed) child.kill();
  }
  process.exit(code);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

run('server', ['--filter', 'server', 'dev']);
run('client', ['--filter', 'client', 'dev']);
run('docs', ['--filter', 'client', 'docs:dev']);
