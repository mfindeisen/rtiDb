FROM node:20-alpine AS build

WORKDIR /app

# Install pnpm and dependencies
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile || pnpm install

COPY . .

# Build Vue app and documentation
RUN pnpm run build && pnpm run build:docs

# Setup NGINX
FROM nginx:alpine
RUN apk add --no-cache openssl && \
    openssl passwd -apr1 -salt rtidb "rtidb2026!" | { read hash; echo "admin:$hash"; } > /etc/nginx/.htpasswd
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
