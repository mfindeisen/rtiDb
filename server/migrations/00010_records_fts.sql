CREATE INDEX IF NOT EXISTS `records_published_idx` ON `records` (`is_published`);
--> statement-breakpoint
CREATE VIRTUAL TABLE IF NOT EXISTS records_fts USING fts5(
  name,
  description,
  metadata,
  content='records',
  content_rowid='id'
);
--> statement-breakpoint
CREATE TRIGGER IF NOT EXISTS records_fts_ai AFTER INSERT ON records BEGIN
  INSERT INTO records_fts(rowid, name, description, metadata)
  VALUES (new.id, new.name, new.description, new.metadata);
END;
--> statement-breakpoint
CREATE TRIGGER IF NOT EXISTS records_fts_ad AFTER DELETE ON records BEGIN
  INSERT INTO records_fts(records_fts, rowid, name, description, metadata)
  VALUES('delete', old.id, old.name, old.description, old.metadata);
END;
--> statement-breakpoint
CREATE TRIGGER IF NOT EXISTS records_fts_au AFTER UPDATE ON records BEGIN
  INSERT INTO records_fts(records_fts, rowid, name, description, metadata)
  VALUES('delete', old.id, old.name, old.description, old.metadata);
  INSERT INTO records_fts(rowid, name, description, metadata)
  VALUES (new.id, new.name, new.description, new.metadata);
END;
--> statement-breakpoint
INSERT INTO records_fts(records_fts) VALUES('rebuild');
