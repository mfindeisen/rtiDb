CREATE TABLE `record_annotations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`record_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`type` text NOT NULL,
	`geometry` text NOT NULL,
	`label` text,
	`color` text DEFAULT '#f59e0b',
	`rti_view` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`record_id`) REFERENCES `records`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `record_annotations_record_user_idx` ON `record_annotations` (`record_id`, `user_id`);
