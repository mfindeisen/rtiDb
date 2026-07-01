# Stage 1: Build C++ Binary
FROM alpine:3.19 AS cpp-builder
RUN apk add --no-cache qt5-qtbase-dev g++ make
WORKDIR /build
# Copy only the C++ source first
COPY lib/webGLRTIMaker-src .
RUN rm -rf release debug *.o Makefile* && qmake-qt5 webGLRtiMaker.pro && make

# Stage 2: Node.js Server
FROM node:20-alpine
WORKDIR /app

# Install runtime dependencies: python/make/g++ for sqlite3, qt5-qtbase for C++ binary
RUN apk add --no-cache python3 make g++ qt5-qtbase qt5-qtbase-x11

# Install pnpm and dependencies
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile || pnpm install

COPY . .

# Copy compiled binary from stage 1
COPY --from=cpp-builder /build/webGLRtiMaker /app/lib/webGLRTIMaker-src/webGLRtiMaker
RUN chmod +x /app/lib/webGLRTIMaker-src/webGLRtiMaker

# Expose port
EXPOSE 3000

# Start server
CMD ["pnpm", "run", "start"]
