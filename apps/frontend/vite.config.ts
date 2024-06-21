import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        manualChunks: {
          react: ['react', 'react-dom'],
          tanstack: [
            '@tanstack/react-router',
            '@tanstack/router-devtools',
            '@tanstack/react-query',
            '@tanstack/react-query-devtools',
            '@tanstack/react-table',
          ],
          ui: ['@repo/ui'],
        },
      },
    },
  },
  plugins: [react(), TanStackRouterVite(), tsconfigPaths()],
  preview: {
    port: 5173,
  },
});
