<script lang="ts" setup>
import useStore from '@/store'
import { useLazyData } from '@/utils/hooks';
// import { useIntersectionObserver } from '@vueuse/core';
// import { ref } from 'vue';
import HomePanel from './home-panel.vue'
import HomeSkeleton from './home-skeleton.vue';

const { home } = useStore()

// home.getHotList()
// 目标：实现数据懒加载
// 分析：打开首页，所有数据会加载，因为 setup 会自动执行
// 思路：不要直接在 setup 中直接调用 getNewList ,进入可视区后在调用
// const target = ref(null)

// const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {

//   if (isIntersecting) {
//     home.getHotList()

//     // 只调用一次
//     stop()
//   }
// })

// 原始封装: ref 定义在使用的地方，
// useLazyData(target, () => home.getNewList())

// 借助引用数据类型的特性实现封装
// const target = useLazyData(() => { home.getHotList() })

// 极致精简 => 将 api 函数直接作为回调传入, 自动执行
const target = useLazyData(home.getHotList)
</script>
<template>
  <HomePanel ref="target" title="人气推荐" sub-title="人气爆款 不容错过">
    <!-- 淡出的动画 -->
    <!-- 只要先定好类，使用动画时在外层包裹一层 transition 即可 -->
    <transition name="fade">
      <ul ref="pannel" class="goods-list">
        <li v-if="home.hotList.length" v-for="item in home.hotList" :key="item.id">
          <RouterLink to="/">
            <!-- 自定义指令：图片懒加载 -->
            <img v-slowimage="item.picture" alt="" />
            <p class="name">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </RouterLink>
        </li>

        <!-- 骨架屏 -->
        <HomeSkeleton :count="4" v-else />
      </ul>
    </transition>
  </HomePanel>
</template>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;
    .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>