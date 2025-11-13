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
# Stage 2: Serve with Nginx + Runtime Config
############################
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Copy built files
COPY --from=builder /app/dist ./

# Add a default runtime-config file
COPY public/config.js ./config.js

# Add custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the entrypoint script and make it executable
COPY entry.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Entrypoint
ENTRYPOINT []
CMD ["nginx", "-g", "daemon off;"]
