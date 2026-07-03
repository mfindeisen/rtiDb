# neural_rti (Python Pipeline)

`neural_rti` is a PyTorch-based pipeline designed for compressing and evaluating Reflectance Transformation Imaging (RTI) datasets—specifically Hemispherical Harmonics (HSH)—using Neural RTI.

Instead of storing large PTM or HSH polynomial coefficient maps, this pipeline trains a tiny Multi-Layer Perceptron (MLP) decoder alongside a compact spatial latent grid (latent map image). This representation can then be rendered in real-time in WebGL-based viewers.

## Installation

Install the required dependencies:

```bash
pip install -r requirements.txt
```

## Pipelines

### 1. Training (`train.py`)

Compresses an `.rti` file and outputs the latent map and decoder weights:

```bash
python train.py --input path/to/your/file.rti --output-dir output --epochs 50 --latent-dim 4
```

- `--input`: Path to the input `.rti` file.
- `--output-dir`: Directory where weights and latent maps will be saved.
- `--epochs`: Number of training epochs.
- `--latent-dim`: Dimension of the latent space (default: 4 channels).

### 2. Evaluation (`evaluate.py`)

Evaluates the reconstruction quality (MSE and PSNR in dB) of the trained representation against the original HSH file:

```bash
python evaluate.py --input path/to/your/file.rti --weights output/decoder_weights.json --latent output/latent_map.png
```
