<script lang="ts" setup>
import HomePanel from './home-panel.vue'
import useStore from '@/store';
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue';
import { useLazyData } from '@/utils/hooks';
import HomeSkeleton from './home-skeleton.vue';

const { home } = useStore()

// home.getNewList()

// 目标：实现数据懒加载
// 分析：打开首页，所有数据会加载，因为 setup 会自动执行
// 思路：不要直接在 setup 中直接调用 getNewList ,进入可视区后在调用
// const target = ref(null)

// const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {

//   if (isIntersecting) {
//     home.getNewList()

//     // 只调用一次
//     stop()
//   }
// })

// 原始封装: ref 定义在使用的地方，
// useLazyData(target, () => home.getNewList())

// 借助引用数据类型的特性实现封装
// const target = useLazyData(() => { home.getHotList() })

// 极致精简 => 将 api 函数直接作为回调传入, 自动执行
const target = useLazyData(home.getNewList)
</script>
<template>
  <div class="home-new" ref="target">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right>
        <XtxMore path="/" />
      </template>
      <!-- 面板内容 -->
      <!-- 淡出的动画 -->
      <transition name="fade">
        <ul class="goods-list" v-if="home.hotList.length">
          <li v-for="item in home.newList" :key="item.id">
            <RouterLink to="/">
              <!-- 自定义指令：图片懒加载 -->
              <img v-slowimage="item.picture" alt="" />
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="price">&yen;{{ item.price }}</p>
            </RouterLink>
          </li>
        </ul>

        <!-- 骨架屏 -->
        <HomeSkeleton :count="4" v-else />
      </transition>
    </HomePanel>
  </div>
</template>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }

    .price {
      color: @priceColor;
    }
  }
}
</style>