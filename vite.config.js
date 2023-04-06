import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'

export default defineConfig({
  plugins: [
    vue(),
    electron([
      {
        entry: 'electron/main.js'
      },
      {
        entry: 'electron/preload.js',
        onstart(options) {
          options.reload()
        }
      }
    ])
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
