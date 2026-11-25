import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) return 'three-vendor'
          if (id.includes('@react-three')) return 'r3f-vendor'
          if (id.includes('framer-motion')) return 'motion-vendor'
        },
      },
    },
  },
})
