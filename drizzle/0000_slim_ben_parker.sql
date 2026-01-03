CREATE TABLE `quotes` (
	`id` text PRIMARY KEY NOT NULL,
	`symbol` text,
	`bid` real,
	`ask` real,
	`change` text,
	`changePercent` text,
	`low` real,
	`high` real,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text,
	`login` text,
	`brokerId` text,
	`serverId` text,
	`serverName` text,
	`accountTypeId` text,
	`accountTypeName` text,
	`balance` text,
	`role` text,
	`updatedAt` text
);
