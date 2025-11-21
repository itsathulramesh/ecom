############################
# Stage 1: Build the app
############################
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

############################
# Stage 2: Serve with Nginx
############################
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Add custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint script and make it executable
COPY scripts/entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Use the entrypoint script
ENTRYPOINT ["/docker-entrypoint.sh"]
