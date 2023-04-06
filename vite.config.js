/* eslint-env node */

import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'

const PORT = 9527

export default ({ mode }) => {
  const env = {
    ...process.env,
    ...loadEnv(mode, process.cwd())
  }
  const proxyUrl = env.VITE_APP_PROXY_URL

  return defineConfig({
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
    },
    server: {
      proxy: {
        [proxyUrl]: {
          target: env.VITE_APP_API_URL,
          changeOrigin: true,
          ws: true,
          rewrite: path => path.replace(new RegExp(proxyUrl), '')
        }
      },
      port: PORT
    },
    preview: {
      port: PORT
    }
  })
}
