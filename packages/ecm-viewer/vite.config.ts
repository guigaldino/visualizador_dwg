import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ command }) => {
  return {
    base: './',
    resolve: {
      alias: {
        '@mlightcad/cad-viewer': resolve(__dirname, '../cad-viewer/src/index.ts'),
        '@mlightcad/cad-simple-viewer': resolve(__dirname, '../cad-simple-viewer/src/index.ts')
      }
    },
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
      svgLoader(),
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
