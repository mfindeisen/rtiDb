# rtiDb server

Express 5 API, SQLite catalog, and RTI processing pipeline. Part of the [rtiDb](../README.md) pnpm workspace.

## Stack

- Node.js, TypeScript (`tsx` / `nodemon` in development)
- Express 5, Drizzle ORM, `better-sqlite3`
- JWT sessions (`adminToken` httpOnly cookie; Bearer still accepted)
- `multer` uploads, `sharp` thumbnails, `rtiprep` for tiling
- Transformers.js (CLIP image search, OWL-ViT auto-annotate)
- Vitest unit tests, OpenAPI at `/api/docs`

## Development

From the repository root:

```bash
pnpm install
pnpm run prepare:deps    # builds deps/rtiprep into server/lib/rtiprep/
pnpm run dev:server      # http://localhost:3000
```

Or from this directory: `pnpm install && pnpm run dev`.

Default local admin is `admin` / `admin`. Copy `../.env.example` to `../.env` to override. Schema migrations run on startup from `migrations/`.

## Scripts

| Script | Description |
|---|---|
| `pnpm run dev` | Nodemon + `tsx` |
| `pnpm run start` | Production `tsx index.ts` |
| `pnpm run typecheck` | `tsc --noEmit` |
| `pnpm test` | Vitest |
| `pnpm run db:generate` | Drizzle Kit migration generate |
| `pnpm run backfill:embeddings` | Recompute CLIP embeddings for existing records |
