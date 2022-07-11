<script lang="ts" setup>
import useStore from '@/store';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const { goods } = useStore()

const route = useRoute()

watchEffect(() => {
  if (route.fullPath !== '/goods/' + route.params.id) return

  goods.getGoodsInfo(route.params.id as string)
})

</script>
<template>
  <div class="xtx-goods-page">
    <div class="container">
      <!-- 面包屑 -->
      <!-- 高度：加载时面包屑脱标 -->
      <div style="height: 70px;">
        <transition name="fade-in-out">
          <XtxBread v-if="goods.info.categories">
            <XtxBreadItem to="/">首页</XtxBreadItem>
            <XtxBreadItem :to="`/category/${goods.info.categories[1].id}`">{{ goods.info.categories[1].name }}
            </XtxBreadItem>
            <XtxBreadItem :to="`/category/sub/${goods.info.categories[0].id}`">{{ goods.info.categories[0].name }}
            </XtxBreadItem>
            <XtxBreadItem>{{ goods.info.name }}</XtxBreadItem>
          </XtxBread>

          <!-- 骨架屏优化 -->
          <XtxBread v-else>
            <XtxBreadItem to="/">首页</XtxBreadItem>
            <XtxBreadItem>
              <XtxSkeleton opacity="0.2" bg="#27bb9a" animated :width="28" :height="18" />
            </XtxBreadItem>
            <XtxBreadItem>
              <XtxSkeleton opacity="0.2" bg="#27bb9a" animated :width="76" :height="18" />
            </XtxBreadItem>
            <XtxBreadItem>
              <XtxSkeleton opacity="0.2" bg="#27bb9a" animated :width="156" :height="18" />
            </XtxBreadItem>
          </XtxBread>
        </transition>
      </div>
      <!-- 商品信息 -->
      <div class="goods-info"></div>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;
}

.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>