import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Enable source maps for debugging
  },
  server: {
    hmr: {
      overlay: true, // Shows errors in an overlay
    },
  },
})
