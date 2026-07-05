CREATE TABLE `image_search_cache` (
  `content_hash` text NOT NULL,
  `result_limit` integer NOT NULL,
  `results` text NOT NULL,
  `total` integer NOT NULL DEFAULT 0,
  `catalog_count` integer NOT NULL DEFAULT 0,
  `created_at` text NOT NULL,
  `last_used_at` text NOT NULL,
  `hit_count` integer NOT NULL DEFAULT 0,
  PRIMARY KEY (`content_hash`, `result_limit`)
);
