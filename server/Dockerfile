# Stage 1: Build Go rtiprep binary
FROM golang:1.22-alpine AS go-builder
WORKDIR /build
COPY deps/rtiprep/go.mod deps/rtiprep/go.sum ./
RUN go mod download
COPY deps/rtiprep/ .
RUN CGO_ENABLED=0 GOOS=linux go build -o rtiprep .

# Stage 2: Node.js Server (Debian slim — onnxruntime-node needs glibc, not Alpine musl)
FROM node:20-bookworm-slim
WORKDIR /repo

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ unzip ca-certificates \
  && rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm

COPY pnpm-workspace.yaml package.json ./
COPY packages/shared packages/shared
COPY server/package.json server/pnpm-lock.yaml* server/.npmrc* server/

RUN pnpm install --filter server... --frozen-lockfile || pnpm install --filter server...

COPY server server

ENV TRANSFORMERS_CACHE=/repo/server/.clip-model-cache
RUN cd server && pnpm exec tsx --input-type=module -e "import { warmupClipModel } from './lib/imageEmbeddings.js'; await warmupClipModel(); console.log('CLIP model cached');"

COPY --from=go-builder /build/rtiprep /repo/server/lib/rtiprep/rtiprep
RUN chmod +x /repo/server/lib/rtiprep/rtiprep

WORKDIR /repo/server
EXPOSE 3000
CMD ["pnpm", "run", "start"]
