import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  server:{
    port:5500,
    // 使用中间代理服务器处理HTTP请求
    proxy: {
      '/image-proxy': {
        target: 'http://159.75.169.224',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/image-proxy/, '')
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
   //设置路径别名
   resolve: {
    alias: {
      '@': path.resolve(__dirname),//@代表根目录
    
    },
  }
});
