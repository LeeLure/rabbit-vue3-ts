import { App } from 'vue'
import XtxSkeleton from './skeleton/index.vue'

export default {
  install(app: App) {
    // 全局注册组件
    app.component('XtxSkeleton', XtxSkeleton)
  }
}