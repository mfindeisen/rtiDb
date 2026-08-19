# rtiprep

`rtiprep` is a Go CLI that prepares Reflectance Transformation Imaging datasets (PTM and HSH) and standard images for web multi-resolution viewing.

It slices multi-layer images into hierarchical pyramid tiles (JPEG, PNG, or WebP) or packs them into a single tiled pyramidal TIFF (Cloud Optimized GeoTIFF-like) with coefficient metadata. Neural RTI decoder weights can be embedded in the TIFF `ImageDescription` tag.

## Viewer compatibility

Outputs are meant to be served statically:

- [modernRtiViewer](https://github.com/mfindeisen/modernRtiViewer) — JPEG/PNG/WebP pyramids (`info.json`) and tiled pyramidal TIFFs
- [OpenLIME](https://github.com/cnr-isti-vclab/openlime) — with `-openlime`, an extra `openlime/` DeepZoom export

`rtiDb` runs this binary after each upload (tile mode also passes `-legacy` and `-openlime`).

## Features

- **Inputs:** `.ptm`, `.rti`, `.jpg`, `.jpeg`, `.png`, `.tif`, `.tiff`
- **Pyramid tiling:** default 256×256 tiles with 1-pixel seam padding for WebGL blending
- **Pyramidal TIFF:** all layers as chunky interleaved channels in one file
- **Neural RTI:** embed decoder weights JSON in TIFF metadata
- **Auto white balance:** per-channel `colorGain` via white-patch on a nadir preview (`-wb`)
- **Parallel processing** with Go goroutines

## Installation

Go 1.18+ (1.22 is used in the rtiDb Docker image):

```bash
git clone https://github.com/mfindeisen/rtiprep.git
cd rtiprep
go build -o rtiprep
```

Inside rtiDb, `pnpm run prepare:deps` / `pnpm run build:rtiprep` builds the submodule at `deps/rtiprep`.

## CLI

```bash
./rtiprep [options] <input_file>
```

| Flag | Default | Description |
|---|---|---|
| `-t <size>` | `256` | Tile size in pixels |
| `-q <quality>` | `90` | JPEG/WebP quality (1–100) |
| `-p` | `false` | PNG tiles (deprecated; prefer `-format png`) |
| `-format <fmt>` | `jpg` | Tile format: `jpg`, `png`, or `webp` |
| `-o <path>` | *auto* | Output directory (or TIFF file path with `-tiff`) |
| `-tiff` | `false` | Single tiled pyramidal TIFF instead of a folder |
| `-legacy` | `false` | Also write `info.xml` for the legacy WebRTIViewer |
| `-openlime` | `false` | Native OpenLIME DeepZoom export under `openlime/` |
| `-weights <path>` | | Neural RTI decoder weights JSON to embed in TIFF metadata |
| `-wb <mode>` | `auto` | White-balance: `auto`, `off`, or `r,g,b` gains (`colorGain` in `info.json` / TIFF description) |

## Examples

JPEG pyramid (default). Auto white-balance is stored as `content.colorGain`:

```bash
./rtiprep object.ptm
```

WebP tiles:

```bash
./rtiprep -format webp -q 85 object.rti
```

PNG tiles with custom size:

```bash
./rtiprep -format png -t 512 -o output_tiles object.rti
```

Pyramidal TIFF:

```bash
./rtiprep -tiff object.rti
```

Neural RTI TIFF (latent map image + weights):

```bash
./rtiprep -tiff -weights weights.json object.png
```

Override white balance:

```bash
./rtiprep -wb off object.rti
./rtiprep -wb 1.15,0.95,1.05 object.rti
```

Neural RTI overviews must use nearest-neighbour downsampling and an `NRGBA` canvas so latent channels are not alpha-premultiplied. See [Neural RTI architecture](/technical/neural-rti).
