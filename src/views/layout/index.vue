<script lang="ts" setup name="Layout">
import AppTopnav from './components/app-topnav.vue';
import AppHeader from './components/app-header.vue';
import AppFooter from './components/app-footer.vue';
import AppHeaderSticky from './components/app-header-sticky.vue';
// yarn add vite-plugin-vue-setup-extend -D 为了给组件取名字，但是如果 script 里面没有任何内容，
// 在渲染是会被丢掉，故此文字只为让组件名在浏览器显示
</script>
<template>
  <div>
    <AppTopnav />
    <AppHeader />
    <!-- 吸顶导航 -->
    <AppHeaderSticky />
    <div class="app-body" style="height: 3000px;">
      <!-- 二级路由出口 -->
      <RouterView />
    </div>
    <AppFooter />
  </div>
</template>

<style lang="less" scoped>
</style>