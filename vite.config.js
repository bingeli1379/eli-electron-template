/* eslint-env node */

import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import pkg from './package.json'

const PORT = 9527

export default ({ command, mode }) => {
  const env = {
    ...process.env,
    ...loadEnv(mode, process.cwd())
  }
  const proxyUrl = env.VITE_APP_PROXY_URL

  const isServe = command === 'serve'
  const isBuild = command === 'build'

  return defineConfig({
    plugins: [
      vue(),
      electron([
        {
          entry: 'electron/main/index.js',
          vite: {
            build: {
              sourcemap: isServe,
              minify: isBuild,
              outDir: 'dist-electron/main',
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {})
              }
            }
          }
        },
        {
          entry: 'electron/preload/index.js',
          onstart(options) {
            options.reload()
          },
          vite: {
            build: {
              sourcemap: isServe,
              minify: isBuild,
              outDir: 'dist-electron/preload',
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {})
              }
            }
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
