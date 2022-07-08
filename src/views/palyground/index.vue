<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
// const img = document.createElement('img')
const target = ref<HTMLImageElement | null>(null)

// const imgUrl = ref('')

// const obj = { name: '刘狄威' }
// const { name } = obj
// const arr = ['刘狄威']
// const [name] = arr

// 使用 useIntersectionObserver 获取目标元素是否出现在可视区, 当出现在可视区后给图片的 src 赋值即可
// 参数1: target 告诉这个方法, 我要监视的 DOM 元素是谁
// 参数2: 回调函数, 会携带一个数组给我们, 数组中只有一个对象, 对象中有一个属性: isIntersecting
// [{  }]：解构
useIntersectionObserver(target, ([{ isIntersecting }]) => {
  console.log(isIntersecting)
  if (isIntersecting) {
    // imgUrl.value = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/popular_3.jpg'
    target.value!.src = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/popular_3.jpg'
  }
})

</script>

<template>
  <div style="height: 2000px;">
    私人领地
  </div>
  <img ref="target" alt="">
</template>

<style scoped>
</style>