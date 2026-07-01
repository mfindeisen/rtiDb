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
- **Processing Pipeline**: A custom Node.js wrapper (`server/lib/rti-maker`) orchestrates the execution of a compiled C++ binary to slice the images.

### 3. Core Processing (`webGLRtiMaker`)
The heart of the processing pipeline is written in C++ (using Qt5) and is located in `server/lib/webGLRTIMaker-src/`. 
- **What it does**: It parses the proprietary `.rti`, `.ptm`, and `.hsh` binary formats. It calculates base diffuse layers and stores the mathematical coefficients into standard image formats (JPEG/PNG). It then generates a hierarchical "deep-zoom" quadtree (folder structure of tiles like `1_1.jpg`, `1_2.jpg`) and an `info.xml` manifest.
- **Why**: Standard RTI files are often hundreds of megabytes in size. Browsers cannot load them directly without freezing. Slicing them into tiny tiles allows the `modernRtiViewer` to only load the pixels currently visible on the screen.

## Setup & Deployment

The easiest way to run the entire stack is via Docker. The provided `docker-compose.yml` automatically compiles the C++ binary in an Alpine Linux container, builds the Vue client, and starts the Node server.

```bash
# Build and start the containers in the background
docker compose up -d --build

# The Client will be available at http://localhost:8080
# The Server API will be available at http://localhost:3000
```

*Note: Persistent data (the SQLite database and the generated image tiles) are mounted to Docker volumes (`server_data` and `server_uploads`), ensuring they survive container restarts.*

## Acknowledgements

- **Viewer Engine**: The frontend relies on [mfindeisen/modernRtiViewer](https://github.com/mfindeisen/modernRtiViewer).
- **Processing Engine**: The C++ code in `server/lib/webGLRTIMaker-src/` is `webGLRtiMaker`, originally authored by **Gianpaolo Palma** (Copyright © 2015). We also acknowledge the adaptations found in [jcupitt/webRTIViewer](https://github.com/jcupitt/webRTIViewer). We are extremely grateful for this foundational work in decoding and tiling RTI structures.
