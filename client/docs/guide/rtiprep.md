# rtiprep

`rtiprep` is a high-performance command-line utility written in Go designed to prepare Reflectance Transformation Imaging (RTI) datasets—such as Polynomial Texture Maps (PTM) and Hemispherical Harmonics (HSH)—as well as standard images for web-based multi-resolution visualization.

It slices large multi-layer images into hierarchical image pyramid tiles or packages them into a single, tiled pyramidal TIFF (Cloud Optimized GeoTIFF) containing embedded spatial/luminance coefficient metadata.

## Key Features

- **Format Support:** Supports `.ptm`, `.rti`, `.jpg`, `.jpeg`, `.png`, `.tif`, and `.tiff` as inputs.
- **Pyramid Tiling:** Recursively divides layers into standard tiles (default 256x256 px) with 1-pixel neighbor borders (seam border padding) to ensure seamless blending at tile boundaries in WebGL.
- **Pyramidal TIFF Export:** Combines all layers as chunky interleaved channels in a single pyramidal TIFF file.
- **Neural RTI Integration:** Embed decoder neural network weights directly into the pyramidal TIFF metadata (`ImageDescription` tag) for GeoTIFF-based web renderers.

## Installation

Ensure you have [Go](https://go.dev/) (version 1.18+) installed:

```bash
git clone https://github.com/mfindeisen/rtiprep.git
cd rtiprep
go build -o rtiprep
```

## CLI Parameters

```bash
./rtiprep [options] <input_file>
```

- `-t <size>`: Size of the output tiles in pixels (default: 256).
- `-q <quality>`: Quality of saved JPEG tiles (default: 90).
- `-p`: Save output tiles as PNG instead of JPEG.
- `-o <path>`: Output destination directory/file.
- `-tiff`: Save output as a single, tiled pyramidal TIFF file.
- `-weights <path>`: Path to a Neural RTI decoder weights JSON file.
