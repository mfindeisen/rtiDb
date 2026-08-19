ALTER TABLE `records` ADD `record_type_id` integer;
--> statement-breakpoint
CREATE TABLE `site_settings` (
  `id` integer PRIMARY KEY NOT NULL,
  `config` text DEFAULT '{}' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `record_types` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `slug` text NOT NULL,
  `name` text NOT NULL,
  `description` text DEFAULT '',
  `is_default` integer DEFAULT 0 NOT NULL,
  `sort_order` integer DEFAULT 0 NOT NULL,
  `schema` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `record_types_slug_unique` ON `record_types` (`slug`);
--> statement-breakpoint
CREATE TABLE `catalog_views` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `record_type_id` integer,
  `name` text NOT NULL,
  `slug` text NOT NULL,
  `is_default` integer DEFAULT 0 NOT NULL,
  `is_public` integer DEFAULT 1 NOT NULL,
  `config` text NOT NULL,
  FOREIGN KEY (`record_type_id`) REFERENCES `record_types`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `catalog_views_slug_unique` ON `catalog_views` (`slug`);
