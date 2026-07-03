# rtiDb

`rtiDb` is a comprehensive database management system and web application for cataloging, uploading, and managing Reflectance Transformation Imaging (RTI) records.

It consists of two main parts:
- **Server:** A Node.js and Express backend that stores scan metadata in a SQLite database and handles file uploads (including multi-gigabyte RTI and TIFF files).
- **Client:** A Vue 3 frontend that offers a responsive dashboard to browse records, view processing statuses, and launch interactive RTI viewers.

## Features

- **Database Cataloging:** Store detailed scan metadata (name, date, description, physical measurements).
- **Large File Uploads:** Supports uploading massive files (up to 5GB) directly through the browser.
- **Processing Pipelines:** Integrates with backend tools to process raw uploads into web-ready formats.
- **Embedded Viewers:** Seamlessly embeds both the **Modern Three.js Viewer** (for tiled Pyramidal TIFFs and folders) and legacy viewers.

## Docker Deployment

`rtiDb` is fully dockerized and can be launched using Docker Compose:

```bash
docker compose up -d --build
```

This starts the Node server container, the Vue client container, and links them within the local network.
