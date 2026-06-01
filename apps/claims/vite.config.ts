import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'claims',
      filename: 'remoteEntry.js',
      exposes: {
        './ClaimsApp': './src/ClaimsApp.tsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.2.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
        'react-router-dom': { singleton: true, requiredVersion: '^6.23.1' },
      },
    }),
  ],
  resolve: {
    alias: {
      '@mfe/design-system': resolve(__dirname, '../../packages/design-system/src'),
      '@mfe/event-bus': resolve(__dirname, '../../packages/event-bus/src'),
      '@mfe/shared-utils': resolve(__dirname, '../../packages/shared-utils/src'),
    },
  },
  server: { port: 5002, strictPort: true },
  preview: { port: 5002, strictPort: true },
  build: {
    target: 'esnext',
    modulePreload: false,
    cssCodeSplit: false,
  },
});
