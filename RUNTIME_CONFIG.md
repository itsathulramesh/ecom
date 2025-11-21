# Dynamic Backend URL Configuration

## How It Works (Simple!)

The frontend is built **once** with a static build, but the backend URL is configured **at runtime** when you start the container.

### The Magic ✨

1. **Build time**: The app is built normally with Vite
2. **Runtime**: When the container starts, a script creates `runtime-config.js` with your backend URL
3. **App**: Your React app reads `window.RUNTIME_CONFIG.API_URL`

## Usage

### Option 1: Build and Run with Docker Compose

```bash
cd deployment
docker-compose up --build
```

The backend URL is set via the `VITE_API_URL` environment variable in `docker-compose.yaml`:

```yaml
frontend:
  build: ../frontend
  environment:
    VITE_API_URL: "http://localhost:5000"  # Change this!
```

### Option 2: Use Prebuilt Image

1. **Build and push your image once:**

```bash
cd frontend
docker build -t your-registry/ecom-frontend:latest .
docker push your-registry/ecom-frontend:latest
```

2. **Update docker-compose.yaml:**

```yaml
frontend:
  # Comment out build
  # build: ../frontend
  
  # Use your prebuilt image
  image: your-registry/ecom-frontend:latest
  
  environment:
    # Set your backend URL here - this is ALL you need!
    VITE_API_URL: "http://your-backend-url:5000"
```

3. **Run it:**

```bash
docker-compose up
```

### Option 3: Run Container Directly

```bash
docker run -p 80:80 \
  -e VITE_API_URL="http://your-backend:5000" \
  your-registry/ecom-frontend:latest
```

## That's It! 🎉

Just set the `VITE_API_URL` environment variable when running your container. No rebuild needed!

## Files Involved

- **`scripts/entrypoint.sh`**: Creates runtime-config.js from environment variable
- **`index.html`**: Loads runtime-config.js before the app starts
- **`src/pages/*.jsx`**: Uses `window.RUNTIME_CONFIG.API_URL` to make API calls

## Example: Different Environments

**Development:**
```yaml
environment:
  VITE_API_URL: "http://localhost:5000"
```

**Staging:**
```yaml
environment:
  VITE_API_URL: "https://api-staging.yourcompany.com"
```

**Production:**
```yaml
environment:
  VITE_API_URL: "https://api.yourcompany.com"
```

Same image, different URLs! 🚀
