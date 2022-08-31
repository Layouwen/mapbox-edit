import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/tile-map': {
        target: 'https://tile.locnavi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tile-map/, '')
      }
    }
  }
})
