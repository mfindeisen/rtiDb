CREATE INDEX IF NOT EXISTS `records_slug_lower_idx` ON `records` (lower(`slug`));
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `records_reg_lower_idx` ON `records` (lower(json_extract(`metadata`, '$.primaryRegistrationNumber')));
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `records_rti_filename_lower_idx` ON `records` (lower(json_extract(`metadata`, '$.rtiFileName')));
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `records_reg2_lower_idx` ON `records` (lower(json_extract(`metadata`, '$.secondaryRegistrationNumber')));
