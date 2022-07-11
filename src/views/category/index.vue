<script lang="ts" name="TopCategory" setup>
import useStore from '@/store';
import { watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const { category, home } = useStore()

// 获取路由参数
const route = useRoute()
// console.log(route.params.id);

// 监视对象的某个属性时需要用箭头函数的方式
// watch(() => route.params.id, () => {
// if(!route.params.id) return
//   // 严谨的处理方法
//   if (route.fullPath === `/category/${route.params.id}`) {

//     category.getTopCategoryList(route.params.id as string)
//   }
// }, { immediate: true })

// 只要监视的对象源改变，就会自动执行
watchEffect(() => {
  // console.log(route.params.id);
  if (!route.params.id) return
  // if (route.fullPath === `/category/${route.params.id}`) {
  category.getTopCategoryList(route.params.id as string)
  // }
})

// 应该获取分类下的轮播图数据，但是后台没有提供接口
// category.getgetBannerList()
// 故使用首页的数据替代
home.getBannerList()

</script>
<template>
  <div class="top-category">
    <!-- provide 和 inject 的作用是注入数据, 例如在 bread 上注入的数据, 所有的子子孙孙组件都可以通过 inject 访问 -->
    <!-- 以下嵌套关系也支持通过 inject 访问 -->
    <!-- 面包屑 -->
    <div class="carousel">
      <XtxBread>
        <XtxBreadItem>首页</XtxBreadItem>
        <XtxBreadItem>{{ category.topCategoryList.name }}</XtxBreadItem>
      </XtxBread>

      <!-- 轮播图组件 -->
      <XtxCarousel style="height: 500px;" :slides="home.bannerList" />

      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in category.topCategoryList.children" :key="item.id">
            <a href="javascript:;">
              <img v-slowimage="item.picture">
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>


    </div>
  </div>
</template>


<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>