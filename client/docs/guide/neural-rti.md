# neural_rti (Python pipeline)

`neural_rti` is an **experimental** PyTorch pipeline for compressing Hemispherical Harmonics (HSH) RTI datasets.

Instead of storing large polynomial or harmonic coefficient maps, it trains a small Multi-Layer Perceptron (MLP) decoder together with a compact spatial latent grid. The result can be rendered in real time in WebGL (modernRtiViewer / rtiDb).

## Installation

Python 3.8+ (use a CUDA build of PyTorch for GPU training):

```bash
pip install -r requirements.txt
```

## Training

```bash
python train.py --input path/to/your/file.rti --output-dir output --epochs 50 --latent-dim 4
```

| Argument | Default | Description |
|---|---|---|
| `--input` | *required* | Input `.rti` file |
| `--output-dir` | `output` | Where weights and latent maps are written |
| `--epochs` | `50` | Training epochs |
| `--steps-per-epoch` | `1000` | Random sampling steps per epoch |
| `--lr` | `0.005` | Learning rate |
| `--latent-dim` | `4` | Latent channels (4 matches RGBA PNG) |
| `--resize` | `0` | Resize before training (`0` = original size) |
| `--num-lights` | `64` | Sampled hemispherical lights |
| `--batch-size` | `262144` | Random pixels per step |

Outputs:

- `decoder_weights.json` — MLP weight matrices and biases (`w1`/`b1` … `w3`/`b3`)
- `latent_map.png` — 4-channel RGBA latent grid

## Evaluation

MSE and PSNR against the original HSH file:

```bash
python evaluate.py --input path/to/your/file.rti --weights output/decoder_weights.json --latent output/latent_map.png
```

## From training to the catalog

1. Package with [rtiprep](/guide/rtiprep): `rtiprep -tiff -weights decoder_weights.json latent_map.png`
2. In rtiDb Admin → Upload, choose **Neural RTI** and attach the latent PNG plus weights JSON (the server runs `rtiprep -tiff` for you)
3. The viewer evaluates the MLP in the fragment shader — see [Neural RTI architecture](/technical/neural-rti) and the [case study](/technical/case-study)
