import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about/index.html'),
        privacy: resolve(import.meta.dirname, 'privacy/index.html'),
        legal: resolve(import.meta.dirname, 'legal/index.html'),
        cookies: resolve(import.meta.dirname, 'cookies/index.html'),
      },
    },
  },
});
