<script lang="ts" setup name="AppHeaderSticky">
// import { onBeforeUnmount, onMounted, ref } from 'vue';
import AppHeaderNav from './app-header-nav.vue'
import { useScroll } from '@vueuse/core'

// 使用第三方库实现吸顶重构
const { y } = useScroll(window)

// const y = ref(0)
// const onScroll = () => {
//   // 获取屏幕滚动的距离  || 浏览器适配
//   y.value = document.documentElement.scrollTop || document.body.scrollTop
// }

// onMounted(() => {
//   window.addEventListener('scroll', onScroll)
// })

// onBeforeUnmount(() => {
//   window.removeEventListener('scroll', onScroll)
// })
</script>

<template>
  <div class="app-header-sticky" :class="{ show: y >= 78 }">
    <!-- v-if 只能放在这，放在上面会影响动画 -->
    <div class="container" v-if="y >= 78">
      <RouterLink class="logo" to="/" />
      <AppHeaderNav />
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  transform: translateY(-100%);

  &.show {
    transition: all 0.3s linear;
    transform: translateY(0%);
  }

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;
    height: 80px;
    background: url(@/assets/images/logo.png) no-repeat right 2px;
    background-size: 160px auto;
  }

  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;

    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;

      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>