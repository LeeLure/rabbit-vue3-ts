<script lang="ts" setup name="HomeBrand">
import { useLazyData } from '@/utils/hooks';
import HomePanel from './home-panel.vue'
import useStore from '@/store';
import { computed, ref } from 'vue';

const { home } = useStore()

const target = useLazyData(home.getBrandList)

// 左右滚动的索引
const index = ref(0)

// 计算出热门品牌一共多少页
const maxPage = computed(() => Math.ceil(home.brandList.length / 5))
</script>

<template>
  <HomePanel ref="target" title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <!-- 上一页 -->
      <a href="javascript:;" :class="{ disabled: index === 0 }" class="iconfont icon-angle-left prev"
        @click="index > 0 && index--"></a>

      <!-- 下一页 -->
      <a href="javascript:;" class="iconfont icon-angle-right next" :class="{ disabled: index === maxPage - 1 }"
        @click="index < maxPage - 1 && index++"></a>
    </template>
    <!-- 动画 -->
    <transition name="fade">
      <div class="box" ref="box">
        <!-- 放图片的容器 -->
        <ul :style="{
          transform: `translateX(-${index * 1240}px)`, width: maxPage + '00%'
        }" v-if="home.brandList.length" class="list">
          <li v-for="item in home.brandList" :key="item.id">
            <RouterLink to="/">
              <img v-slowimage="item.picture" alt="" />
            </RouterLink>
          </li>
        </ul>

        <!-- 骨架屏 -->
        <div v-else class="skeleton">
          <XtxSkeleton class="item" v-for="i in 5" :key="i" fade animated bg="#e4e4e4" :width="240" :height="305" />
        </div>
      </div>
    </transition>
  </HomePanel>
</template>

<style scoped lang="less">
.skeleton {
  width: 100%;
  display: flex;

  .item {
    margin-right: 10px;

    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}

.home-panel {
  background: #f5f5f5;
}

.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;

  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }

  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}

.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;

  .list {
    width: 200%;
    display: flex;
    transition: all 1s;

    li {
      margin-right: 10px;
      width: 240px;

      &:nth-child(5n) {
        margin-right: 0;
      }

      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>