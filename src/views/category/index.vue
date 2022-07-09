<script lang="ts" name="TopCategory" setup>
import useStore from '@/store';
import { useRoute } from 'vue-router';

const { category } = useStore()

// 获取路由参数
const route = useRoute()
// console.log(route.params.id);

category.getTopCategoryList(route.params.id as string)
</script>
<template>
  <div class="category">分类组件
    <XtxBread>
      <XtxBreadItem>首页</XtxBreadItem>
      <XtxBreadItem>{{ category.topCategoryList.name }}</XtxBreadItem>
    </XtxBread>
  </div>
</template>


<style>
</style>