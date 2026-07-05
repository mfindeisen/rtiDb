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
COPY client/package.json client/pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile || pnpm install
COPY client/ .
COPY --from=viewer-build /viewer/dist ./public/modern-viewer
RUN pnpm run build && pnpm run build:docs

# Stage 3: NGINX
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
