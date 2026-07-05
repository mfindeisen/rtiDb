ALTER TABLE `records` ADD `slug` text;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `records_slug_unique` ON `records` (`slug`);
