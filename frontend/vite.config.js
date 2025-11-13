import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '', 'VITE_');

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/uploads': {
          target: env.VITE_API_URL,
          changeOrigin: true
        }
      }
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.js',
      css: true,
    },
  };
});
