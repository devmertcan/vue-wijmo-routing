import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: '127.0.0.1',
    proxy: {
      '/api': {
        target: 'https://office.optrak.com/dev/strategic/d/tenant',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false, // Ignore SSL errors (if any)
      },
      '/graphiql':{
        target: 'https://office.optrak.com/dev/strategic/g/data',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/graphiql/, ''),
        secure: false, // Ignore SSL errors (if any)
      }
    },
  }
})
