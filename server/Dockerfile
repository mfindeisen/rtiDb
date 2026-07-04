# Stage 1: Build rtiprep Go Binary
FROM golang:1.22-alpine AS go-builder
WORKDIR /build
# Copy Go project source from rtiprep sibling folder
COPY rtiprep/go.mod rtiprep/go.sum ./
RUN go mod download
COPY rtiprep/ .
RUN CGO_ENABLED=0 GOOS=linux go build -o rtiprep .

# Stage 2: Node.js Server
FROM node:20-alpine
WORKDIR /app

# Install runtime dependencies for Node.js modules like sqlite3
RUN apk add --no-cache python3 make g++

# Install pnpm and dependencies
COPY rtiDb/server/package.json rtiDb/server/pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile || pnpm install

COPY rtiDb/server .

# Copy compiled Go binary from Stage 1
COPY --from=go-builder /build/rtiprep /app/lib/rtiprep/rtiprep
RUN chmod +x /app/lib/rtiprep/rtiprep

# Expose port
EXPOSE 3000

# Start server
CMD ["pnpm", "run", "start"]
