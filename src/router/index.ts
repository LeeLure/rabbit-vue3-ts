
import { createRouter, createWebHashHistory } from 'vue-router'

// 导入组件
import Layout from '@/views/layout/index.vue'
import Home from '@/views/home/index.vue'

import useStore from '@/store'
import { Message } from '@/components/message'

const router = createRouter({
  // 路由模式
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  },
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
        },
        {
          path: 'goods/:id',
          component: () => import('@/views/goods/index.vue')
        },
        {
          path: 'palyground',
          component: () => import('@/views/palyground/index.vue')
        },
        {
          path: 'cart',
          component: () => import('@/views/cart/index.vue')
        },
        {
          path: 'member/checkout',
          component: () => import('@/views/member/pay/checkout.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/login/callback',
      component: () => import('@/views/login/callback.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { user } = useStore()
  // 对结算页面进行拦截
  // 如果已登录 => 放行
  if (user.profile.token) {
    next()
  } else {
    // 如果未登录 =>
    if (to.path.includes('/member')) {
      // 给个提示
      Message.warning('请您先登录~')
      //    去结算页面 => 拦截到登录页
      //    /member 下的路由都是需要登录才能访问的, 结算 / 支付 / 订单
      // next('/login')
      // next() 的用法和 this.$router.push() 的用法一样
      // this.$router.push('/login')
      // this.$router.push({ path: '/login', query: {} })
      next({
        path: '/login',
        query: {
          redirectUrl: to.fullPath
        }
      })
    } else {
      //    去其他页面 => 放行
      next()
    }
  }
})

export default router