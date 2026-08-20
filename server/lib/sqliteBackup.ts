import fs from 'fs/promises';
import path from 'path';
import type Database from 'better-sqlite3';

export function backupFileName(now = new Date()): string {
  const stamp = now.toISOString().replace(/[:.]/g, '-').replace(/Z$/, '');
  return `database-${stamp}.sqlite`;
}

export async function pruneBackups(backupDir: string, keep: number): Promise<void> {
  let entries: string[];
  try {
    entries = await fs.readdir(backupDir);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return;
    throw err;
  }

  const files = [];
  for (const name of entries) {
    if (!/^database-.*\.sqlite$/i.test(name)) continue;
    const full = path.join(backupDir, name);
    const stat = await fs.stat(full);
    if (stat.isFile()) files.push({ full, mtime: stat.mtimeMs });
  }

  files.sort((a, b) => b.mtime - a.mtime);
  for (const stale of files.slice(Math.max(1, keep))) {
    await fs.unlink(stale.full);
  }
}

export async function backupSqliteDatabase(
  sqlite: Database.Database,
  destPath: string,
): Promise<void> {
  await fs.mkdir(path.dirname(destPath), { recursive: true });
  await sqlite.backup(destPath);
}

export async function runScheduledBackup(
  sqlite: Database.Database,
  options: { backupDir: string; backupKeep: number },
): Promise<string> {
  const destPath = path.join(options.backupDir, backupFileName());
  await backupSqliteDatabase(sqlite, destPath);
  await pruneBackups(options.backupDir, options.backupKeep);
  return destPath;
}

export function startBackupScheduler(
  sqlite: Database.Database,
  config: {
    backupDir: string;
    backupIntervalMs: number;
    backupKeep: number;
    backupOnStartup: boolean;
  },
): () => void {
  const run = () => runScheduledBackup(sqlite, config).then((dest) => {
    console.log(`SQLite backup written to ${dest}`);
  }).catch((err) => {
    console.error('SQLite backup failed:', err);
  });

  if (config.backupOnStartup) {
    void run();
  }

  if (config.backupIntervalMs <= 0) {
    return () => {};
  }

  const timer = setInterval(run, config.backupIntervalMs);
  timer.unref?.();
  return () => clearInterval(timer);
}
