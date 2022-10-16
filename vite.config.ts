import { resolve } from 'path'
import { fileURLToPath } from "url";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components';
import vueJsx from "@vitejs/plugin-vue-jsx";

import usePluginImport from 'vite-plugin-importer';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@@": resolve(__dirname, "test"),
    },

    // alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    dedupe: ['vue']
  },
  server: {
    open: '/index.html',
    host: '0.0.0.0',
    port: 3002,
    hmr: true,
    force: true
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'metagraph-ui',
      fileName: (format) => `metagraph-ui.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 将所有包含meta-开头的标签作为 自定义元素 (web component) 处理
          isCustomElement: tag => tag.startsWith('meta-')
        }
      }
    }),
    vueJsx(), //插件使用,
    usePluginImport({
      libraryName: "ant-design-vue",
      libraryDirectory: "es",
      style: "css",
    }),
    // ViteComponents({
    //   customComponentResolvers: [AntDesignVueResolver()],
    // })
  ],
});
