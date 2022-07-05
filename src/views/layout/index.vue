<script lang="ts" setup name="Layout">
import AppTopnav from './components/app-topnav.vue';
// yarn add vite-plugin-vue-setup-extend -D 为了给组件取名字，但是如果 script 里面没有任何内容，
// 在渲染是会被丢掉，故此文字只为让组件名在浏览器显示
</script>
<template>
  <div>
    <AppTopnav />
  </div>
</template>

<style lang="less" scoped>
</style>