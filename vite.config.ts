import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    // vue 3.2.25 中要求加的属性, 必须在 @vitejs/plugin-vue 是 2.0.0 以上才可以
    // 是实验性语法, 将来会优化
    reactivityTransform: true // 给 props 赋值默认值需要打开, 才可以有响应式
  }), vueSetupExtend()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        // 配置自动导入 
        additionalData: `
          @import "@/assets/styles/variables.less";
          @import "@/assets/styles/mixins.less";
        `
      }
    }
  }
})
