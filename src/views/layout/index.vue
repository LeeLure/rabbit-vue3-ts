<script lang="ts" setup name="Layout">
import AppTopnav from './components/app-topnav.vue';
import AppHeader from './components/app-header.vue';
import AppFooter from './components/app-footer.vue';
import AppHeaderSticky from './components/app-header-sticky.vue';
// yarn add vite-plugin-vue-setup-extend -D 为了给组件取名字，但是如果 script 里面没有任何内容，
// 在渲染是会被丢掉，故此文字只为让组件名在浏览器显示

// 因 HeaderNav 组件分别在 AppHeader 和 AppHeaderSticky 中引用
// 导致 getAllCategory 请求重复，故在此调用
import useStore from '@/store'

const { category } = useStore()

// 获取头部分类
category.getAllCategory()
</script>
<template>
  <div>
    <AppTopnav />
    <AppHeader />
    <!-- 吸顶导航 -->
    <AppHeaderSticky />
    <div class="app-body">
      <!-- 二级路由出口 -->
      <RouterView />
    </div>
    <AppFooter />
  </div>
</template>

<style lang="less" scoped>
</style>