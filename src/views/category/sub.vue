<script lang="ts" setup name="SubCategory">
import useStore from '@/store';
import { storeToRefs } from 'pinia';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const { category } = useStore()

const route = useRoute()

watchEffect(() => {
  if (route.fullPath !== '/category/sub/' + route.params.id) return

  category.getSubCategoryList(route.params.id as string)
})

// 解构: 丢失响应式，需要使用 storeToRefs 恢复
const { subCategoryList } = storeToRefs(category)
</script>
<template>
  <div class="category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${subCategoryList.parentId}`">{{ subCategoryList.parentName }}
        </XtxBreadItem>
        <XtxBreadItem>{{ subCategoryList.name }}</XtxBreadItem>
      </XtxBread>
    </div>
  </div>
</template>

<style>
</style>
