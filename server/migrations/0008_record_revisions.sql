CREATE TABLE `record_revisions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`record_id` integer NOT NULL,
	`revision_number` integer NOT NULL,
	`action` text NOT NULL,
	`snapshot` text NOT NULL,
	`changes` text,
	`comment` text,
	`created_by` integer,
	`created_by_name` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`record_id`) REFERENCES `records`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `record_revisions_record_rev_idx` ON `record_revisions` (`record_id`, `revision_number`);
--> statement-breakpoint
CREATE INDEX `record_revisions_record_idx` ON `record_revisions` (`record_id`);
