<script lang="ts" setup>
import useStore from '@/store';

const { home } = useStore()

home.getBannerList()
</script>
<template>
  <div class="home-banner">
    <!-- 轮播图 -->
    <XtxCarousel />
  </div>
</template>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  background-color: pink;

  //  :deep(类名) less 深度选择器新语法，/deep/已被废弃
  :deep(.carousel-btn.prev) {
    left: 270px !important;
  }

  :deep(.carousel-indicator) {
    padding-left: 250px;
  }
}
</style>