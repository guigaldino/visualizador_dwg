// vite.config.ts
import peerDepsExternal from "file:///D:/Reposit%C3%B3rios/visualizador_dwg/node_modules/.pnpm/rollup-plugin-peer-deps-external@2.2.4_rollup@4.60.1/node_modules/rollup-plugin-peer-deps-external/dist/rollup-plugin-peer-deps-external.js";
import { defineConfig } from "file:///D:/Reposit%C3%B3rios/visualizador_dwg/node_modules/.pnpm/vite@5.4.21_@types+node@24.12.4_sass@1.98.0/node_modules/vite/dist/node/index.js";
import { viteStaticCopy } from "file:///D:/Reposit%C3%B3rios/visualizador_dwg/node_modules/.pnpm/vite-plugin-static-copy@3.4_203b9ae41bbce588fea642cd769612ea/node_modules/vite-plugin-static-copy/dist/index.js";
var vite_config_default = defineConfig({
  build: {
    outDir: "dist",
    lib: {
      entry: "src/index.ts",
      name: "cad-simple-viewer",
      fileName: "index"
    },
    minify: true
  },
  plugins: [
    peerDepsExternal(),
    viteStaticCopy({
      targets: [
        {
          src: "./node_modules/@mlightcad/libredwg-converter/dist/libredwg-parser-worker.js",
          dest: ""
        },
        {
          src: "./node_modules/@mlightcad/mtext-renderer/dist/mtext-renderer-worker.js",
          dest: ""
        },
        {
          src: "./node_modules/@mlightcad/cad-html-exporter/dist/viewer-runtime.iife.js",
          dest: ""
        }
      ]
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxSZXBvc2l0XHUwMEYzcmlvc1xcXFx2aXN1YWxpemFkb3JfZHdnXFxcXHBhY2thZ2VzXFxcXGNhZC1zaW1wbGUtdmlld2VyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxSZXBvc2l0XHUwMEYzcmlvc1xcXFx2aXN1YWxpemFkb3JfZHdnXFxcXHBhY2thZ2VzXFxcXGNhZC1zaW1wbGUtdmlld2VyXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9SZXBvc2l0JUMzJUIzcmlvcy92aXN1YWxpemFkb3JfZHdnL3BhY2thZ2VzL2NhZC1zaW1wbGUtdmlld2VyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBlZXJEZXBzRXh0ZXJuYWwgZnJvbSAncm9sbHVwLXBsdWdpbi1wZWVyLWRlcHMtZXh0ZXJuYWwnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgdml0ZVN0YXRpY0NvcHkgfSBmcm9tICd2aXRlLXBsdWdpbi1zdGF0aWMtY29weSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcjogJ2Rpc3QnLFxyXG4gICAgbGliOiB7XHJcbiAgICAgIGVudHJ5OiAnc3JjL2luZGV4LnRzJyxcclxuICAgICAgbmFtZTogJ2NhZC1zaW1wbGUtdmlld2VyJyxcclxuICAgICAgZmlsZU5hbWU6ICdpbmRleCdcclxuICAgIH0sXHJcbiAgICBtaW5pZnk6IHRydWVcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHBlZXJEZXBzRXh0ZXJuYWwoKSBhcyBQbHVnaW5PcHRpb24sXHJcbiAgICB2aXRlU3RhdGljQ29weSh7XHJcbiAgICAgIHRhcmdldHM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBzcmM6ICcuL25vZGVfbW9kdWxlcy9AbWxpZ2h0Y2FkL2xpYnJlZHdnLWNvbnZlcnRlci9kaXN0L2xpYnJlZHdnLXBhcnNlci13b3JrZXIuanMnLFxyXG4gICAgICAgICAgZGVzdDogJydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHNyYzogJy4vbm9kZV9tb2R1bGVzL0BtbGlnaHRjYWQvbXRleHQtcmVuZGVyZXIvZGlzdC9tdGV4dC1yZW5kZXJlci13b3JrZXIuanMnLFxyXG4gICAgICAgICAgZGVzdDogJydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHNyYzogJy4vbm9kZV9tb2R1bGVzL0BtbGlnaHRjYWQvY2FkLWh0bWwtZXhwb3J0ZXIvZGlzdC92aWV3ZXItcnVudGltZS5paWZlLmpzJyxcclxuICAgICAgICAgIGRlc3Q6ICcnXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9KVxyXG4gIF1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrWCxPQUFPLHNCQUFzQjtBQUMvWSxTQUFTLG9CQUFrQztBQUMzQyxTQUFTLHNCQUFzQjtBQUUvQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixLQUFLO0FBQUEsTUFDSCxPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsSUFDWjtBQUFBLElBQ0EsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLGlCQUFpQjtBQUFBLElBQ2pCLGVBQWU7QUFBQSxNQUNiLFNBQVM7QUFBQSxRQUNQO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
