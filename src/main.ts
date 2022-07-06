import { createApp } from 'vue'
import App from './App.vue'

// 初始化 css => 让所有的浏览器默认样式看起来同意
import 'normalize.css'

// 导入公共样式
import '@/assets/styles/common.less'

// 导入路由 
import router from './router'

// 导入 pinia 并注册
import { createPinia } from 'pinia'

// 导入全局组件
import XtxUI from '@/components'

createApp(App).use(router).use(XtxUI).use(createPinia()).mount('#app')
