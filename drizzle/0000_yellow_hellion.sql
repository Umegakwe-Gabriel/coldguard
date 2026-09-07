CREATE TABLE `pilot_signups` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`segment` text NOT NULL,
	`postal_code` text,
	`outage_experience` text,
	`consent` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_pilot_signups_email` ON `pilot_signups` (`email`);