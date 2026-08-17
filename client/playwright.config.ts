import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, devices } from '@playwright/test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const serverDir = path.join(repoRoot, 'server');

const serverPort = 3099;
const clientPort = 5198;
const baseURL = `http://127.0.0.1:${clientPort}`;

const e2eEnv = {
  NODE_ENV: 'development',
  DATA_DIR: path.join(serverDir, '.e2e-data'),
  PORT: String(serverPort),
  ADMIN_USERNAME: 'admin',
  ADMIN_PASSWORD: 'e2e-admin',
  JWT_SECRET: 'e2e-jwt-secret',
  AUTO_ANNOTATE_ENABLED: '0',
};

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'pnpm exec tsx index.ts',
      cwd: serverDir,
      env: e2eEnv,
      url: `http://127.0.0.1:${serverPort}/api/health`,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: `pnpm exec vite --host 127.0.0.1 --port ${clientPort} --strictPort`,
      cwd: __dirname,
      env: {
        ...process.env,
        VITE_DEV_API_PROXY: `http://127.0.0.1:${serverPort}`,
      },
      url: baseURL,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
});
