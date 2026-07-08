# Stage 1: Build modernRtiViewer from submodule
FROM node:20-alpine AS viewer-build
WORKDIR /viewer
COPY deps/modernRtiViewer/package.json deps/modernRtiViewer/pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile || pnpm install
COPY deps/modernRtiViewer/ .
RUN pnpm run build

# Stage 2: Build rtiDb client
FROM node:20-alpine AS build
WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-workspace.yaml package.json ./
COPY packages/shared/package.json packages/shared/
COPY client/package.json client/pnpm-lock.yaml* ./client/

RUN pnpm install --filter client... --frozen-lockfile || pnpm install --filter client...

COPY packages/shared packages/shared
COPY client client
COPY --from=viewer-build /viewer/dist ./client/public/modern-viewer

WORKDIR /app/client
RUN pnpm run build && pnpm run build:docs

# Stage 3: NGINX
FROM nginx:alpine
COPY --from=build /app/client/dist /usr/share/nginx/html
COPY client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
