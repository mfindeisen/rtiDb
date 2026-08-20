// Thumbnails and other image work stay in-process. CLIP/OWL-ViT run in
// lib/vision/worker.ts, which imports sharp before @huggingface/transformers.
import 'sharp';
import { loadConfig } from './config.js';
import { bootstrapDatabase, getSqlite } from './db.js';
import { createApp } from './app.js';
import { startBackupScheduler } from './lib/sqliteBackup.js';
import { shutdownVisionWorker } from './lib/vision/client.js';

const config = loadConfig();
bootstrapDatabase(config);
startBackupScheduler(getSqlite(), config);

const app = createApp(config);

app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => {
    shutdownVisionWorker();
    process.exit(0);
  });
}
