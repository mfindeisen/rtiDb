# Getting Started

This portal documents the **RTI ecosystem**: tools to prepare, compress, catalog, and interactively render Reflectance Transformation Imaging records.

## Components

| Project | What it does |
|---|---|
| **rtiDb** | Vue 3 + Express catalog: upload, process, search, annotate, and serve RTI scans |
| **modernRtiViewer** | WebGL viewer (Vue 3 / Three.js) for PTM, HSH, and Neural RTI, also as a web component |
| **rtiprep** | Go CLI that tiles `.ptm` / `.rti` files into JPEG pyramids or a pyramidal GeoTIFF |
| **neural_rti** | Experimental PyTorch pipeline that compresses HSH into a latent map + decoder MLP |

`rtiDb` vendors `rtiprep` and `modernRtiViewer` as git submodules under `deps/` and builds them during Docker and local setup.

## Run rtiDb with Docker

```bash
git clone --recurse-submodules https://github.com/mfindeisen/rtiDb.git
cd rtiDb
cp .env.example .env   # set ADMIN_PASSWORD and JWT_SECRET
docker compose up -d --build
```

The app is at [http://localhost:8090](http://localhost:8090). The API is proxied at `/api/`. Documentation is at `/docs/` (login required).

If you cloned without `--recurse-submodules`:

```bash
git submodule update --init --recursive
```

## Local development

Requires Node.js 22+, [pnpm](https://pnpm.io/), and [Go](https://go.dev/) (to compile `rtiprep`).

```bash
git submodule update --init --recursive
pnpm install
pnpm run prepare:deps    # build viewer web component + rtiprep binary
pnpm dev                 # client + server + docs
```

- Client: [http://localhost:5173](http://localhost:5173)
- Docs: [http://localhost:5173/docs/](http://localhost:5173/docs/)
- API: [http://localhost:3000](http://localhost:3000) (Vite proxies `/api` and `/static`)

Default development login is `admin` / `admin` unless `ADMIN_USERNAME` / `ADMIN_PASSWORD` are set.

## Next steps

- [rtiDb catalog & admin](/guide/rtidb) — gallery, catalog types, auth, search, collaboration
- [REST API](/guide/api) — OpenAPI, record identifiers, exports
- [modernRtiViewer](/guide/viewer) — lighting, render modes, embed API
- [rtiprep CLI](/guide/rtiprep) — tiling and GeoTIFF packaging
- [neural_rti](/guide/neural-rti) — training a Neural RTI representation
