<script setup lang="ts">
// import { ref } from 'vue'
import { h, onMounted, ref, render, createElementVNode } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
// const img = document.createElement('img')
const target = ref<HTMLImageElement | null>(null);

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
  console.log(isIntersecting);
  if (isIntersecting) {
    // imgUrl.value = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/popular_3.jpg'
    target.value!.src =
      "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/popular_3.jpg";
  }
});

const flag = ref(true);

// 为什么要用 h 和 render?
// 使用 js 来创建组件
// 知识点: h 函数和 render 函数
// 作用:
// h 函数可以创建一个虚拟 DOM
// render 函数可以将虚拟 DOM 渲染到页面

// 使用方法:
// 1. 从 vue 包里按需导入函数
// HyperNode h
//

const dv = ref<HTMLDivElement | null>(null);

// 参数1: type 类型, 要创建什么虚拟 DOM, 可以传入标签名 / 组件对象
// 参数2: 标签的属性
// 参数3: 子节点 => 元素节点 文本节点
// <h1 title="">刘狄威很大</h1>
// 返回值: 虚拟 DOM, VNode => Virtual Node 虚拟节点
const vnode = h("h1", { title: "年龄" }, "刘狄威很小");

onMounted(() => {
  // 参数1: 虚拟 DOM
  // 参数2: 挂载点 (真实 DOM)
  render(vnode, dv.value as HTMLDivElement);
});

// $nextTick 原理: 目前就是微任务
// 发展历程: 最初是宏任务, 但是发现效率太低了, 所以改为了微任务(MutationObserver)
// 又发现, 微任务执行时机太早了, 经常页面还未更新就执行了
// 所以中间很长一段时间 大概有段时间, 采用的是微宏并行, 先判断是否支持 MutationObserver 如果支持就用微任务, 否则就用宏任务
// 最后全部该用微任务 MutationObserver 重新设计
// setTimeout()  宏任务  执行时机很晚
</script>

<template>
  <!-- <div style="height: 2000px;">
    私人领地
  </div> -->
  <img ref="target" alt="" />

  <button @click="flag = !flag">切换显示</button><br />

  <transition>
    <img
      v-if="flag"
      src="https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/popular_3.jpg"
      alt=""
    />
  </transition>
  <transition name="test">
    <img v-if="flag" ref="target" alt="" />
  </transition>
</template>

<style scoped lang="less">
// .v-leave- {
//   &from {

//   }
//   &active {

//   }
//   &to {

//   }
// }

@keyframes bounce {
  0% {
    transform: scale(1);
  }

  25% {
    transform: scale(0.2);
  }

  50% {
    transform: scale(2);
  }

  100% {
    transform: scale(0);
  }
}

.v-leave-active {
  // 过渡动画的效果
  // transition: all 1s;
  animation: bounce 3s;
}

.v-enter-active {
  // 过渡动画的效果
  // transition: all 1s;
  animation: bounce 3s reverse;
}

.test-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.test-leave-active {
  // 过渡动画的效果
  transition: all 1s;
}

.test-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.test-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.test-enter-active {
  // 过渡动画的效果
  transition: all 1s;
}

.test-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
