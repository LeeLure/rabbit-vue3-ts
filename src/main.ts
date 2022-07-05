import { createApp } from 'vue'
import App from './App.vue'

// 初始化 css => 让所有的浏览器默认样式看起来同意
import 'normalize.css'

// 导入公共样式
import '@/assets/styles/common.less'
createApp(App).mount('#app')
