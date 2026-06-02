import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import vue from '@vitejs/plugin-vue'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ command }) => {
  return {
    base: './',
    optimizeDeps: {
      force: command === 'serve'
    },
    build: {
      outDir: 'dist',
      modulePreload: false,
      minify: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html')
        }
      }
    },
    plugins: [
      vue(),
      viteStaticCopy({
        targets: [
          {
            src: './node_modules/@mlightcad/data-model/dist/dxf-parser-worker.js',
            dest: 'assets'
          },
          {
            src: './node_modules/@mlightcad/cad-simple-viewer/dist/*-worker.js',
            dest: 'assets'
          }
        ]
      })
    ]
  }
})
