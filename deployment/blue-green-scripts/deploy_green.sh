#!/bin/bash

IMAGE="$1"
GREEN_PORT=5002

echo "Stopping old GREEN (if exists)..."
docker rm -f backend_green 2>/dev/null || true

echo "Starting new GREEN container..."
docker run -d \
  --name backend_green \
  --network app_ecom-network \
  -p ${GREEN_PORT}:5000 \
  -e PORT=5000 \
  -e MONGODB_URI="mongodb://root:example@mongodb:27017/ecommerce?authSource=admin" \
  -e JWT_SECRET="your-secret-here" \
  "$IMAGE"

echo "Waiting for GREEN health check..."
for i in {1..10}; do
  if curl -fs http://localhost:${GREEN_PORT}/api/health >/dev/null; then
    echo "GREEN is healthy!"
    exit 0
  fi
  sleep 2
done

echo "GREEN failed health check!"
exit 1