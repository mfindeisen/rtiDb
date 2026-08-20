CREATE TABLE `upload_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`field` text NOT NULL,
	`original_name` text NOT NULL,
	`size_bytes` integer NOT NULL,
	`received_bytes` integer DEFAULT 0 NOT NULL,
	`temp_path` text NOT NULL,
	`final_path` text,
	`status` text DEFAULT 'receiving' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `upload_sessions_user_idx` ON `upload_sessions` (`user_id`);
--> statement-breakpoint
CREATE INDEX `upload_sessions_status_idx` ON `upload_sessions` (`status`);
