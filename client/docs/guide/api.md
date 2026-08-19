# REST API

The rtiDb server exposes a versioned REST API under `/api`. Interactive docs (Swagger UI) are at **`/api/docs`** (login required). The machine-readable spec is **`/api/openapi.json`**.

Discovery (no auth):

```bash
curl http://localhost:8090/api
```

## Authentication

1. `POST /api/login` with `{ "username", "password" }`
2. The response sets an httpOnly `adminToken` cookie and also returns `{ token, user }`
3. Browser calls send the cookie automatically (`credentials: include`)
4. For Swagger: click **Authorize** and paste the `token` (without a `Bearer` prefix)
5. API clients may send `Authorization: Bearer <token>`

`GET /api/auth/me` returns the current user. `POST /api/logout` clears the cookie.

Failed logins are rate-limited (HTTP 429 with `retryAfterSeconds`).

## Record identifiers

Records have a numeric `id` and a unique `slug` (from registration number or name). These work interchangeably in paths:

- `/api/records/42`
- `/api/records/DEMO-2024-SEAL-001`
- Viewer URL: `/record/DEMO-2024-SEAL-001`

`GET /api/records/lookup/{identifier}` resolves either form to the public record payload.

## Public catalog

| Method | Path | Notes |
|---|---|---|
| `GET` | `/api/records` | Paginated `{ total, page, limit, totalPages, results }`. Use `published=1` for the public catalog |
| `GET` | `/api/records/{id-or-slug}` | Full record |
| `GET` | `/api/records/{id-or-slug}/metadata` | Metadata only |
| `GET` | `/api/records/{id-or-slug}/rti` | Tile folder / GeoTIFF URLs for the viewer |
| `GET` | `/api/search` | `q`, `filters` (JSON), `bbox` (`west,south,east,north`), `recordTypeId` |

Metadata filters accept real field keys (`primaryMotif`, `culturalPeriod`, …) or aliases (`motif`, `period`, `iconography`).

## Exports

| Method | Path |
|---|---|
| `GET` | `/api/records/{id-or-slug}/export?format=json\|xml\|csv\|bibtex\|ris\|iiif` |
| `GET` | `/api/export/records?format=json\|xml\|csv&published=1` |

## Authenticated write APIs

JWT required. Permission checks apply (`upload_rti`, `edit_record`, `delete_record`, `annotate`, `comment`, `private_notes`, `manage_users`).

- **Records:** `POST /api/records`, `PUT /api/records/{id}`, publish/unpublish, delete, RTI upload
- **Processing:** job status and SSE progress
- **Revisions:** list and compare
- **Notes, comments, annotations**
- **Users** (admin)
- **Catalog:** record types, views, site config
- **Image search:** `POST /api/search/image` (multipart upload, rate-limited)

Uploads are served from `/static/uploads/…` with Range-request support for GeoTIFF tiles. Draft assets require a session; published assets are public.
