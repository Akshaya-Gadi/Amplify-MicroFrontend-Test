import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('BILLING_REMOTE_URL', process.env.VITE_BILLING_REMOTE_URL);
console.log('CLAIMS_REMOTE_URL', process.env.VITE_CLAIMS_REMOTE_URL);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Remote URLs are injected at BUILD time. On Amplify, set these env vars per
  // environment so the shell points at the right deployed remoteEntry.js files.
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const BILLING = env.VITE_BILLING_REMOTE_URL || 'http://localhost:5001/assets/remoteEntry.js';
  const CLAIMS = env.VITE_CLAIMS_REMOTE_URL || 'http://localhost:5002/assets/remoteEntry.js';

  return {
    plugins: [
      react(),
      federation({
        name: 'shell',
        remotes: {
          billing: BILLING,
          claims: CLAIMS,
        },
        // Singletons: every module reuses the shell's copy of these so there is
        // ever only ONE React, ReactDOM and Router instance on the page.
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
    server: { port: 5000, strictPort: true },
    preview: { port: 5000, strictPort: true },
    build: {
      target: 'esnext',
      modulePreload: false,
      cssCodeSplit: false,
    },
  };
});
