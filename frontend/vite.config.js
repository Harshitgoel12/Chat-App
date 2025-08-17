import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
 plugins: [
    react(),
    tailwindcss(),
  ],
  define: {
  'process.env': {},
    global: 'window',
  },
   resolve: {
    alias: {
        'readable-stream': 'vite-compatible-readable-stream',
      stream: 'vite-compatible-readable-stream',
      process: 'process/browser',
    },
  },
 
})
