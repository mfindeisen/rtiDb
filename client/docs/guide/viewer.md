# modernRtiViewer

The Modern RTI Viewer is a rewrite of traditional `spidergl` RTI viewers, using Vue 3 and Three.js. It ships as a standalone web component (`<modern-rti-viewer>`) that rtiDb embeds on the record page.

## Run locally

```bash
pnpm install
pnpm run dev
```

Vite usually serves the demo app at `http://localhost:5173`. Unit tests: `pnpm test`. Playwright smoke test: `pnpm test:e2e`.

## Loading a dataset

Pass a URL that points to either:

- A **directory** containing `info.json` or `info.xml` plus hierarchical image tiles, or
- A single **GeoTIFF** (`.tif` / `.tiff`) produced by `rtiprep -tiff`

GeoTIFF decoding (`geotiff.js`) is loaded on demand — JPEG-tile datasets never download it.

Prepare source `.rti` / `.ptm` files with [rtiprep](/guide/rtiprep). Neural RTI needs a latent map plus decoder weights (see [neural_rti](/guide/neural-rti)).

## Feature config

Tools and render modes are controlled by `src/viewerConfig.json`. Set a feature to `false` to hide it from the sidebar, export dialog, and keyboard shortcuts. `experimental` lists features that show an Experimental badge (line drawing and 3D mesh preview by default).

```json
{
  "features": {
    "lineDrawing": true,
    "meshPreview": true
  },
  "experimental": ["lineDrawing", "meshPreview"]
}
```

Hosts can override the bundled file at runtime:

- Vue prop: `:features="{ lineDrawing: false }"`
- Web component: `features='{"lineDrawing":false}'`

`annotation-enabled` still gates annotate mode per session, even when the `annotations` feature is on.

## Interface modes

1. **Pan & Zoom (hand):** drag to pan, scroll/pinch to zoom. The quadtree loads higher-resolution tiles as you zoom in. Pointer events cover mouse and touch, including the compass widget.
2. **Light direction (lightbulb):** drag on the canvas to change the lighting angle (PTM, HSH, or Neural MLP). The compass in the corner shows `(x, y)` and is also draggable.
3. **White balance / annotate / measure** appear when enabled in config and by the host (`annotation-enabled`, `scale-editable`).

## Render modes

- **Default** — diffuse reflectance from RTI coefficients or the Neural MLP
- **Specular enhancement / glossy** — Blinn-Phong highlight on top of diffuse lighting
- **Normals** — surface normals from coefficients, or finite differences for Neural RTI
- **Slope heatmap** — steepness as a blue→red gradient (useful for shallow engraving)
- **Dual light** — opposing raking lights, primary tinted red and secondary blue
- **Line drawing (experimental)** — ridges and valleys from photometric normals
- **Latent map (Neural RTI only)** — raw latent RGB
- **3D mesh preview (experimental)** — surface preview from normals

## Keyboard (viewer focused)

`H` pan, `L` light, `W` white balance, `A` annotate, `1`–`5` render modes, arrows nudge light, `+`/`-` zoom, `F` fit, `S` snapshot, `Esc` back to pan.

## Web component API

The element dispatches `rti-loaded`, `annotation-create` / `annotation-click`, `view-change`, and `rti-export`.

It accepts `rti-command` events: `set-annotations`, `restore-view`, `resize`, `select-annotation`, `set-light`, `set-render-mode`, `set-interaction-mode`, `fit`, `export`.

Observed attributes (`url`, `share-url`, `annotation-enabled`, `scale-editable`, `tile-format`, `debug`, `features`) are reactive.

See [Architecture](/technical/architecture) for the composable layout, shaders, and testing notes.
