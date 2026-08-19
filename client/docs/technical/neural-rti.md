# Neural RTI & `rtiprep` Architecture

Neural RTI is a state-of-the-art representation format that replaces traditional mathematical fitting models (like Polynomials or Spherical Harmonics) with a compact neural network representation.

---

## 1. The Neural RTI Concept

Instead of storing large sets of coefficients (e.g., 16 coefficients for HSH) per pixel, Neural RTI splits the representation into two components:
1. **Latent Map (H x W x 4):** A 4-dimensional optimized latent grid texture stored as a standard 8-bit RGBA image. This map compresses the local geometric and reflectance properties of each pixel.
2. **Decoder MLP (Multilayer Perceptron):** A global, lightweight neural network (~13 KB JSON file, 448 parameters) shared by all pixels. 

During rendering, the shader evaluates the MLP feed-forward pass for each pixel:

$$
\mathbf{C} = \mathrm{DecoderMLP}(\mathbf{z}, \mathbf{l})
$$

where:

- $\mathbf{z}$ is the 4D latent vector fetched from the texture
- $\mathbf{l}$ is the 3D normalized light direction $(x, y, z)$

---

## 2. Packaging with `rtiprep`

The `rtiprep` command-line utility converts raw latent maps and decoder weights into a single pyramidal tiled **Cloud-Optimized GeoTIFF (COG)**. This file format allows the viewer to request individual 256x256 tiles of the latent map on-demand using HTTP Range Requests.

### Critical Downsampling Constraints

Pyramidal TIFFs store downscaled overviews of the image (LODs) to speed up rendering when zoomed out. However, downscaling a latent map poses a unique mathematical challenge:
* **No Bilinear Blending on CPU:** By default, image pyramids are built using bilinear interpolation. If we linearly average neighboring latent vectors, the blended values represent a "garbage" input to the non-linear decoder MLP, yielding black or corrupted pixels. `rtiprep` must use strict **Nearest-Neighbor downsampling** (`xDraw.NearestNeighbor`) for the overviews.
* **NRGBA Canvas Preservation:** Standard Go image scaling writes to `image.RGBA`, which uses alpha-premultiplication. This multiplies the first three latent channels (R, G, B) by the fourth channel (A), distorting the latent representation. `rtiprep` allocates an `image.NRGBA` canvas to bypass Go's draw library alpha conversion and keep values intact.

---

## 3. WebGL Real-Time Rendering

Once the client downloads the tiled GeoTIFF and weights, it streams them to the WebGL fragment shader.

### GPU Texture Filtering (Anti-Aliasing)
To achieve smooth rendering at high zoom levels, the loader uses bilinear interpolation (`LinearFilter`) on the GPU:
```javascript
if (this.rtiType === 5) {
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
}
```
Bilinear filtering on the spatial latent grid ensures smooth transitions and removes blocky/pixelated rendering artifacts.

### Estimating Pseudo-Normals (Finite Differences)
Because Neural RTI does not store physical surface coefficients directly, we compute intensity gradients at normal incidence $\mathbf{L}_0 = (0, 0, 1)$ on the GPU using **finite differences** ($\varepsilon = 0.005$) to support advanced visualization modes:

$$
\begin{aligned}
I_0 &= L\bigl(\mathrm{MLP}(\mathbf{z}, (0, 0, 1))\bigr) \\
I_x &= L\bigl(\mathrm{MLP}(\mathbf{z}, (\varepsilon, 0, \sqrt{1 - \varepsilon^2}))\bigr) \\
I_y &= L\bigl(\mathrm{MLP}(\mathbf{z}, (0, \varepsilon, \sqrt{1 - \varepsilon^2}))\bigr)
\end{aligned}
$$

$$
g_x = \frac{I_x - I_0}{\varepsilon},\qquad
g_y = \frac{I_y - I_0}{\varepsilon}
$$

The gradients are scaled (here by $4$) to enhance geometric detail, then normalized:

$$
\mathbf{N} = \mathrm{normalize}\,(-4 g_x,\, -4 g_y,\, 1)
$$

This normal vector is then used to compute specular highlights (Glossy), RGB normals (Normals Mode), or steepness heatmaps.
