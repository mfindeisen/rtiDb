FROM node:20-alpine AS build

WORKDIR /app

# Install pnpm and dependencies
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile || pnpm install

COPY . .

# Build Vue app
RUN pnpm run build

# Setup NGINX
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
