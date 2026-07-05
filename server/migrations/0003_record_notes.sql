CREATE TABLE `record_notes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`record_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`body` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`record_id`) REFERENCES `records`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `record_notes_record_user_idx` ON `record_notes` (`record_id`, `user_id`);
