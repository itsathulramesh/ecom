#!/bin/sh

# Determine the API_URL based on NODE_ENV
if [ "$NODE_ENV" = "production" ]; then
  if [ -f "./.env.production" ]; then
    . "./.env.production"
  fi
  API_URL=${VITE_API_URL:-https://api.yourproductiondomain.com}
else
  if [ -f "./.env.development" ]; then
    . "./.env.development"
  fi
  API_URL=${VITE_API_URL:-http://localhost:5000}
fi

echo "Setting runtime API_URL to: $API_URL"

# For local dev builds
if [ -d "./public" ]; then
  echo "window.RUNTIME_CONFIG = { API_URL: \"$API_URL\" };" > ./public/config.js
fi

# For production builds served by nginx
if [ -f "/usr/share/nginx/html/config.js" ]; then
  echo "window.RUNTIME_CONFIG = { API_URL: \"$API_URL\" };" > /usr/share/nginx/html/config.js
  echo "Injected API_URL into /usr/share/nginx/html/public/config.js"
fi

# Run nginx or any passed command
exec "$@"
