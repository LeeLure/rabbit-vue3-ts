<script lang="ts" setup name="SubCategory">
import useStore from '@/store';
import { storeToRefs } from 'pinia';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const { category } = useStore()

const route = useRoute()

watchEffect(() => {
  if (route.fullPath !== '/category/sub/' + route.params.id) return

  // 优化：清空 subCategoryList ，让网速慢的时候显示面包屑的骨架屏
  category.resetSubCategoryList()

  // 再发请求拿数据
  category.getSubCategoryList(route.params.id as string)
})

// 解构: 丢失响应式，需要使用 storeToRefs 恢复
const { subCategoryList } = storeToRefs(category)
</script>
<template>
  <div class="category">
    <div class="container">
      <Transition name="fade-in-out">
        <!-- 面包屑 -->
        <XtxBread v-if="subCategoryList.parentName">
          <XtxBreadItem to="/">首页</XtxBreadItem>
          <XtxBreadItem :to="`/category/${subCategoryList.parentId}`">{{ subCategoryList.parentName }}
          </XtxBreadItem>
          <XtxBreadItem>{{ subCategoryList.name }}</XtxBreadItem>
        </XtxBread>

        <!-- 优化：如果没有就不要渲染了 -->
        <!-- 面包屑的骨架屏 -->
        <XtxBread v-else>
          <XtxBreadItem to="/">首页</XtxBreadItem>
          <XtxBreadItem>
            <!-- 骨架屏 -->
            <XtxSkeleton opacity=".2" animated :width="28" :height="18" bg="#27bb9a" />
          </XtxBreadItem>
          <XtxBreadItem>
            <!-- 骨架屏 -->
            <XtxSkeleton opacity=".2" animated :width="76" :height="18" bg="#27bb9a" />
          </XtxBreadItem>
        </XtxBread>
      </Transition>

      <!-- 筛选区 -->
      <div class="sub-filter">
        <div class="item">
          <div class="head">品牌：</div>
          <div class="body">
            <a href="javascript:;">全部</a>
            <a href="javascript:;" v-for="brand in subCategoryList.brands" :key="brand.id">{{ brand.name }}</a>
          </div>
        </div>
        <div class="item" v-for="item in subCategoryList.saleProperties" :key="item.id">
          <div class="head">{{ item.name }}：</div>
          <div class="body">
            <a href="javascript:;">全部</a>
            <a href="javascript:;" v-for="i in item.properties" :key="i.id">{{ i.name }}</a>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;

  .item {
    display: flex;
    line-height: 40px;

    .head {
      width: 80px;
      color: #999;
    }

    .body {
      flex: 1;

      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;

        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
