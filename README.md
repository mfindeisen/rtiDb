# RTI Database (rtiDb)

A full-stack web application for uploading, processing, managing, and viewing Reflectance Transformation Imaging (RTI) datasets. 

This platform serves as a modern archive and viewer for archaeological and scientific RTI data (PTM and HSH formats), automatically converting massive, monolithic raw files into web-friendly, streamable multi-resolution image pyramids.

## Architecture & Tech Stack

The project is divided into a decoupled **Client** and **Server** architecture, containerized via Docker.

### 1. Client (Frontend)
- **Framework**: Vue 3 + Vite
- **Styling**: Tailwind CSS for a modern, responsive, glass-morphic UI.
- **Viewing Engine**: Integrates our custom [modernRtiViewer](https://github.com/mfindeisen/modernRtiViewer) as a standalone Web Component. The viewer handles all WebGL shader magic (Slope Heatmaps, Dual-Light Raking Light, dynamic normals) and Quadtree LOD (Level of Detail) loading for the images.
- **Real-Time Updates**: Consumes Server-Sent Events (SSE) to display live progress bars while the server processes gigabytes of uploaded RTI data.

### 2. Server (Backend)
- **Runtime**: Node.js with Express.js
- **Database**: SQLite (`better-sqlite3`) for lightweight, file-based data storage (`server/data/database.sqlite`).
- **File Uploads**: Uses `multer` to handle massive file uploads directly to the disk (`server/uploads/`).
- **Processing Pipeline**: A custom Node.js backend layer orchestrates the execution of compiled binaries to process and tile the uploaded files.

### 3. Core Processing & Tiling

The processing pipeline supports two format architectures for web-friendly delivery:
- **Classic JPEG Image Pyramids**: Uses the custom C++ compiler (`webGLRtiMaker` located in `server/lib/webGLRTIMaker-src/`). It parses `.rti`, `.ptm`, and `.hsh` binary formats, extracts the base diffuse layers and mathematical coefficients into standard image formats (JPEG/PNG), and slices them into hierarchical deep-zoom quadtree folders (e.g. `1_1.jpg`, `1_2.jpg`) along with an `info.xml` manifest.
- **Tiled Pyramidal TIFF (Cloud-Optimized GeoTIFF-like)**: Uses the Go-based [rtiprep](https://github.com/mfindeisen/rtiprep) utility. It packages the datasets into a single tiled pyramidal TIFF file with coefficients packed directly in the bands, which the client loads dynamically via HTTP Range Requests (saving massive bandwidth by only loading visible tile bytes).

## Setup & Deployment

The easiest way to run the entire stack is via Docker. The provided `docker-compose.yml` automatically compiles the C++ binary in an Alpine Linux container, builds the Vue client, and starts the Node server.

```bash
# Build and start the containers in the background
docker compose up -d --build

# The Client will be available at http://localhost:8080
# The Server API will be available at http://localhost:3000
```

*Note: Persistent data (the SQLite database and the generated image tiles) are mounted to Docker volumes (`server_data` and `server_uploads`), ensuring they survive container restarts.*

## Documentation Portal

A unified documentation portal built with VitePress is located under `client/docs/`. It documents all four components of this ecosystem:
1. **rtiDb:** Database server setup, configuration, and API schema.
2. **[modernRtiViewer](https://github.com/mfindeisen/modernRtiViewer):** WebGL shader mathematics, quadtree LOD rendering, and component integration.
3. **[rtiprep](https://github.com/mfindeisen/rtiprep):** CLI usage in Go for pyramid tiling and TIFF packaging.
4. **[neural_rti](https://github.com/mfindeisen/neural_rti):** Python training and evaluation pipeline for AI-based compression.

To build the documentation portal locally:
```bash
cd client
pnpm install
pnpm run build:docs
```
During Docker deployment, the documentation is automatically built and served at the `/docs/` path of your web app.

## Acknowledgements

- **Viewer Engine**: The frontend relies on [mfindeisen/modernRtiViewer](https://github.com/mfindeisen/modernRtiViewer).
- **Processing Engine**: The C++ code in `server/lib/webGLRTIMaker-src/` is `webGLRtiMaker`, originally authored by **Gianpaolo Palma** (Copyright © 2015). We also acknowledge the adaptations found in [jcupitt/webRTIViewer](https://github.com/jcupitt/webRTIViewer). We are extremely grateful for this foundational work in decoding and tiling RTI structures.
