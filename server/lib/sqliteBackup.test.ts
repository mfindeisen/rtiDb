import Database from 'better-sqlite3';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { backupFileName, backupSqliteDatabase, pruneBackups, runScheduledBackup } from './sqliteBackup.js';

describe('sqliteBackup', () => {
  let dir = '';

  beforeEach(async () => {
    dir = await fs.mkdtemp(path.join(os.tmpdir(), 'rti-backup-'));
  });

  afterEach(async () => {
    await fs.rm(dir, { recursive: true, force: true });
  });

  it('writes a restorable snapshot', async () => {
    const sourcePath = path.join(dir, 'source.sqlite');
    const source = new Database(sourcePath);
    source.exec('CREATE TABLE items (id integer primary key, name text); INSERT INTO items (name) VALUES (\'seal\');');
    const dest = path.join(dir, backupFileName());
    await backupSqliteDatabase(source, dest);
    source.close();

    const restored = new Database(dest, { readonly: true });
    const row = restored.prepare('SELECT name FROM items').get() as { name: string };
    expect(row.name).toBe('seal');
    restored.close();
  });

  it('keeps only the newest backups', async () => {
    const source = new Database(path.join(dir, 'source.sqlite'));
    source.exec('CREATE TABLE items (id integer primary key);');
    await runScheduledBackup(source, { backupDir: dir, backupKeep: 2 });
    await new Promise((resolve) => setTimeout(resolve, 20));
    await runScheduledBackup(source, { backupDir: dir, backupKeep: 2 });
    await new Promise((resolve) => setTimeout(resolve, 20));
    await runScheduledBackup(source, { backupDir: dir, backupKeep: 2 });
    source.close();

    await pruneBackups(dir, 2);
    const files = (await fs.readdir(dir)).filter((name) => name.startsWith('database-'));
    expect(files).toHaveLength(2);
  });
});
