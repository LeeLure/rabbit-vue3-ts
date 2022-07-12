<script lang="ts" setup>
import useStore from '@/store';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import GoodsImage from './components/goods-image.vue';
import GoodsSales from './components/goods-sales.vue';
import GoodsName from './components/goods-name.vue';

const { goods } = useStore()

const route = useRoute()

// 组件缓存：因为路由的 id 变化了，组件并没有改变
// watchEffect 用于解决组件缓存的问题
watchEffect(() => {
  if (route.fullPath !== '/goods/' + route.params.id) return

  // 先清空组件缓存
  goods.resetGoodsInfo()

  // 再请求数据
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
      <div class="goods-info">
        <div class="media">
          <GoodsImage v-if="goods.info.mainPictures" :images="goods.info.mainPictures" />

          <GoodsSales />
        </div>
        <div class="spec">
          <GoodsName :goods="goods.info" />
        </div>
      </div>

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
  display: flex;

  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }

  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
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