import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: 'named',
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
  ],
  base: '/tx-builder/',
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  server: {
    host: '0.0.0.0',
    port: 3005,
    open: false,
    allowedHosts: ['safe.hpp.io', 'host.docker.internal', 'safe.hayarobipark.local'],
  },
  preview: {
    port: 4000,
  },
})
