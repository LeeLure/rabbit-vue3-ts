<script lang="ts" name="TopCategory" setup>
import useStore from '@/store';
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const { category } = useStore()

// 获取路由参数
const route = useRoute()
// console.log(route.params.id);

// 监视对象的某个属性时需要用箭头函数的方式
watch(() => route.params.id, () => {
  // 严谨的处理方法
  if (route.fullPath === `/category/${route.params.id}`) {

    category.getTopCategoryList(route.params.id as string)
  }
}, { immediate: true })

</script>
<template>
  <div class="category">分类组件
    <!-- provide 和 inject 的作用是注入数据, 例如在 bread 上注入的数据, 所有的子子孙孙组件都可以通过 inject 访问 -->
    <!-- 以下嵌套关系也支持通过 inject 访问 -->
    <!-- 面包屑 -->
    <XtxBread>
      <XtxBreadItem>首页</XtxBreadItem>
      <XtxBreadItem>{{ category.topCategoryList.name }}</XtxBreadItem>
    </XtxBread>
  </div>
</template>


<style>
</style>