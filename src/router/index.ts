
import { createRouter, createWebHashHistory } from 'vue-router'

// 导入组件
import Layout from '@/views/layout/index.vue'
import Home from '@/views/home/index.vue'

const router = createRouter({
  // 路由模式
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          // 默认路由
          path: '',
          component: Home
        },
        {
          path: 'category/:id',
          component: () => import('@/views/category/index.vue')
        },
        {
          path: 'category/sub/:id',
          component: () => import('@/views/category/sub.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    }
  ]
})

export default router