
import { createRouter, createWebHashHistory } from 'vue-router'

// 导入组件
import Layout from '@/views/layout/index.vue'

const router = createRouter({
  // 路由模式
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Layout
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    }
  ]
})

export default router