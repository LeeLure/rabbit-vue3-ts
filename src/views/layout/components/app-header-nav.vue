<template>
  <ul class="app-header-nav">
    <li class="home">
      <RouterLink to="/">首页</RouterLink>
    </li>
    <li
      @mousemove="category.show(item.id)"
      @mouseleave="category.hide(item.id)"
      @click="category.hide(item.id)"
      v-for="item in category.list"
      :key="item.id"
    >
      <!-- bug：    数据还未请求回来、点击一级分类时地址栏出现 undefined -->
      <!-- bug解决: 如果没有数据，跳转首页 -->
      <RouterLink :to="item.id ? `/category/${item.id}` : '/'">{{
        item.name
      }}</RouterLink>
      <!-- v-if: 优化网速慢 hover 时显示空盒子 -->
      <div :class="{ show: item.show }" class="layer" v-if="item.children">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <RouterLink :to="`/category/sub/${sub.id}`">
              <img :src="sub.picture" alt="" />
              <p>{{ sub.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import useStore from "@/store";

const { category } = useStore();

// 获取头部分类
// bug 解决：getAllCategory 重复调用，故在 layout/index.vue 调用
// category.getAllCategory()
</script>

<style scoped lang="less">
.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;

  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;

    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;

      &:hover {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
    }

    // 新增样式
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }

      // >.layer {
      //   height: 132px;
      //   opacity: 1;
      // }
    }
  }
}

// 新增样式
.layer {
  &.show {
    height: 132px;
    opacity: 1;
  }

  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;

  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;

    li {
      width: 110px;
      text-align: center;

      img {
        width: 60px;
        height: 60px;
      }

      p {
        padding-top: 10px;
      }

      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
