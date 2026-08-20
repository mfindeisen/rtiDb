# rtiDb

`rtiDb` is the catalog and web application for uploading, processing, and managing Reflectance Transformation Imaging (RTI) records.

It is a pnpm workspace:

- **Server** — Node.js / Express 5 / TypeScript. Metadata lives in SQLite (Drizzle ORM). Uploads are processed by the `rtiprep` binary into web-ready tiles or a pyramidal GeoTIFF.
- **Client** — Vue 3 dashboard: gallery, record viewer, advanced search, and admin (all behind login).
- **`@rtidb/shared`** — catalog schema, permissions, site config, and API types used by both sides.

## Features

- Configurable **record types** with custom metadata field schemas
- **Catalog views** that control gallery columns, default sort, and filters
- **Site branding** (name, tagline, logo, favicon, brand colors) and date/time formats
- JWT sessions (httpOnly cookie) with roles and permissions
- Upload `.rti` / `.ptm` / `.hsh`, or Neural RTI (latent PNG + decoder JSON)
- Processing queue with live SSE progress bars
- Embedded **modernRtiViewer** for PTM, HSH, and Neural RTI
- Annotations, comments, private notes, and revision history
- Full-text / metadata / map search and CLIP **image similarity**
- Record export: JSON, XML, CSV, BibTeX, RIS, IIIF
- Download of the archived original RTI / PTM / HSH (or neural latent map + weights)

## Docker

```bash
docker compose up -d --build
```

This starts the Node server and the nginx-served Vue client. Persistent SQLite data and generated tiles are stored in Docker volumes `rtidb_data` and `rtidb_uploads`.

See [Getting Started](/guide/getting-started) for local development and environment variables.

## Catalog model

### Record types

Admins define **record types** (Admin → Catalog). Each type has a JSON schema of sections and fields:

| Field type | Use |
|---|---|
| `text` / `textarea` | Free text |
| `select` | Fixed options |
| `date` | Calendar date |
| `gps` | Coordinates (used on the search map) |
| `color` | Hex color |
| `url` | External link |

Fields can be flagged for **search filters** and **gallery columns**. The bundled default schema follows a seal-impression catalog (identification, archaeological context, physical description, iconography, and so on) and can be cloned or edited.

Records store type-specific values in a JSON `metadata` blob, plus core columns: name, description, slug, publish flag, processing status, output type, and optional scale calibration.

### Catalog views

A **view** is a named gallery layout: visible columns, sort field/direction, and optional filters. Views can be public or staff-only, and can be scoped to a record type. The gallery dropdown switches views; users can still tweak columns locally.

### Site settings

Admin → Site:

- **Branding** — site name, tagline, logo, favicon, primary and gradient colors (applied as CSS variables)
- **Date & time** — display formats such as `MM/DD/YYYY`, `DD.MM.YYYY`, ISO `YYYY-MM-DD`, and 12h/24h time
- **Citation name** — used in BibTeX / RIS / IIIF exports

## Auth & permissions

Sessions are JWTs stored in an httpOnly `adminToken` cookie (`SameSite=Lax`, 24h). The token only proves identity; each request reloads the user from SQLite, so deleted accounts and permission changes take effect immediately. Swagger and API clients may send `Authorization: Bearer <token>` instead.

| Role | Access |
|---|---|
| `admin` | All permissions; user management, catalog types, site settings |
| `editor` | Admin dashboard for records (upload / edit / delete according to flags) |
| `researcher` | Gallery, viewer, search; collaboration permissions only |

Granular flags: `upload_rti`, `edit_record`, `delete_record`, `manage_users`, `private_notes`, `annotate`, `comment`. Admins implicitly have every flag. Researchers default to notes, annotate, and comment.

The catalog is login-only. After sign-in, published records are visible to every role; drafts only to staff with `edit_record` (or admin/editor). Login is rate-limited (default 10 failures per IP per 15 minutes). The gallery loads one page at a time from `GET /api/records` (default 20). SQLite is snapshotted into `data/backups/` in production (startup + every 24 hours).

## Processing pipeline

1. Create a catalog record (metadata first) **or** upload a file that creates/attaches a record. Large RTI files are sent in 8 MiB chunks and can resume after a dropped connection.
2. Choose **tiles** (JPEG/PNG/WebP pyramid) or **GeoTIFF**. Neural RTI always produces a GeoTIFF with decoder weights in TIFF `ImageDescription`.
3. The job is queued (`processing_jobs`). `rtiprep` runs with live SSE progress. Staff can cancel a queued or running job from the admin record card; that kills `rtiprep` and leaves the record in error so it can be rerun.
4. A gallery thumbnail is generated (`sharp`) and a CLIP embedding is stored for image search (ONNX runs in a child process so the API stays responsive).
5. By default the original file is archived under `uploads/archive/` and can be downloaded from the record catalog tab (`KEEP_ORIGINAL_RTI=0` deletes it instead).

Tile mode also writes `info.json`, legacy `info.xml`, and an OpenLIME DeepZoom export.

## Record page

`/record/:slug` (numeric ids still work) has:

- **Viewer** — lighting, render modes, annotations overlaid on the RTI, optional scale bar
- **Metadata** — schema-driven catalog fields, original-file download, and export buttons
- **Discussion** — threaded comments
- **Notes** — private per-user notes (permission `private_notes`)
- **History** — revision snapshots with compare

Annotations are `point`, `circle`, or `rectangle`, each with a saved RTI view (light, camera, render mode). Visibility: **private**, **team**, or **published**. Staff can request OWL-ViT **auto-annotate** proposals from the thumbnail.

## Search

`/search` (authenticated):

- **Full-text** — case-insensitive substring over name, description, and all metadata
- **Filters** — per field from the record-type schema (including record type)
- **Map** — Leaflet markers from `gpsPosition`; optional bounding-box filter
- **Image search** — upload a photo; CLIP cosine similarity against published thumbnails (rate-limited)

The gallery search filters the currently visible columns only. Advanced search hits the server.

## Admin dashboard

`/admin` (editors and admins):

- **Records & Upload** — create drafts, upload RTI or Neural RTI, watch the queue, publish/unpublish
- **Catalog** — record types and gallery views
- **Site** — branding and date/time (admin only)
- **User Management** — create users, assign roles and permissions (admin only)

Record metadata is edited at `/admin/records/:id/edit`.
