#!/bin/sh

# Get the backend URL from environment variable or use default
BACKEND_URL=${VITE_API_URL:-http://localhost:5000}

echo "Setting up runtime config with BACKEND_URL: $BACKEND_URL"

# Create runtime config file
cat > /usr/share/nginx/html/runtime-config.js << EOF
window.RUNTIME_CONFIG = {
  API_URL: "$BACKEND_URL"
};
EOF

echo "Runtime config created successfully"

# Start nginx
exec nginx -g "daemon off;"
