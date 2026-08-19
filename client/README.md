# rtiDb client

Vue 3 frontend for the RTI Database: public gallery, record viewer, advanced search, and admin dashboard.

This package is part of the [rtiDb](../README.md) pnpm workspace. Shared types and catalog helpers come from `@rtidb/shared`.

## Stack

- Vue 3 (`<script setup>`) + Vue Router + TypeScript
- Vite 8, Tailwind CSS 4
- shadcn-vue / Reka UI, Lucide icons
- Embedded [`modern-rti-viewer`](https://github.com/mfindeisen/modernRtiViewer) web component
- Leaflet for spatial search
- Playwright e2e tests, VitePress docs under `docs/`

## Development

From the **repository root** (recommended):

```bash
pnpm install
pnpm run prepare:deps    # copies the built viewer into public/modern-viewer
pnpm run dev:client
```

Or from this directory:

```bash
pnpm install
pnpm run sync:viewer
pnpm run dev
```

Vite serves the app at `http://localhost:5173`. `/api` and `/static` are proxied to the server (`http://localhost:3000` by default, override with `VITE_DEV_API_PROXY`). `/docs` is proxied to VitePress (`http://127.0.0.1:5174`, started by `pnpm dev` or `pnpm run docs:dev`).

## Scripts

| Script | Description |
|---|---|
| `pnpm run dev` | Vite development server |
| `pnpm run docs:dev` | VitePress at http://127.0.0.1:5174/docs/ |
| `pnpm run build` | Production SPA build |
| `pnpm run build:docs` | VitePress → `dist/docs/` |
| `pnpm run typecheck` | `vue-tsc --noEmit` |
| `pnpm run test:e2e` | Playwright |

## Routes

| Path | Access |
|---|---|
| `/` | Public gallery |
| `/record/:slug` | Public record + RTI viewer |
| `/login` | Session login |
| `/search` | Advanced search (authenticated) |
| `/admin` | Records, catalog types/views, site branding, users |
| `/admin/records/:id/edit` | Record metadata editor |
