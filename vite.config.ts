import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // In development, /api is proxied to mail-server (npm run dev in that folder).
    proxy: { '/api': { target: 'http://localhost:5000', changeOrigin: true } },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: { react: ['react', 'react-dom', 'react-router-dom'], motion: ['framer-motion'], forms: ['react-hook-form', 'zod', '@hookform/resolvers'] },
      },
    },
  },
});
