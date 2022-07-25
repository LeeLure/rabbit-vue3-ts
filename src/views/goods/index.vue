<script lang="ts" setup>
import useStore from "@/store";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import GoodsImage from "./components/goods-image.vue";
import GoodsSales from "./components/goods-sales.vue";
import GoodsName from "./components/goods-name.vue";
import GoodsSku from "./components/goods-sku.vue";
import GoodsDetail from "./components/goods-detail.vue";
import GoodsHot from "./components/goods-hot.vue";
import { Message } from "@/components/message";
import { CartItem } from "@/types/cart";
const { goods, cart } = useStore();

const route = useRoute();

// 组件缓存：因为路由的 id 变化了，组件并没有改变
// watchEffect 用于解决组件缓存的问题
watchEffect(() => {
  if (route.fullPath !== "/goods/" + route.params.id) return;

  // 先清空组件缓存
  goods.resetGoodsInfo();

  // 再请求数据
  goods.getGoodsInfo(route.params.id as string);
});

const hChangeSku = (skuId: string) => {
  // console.log('父组件得到的 skuId:', skuId)
  // 根据 skuId 找到 sku 对象
  currentSkuId.value = skuId;
  const sku = goods.info.skus.find((item) => item.id === skuId);
  // console.log(sku)
  // 找不到就 return
  if (!sku) return;
  // 修改商品价格 (此处应该定义 pinia 中的 actions 后修改)
  goods.info.price = sku.price;
  goods.info.oldPrice = sku.oldPrice;
};

const count = ref(1);

// 当前 sku Id
const currentSkuId = ref("");

const addCart = async () => {
  if (!currentSkuId.value) return Message.warning("请选择完整的规格");
  // console.log('我要加入购物车')
  await cart.addCart({
    // 本地添加
    id: goods.info.id,
    name: goods.info.name,
    picture: goods.info.mainPictures[0],
    price: goods.info.price,
    count: count.value,
    skuId: currentSkuId.value,
    attrsText: "", // 暂时没写, 后期要改为: 颜色: 黑色 尺寸: 20cm 产地: 中国
    selected: true,
    nowPrice: goods.info.price,
    stock: goods.info.inventory,
    isEffective: true,
  } as CartItem);
  // 提醒用户
  Message.success("加入购物车成功");
};
</script>
<template>
  <div class="xtx-goods-page">
    <div class="container">
      <!-- 面包屑 -->
      <!-- 高度：加载时面包屑脱标 -->
      <div style="height: 70px">
        <transition name="fade-in-out">
          <XtxBread v-if="goods.info.categories">
            <XtxBreadItem to="/">首页</XtxBreadItem>
            <XtxBreadItem :to="`/category/${goods.info.categories[1].id}`"
              >{{ goods.info.categories[1].name }}
            </XtxBreadItem>
            <XtxBreadItem :to="`/category/sub/${goods.info.categories[0].id}`"
              >{{ goods.info.categories[0].name }}
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
              <XtxSkeleton
                opacity="0.2"
                bg="#27bb9a"
                animated
                :width="156"
                :height="18"
              />
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
        <div class="spec" v-if="goods.info.skus">
          <GoodsName :goods="goods.info" />

          <!-- 商品规格 sku -->
          <!-- 
            1. 传入数据会渲染 (无库存禁用)
            2. 传入 skuId 会自动勾选, 无货不会勾选
            3. 当全部规格勾选后会返回一个 skuId 供父组件使用
           -->
          <GoodsSku @change-sku="hChangeSku" :goods="goods.info" />

          <!-- 商品数量 -->
          <XtxNumbox v-model="count" showLable :min="1" :max="goods.info.inventory" />

          <!-- 按钮 -->
          <XtxButton type="primary" style="margin-top: 20px" @click="addCart"
            >加入购物车</XtxButton
          >
        </div>
      </div>

      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs" v-if="goods.info.details">
            <!-- 商品详情 -->
            <GoodsDetail :goods="goods.info" />
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :type="1" />
          <GoodsHot :type="2" />
          <GoodsHot :type="3" />
        </div>
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
