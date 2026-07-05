# Stage 1: Build rtiprep Go Binary
FROM golang:1.22-alpine AS go-builder
WORKDIR /build
# Copy Go project source from rtiprep sibling folder
COPY rtiprep/go.mod rtiprep/go.sum ./
RUN go mod download
COPY rtiprep/ .
RUN CGO_ENABLED=0 GOOS=linux go build -o rtiprep .

# Stage 2: Node.js Server (Debian slim — onnxruntime-node needs glibc, not Alpine musl)
FROM node:20-bookworm-slim
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ unzip ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Install pnpm and dependencies
COPY rtiDb/server/package.json rtiDb/server/pnpm-lock.yaml* rtiDb/server/.npmrc* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile || pnpm install

COPY rtiDb/server .

# Pre-download CLIP weights into the image (no runtime download needed)
ENV TRANSFORMERS_CACHE=/app/.clip-model-cache
RUN node --input-type=module -e "import { warmupClipModel } from './lib/imageEmbeddings.js'; await warmupClipModel(); console.log('CLIP model cached');"

# Copy compiled Go binary from Stage 1
COPY --from=go-builder /build/rtiprep /app/lib/rtiprep/rtiprep
RUN chmod +x /app/lib/rtiprep/rtiprep

# Expose port
EXPOSE 3000

# Start server
CMD ["pnpm", "run", "start"]
