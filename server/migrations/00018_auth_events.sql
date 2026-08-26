CREATE TABLE `auth_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text NOT NULL,
	`event` text NOT NULL,
	`user_id` integer,
	`username` text NOT NULL,
	`ip` text,
	`user_agent` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `auth_events_created_idx` ON `auth_events` (`created_at`);
--> statement-breakpoint
CREATE INDEX `auth_events_user_idx` ON `auth_events` (`user_id`);
--> statement-breakpoint
CREATE INDEX `auth_events_event_idx` ON `auth_events` (`event`);
