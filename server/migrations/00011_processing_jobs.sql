CREATE TABLE `processing_jobs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`record_id` integer NOT NULL,
	`job_type` text DEFAULT 'rti' NOT NULL,
	`status` text DEFAULT 'queued' NOT NULL,
	`position` integer DEFAULT 0 NOT NULL,
	`payload_json` text NOT NULL,
	`error` text,
	`created_at` text NOT NULL,
	`started_at` text,
	`finished_at` text,
	FOREIGN KEY (`record_id`) REFERENCES `records`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `processing_jobs_status_idx` ON `processing_jobs` (`status`);
--> statement-breakpoint
CREATE INDEX `processing_jobs_record_idx` ON `processing_jobs` (`record_id`);
