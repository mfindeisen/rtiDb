CREATE TABLE IF NOT EXISTS `records` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `name` text NOT NULL,
  `description` text DEFAULT '',
  `date` text NOT NULL,
  `status` text DEFAULT 'processing' NOT NULL,
  `progress` integer DEFAULT 0,
  `message` text,
  `direction` text DEFAULT 'ltr',
  `output_type` text DEFAULT 'tiles',
  `folder_url` text,
  `tiff_url` text,
  `thumbnail_url` text,
  `is_published` integer DEFAULT 0,
  `original_file_path` text,
  `weights_file_path` text,
  `quality` integer,
  `tile_size` integer,
  `format` text
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `users` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `username` text NOT NULL,
  `password_hash` text NOT NULL,
  `role` text DEFAULT 'editor' NOT NULL,
  `permissions` text DEFAULT '[]' NOT NULL
);

--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `users_username_unique` ON `users` (`username`);
