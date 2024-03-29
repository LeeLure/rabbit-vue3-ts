<script lang="ts" setup name="SubCategory">
import useStore from '@/store';
import { storeToRefs } from 'pinia';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import GoodsItem from './components/goods-item.vue';

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
      <div style="height: 70px;">
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
      </div>

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

      <!-- 商品区域 -->
      <div class="goods-list">
        <!-- 排序区域 -->
        <div class="sub-sort">
          <div class="sort">
            <a href="javascript:;" class="active">默认排序</a>
            <a href="javascript:;">最新商品</a>
            <a href="javascript:;">最高人气</a>
            <a href="javascript:;">评论最多</a>
            <a href="javascript:;">
              价格排序
              <i class="arrow up" />
              <i class="arrow down" />
            </a>
          </div>
        </div>
        <!-- 商品列表 -->
        <ul>
          <li v-for="item in subCategoryList.goods" :key="item.id">
            <GoodsItem :goods="item" />
          </li>
        </ul>
      </div>


    </div>
  </div>
</template>

<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;

  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;

    li {
      margin-right: 20px;
      margin-bottom: 20px;

      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }

  .sub-sort {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .sort {
      display: flex;

      a {
        height: 30px;
        line-height: 28px;
        border: 1px solid #e4e4e4;
        padding: 0 20px;
        margin-right: 20px;
        color: #999;
        border-radius: 2px;
        position: relative;
        transition: all 0.3s;

        &.active {
          background: @xtxColor;
          border-color: @xtxColor;
          color: #fff;
        }

        .arrow {
          position: absolute;
          border: 5px solid transparent;
          right: 8px;

          &.up {
            top: 3px;
            border-bottom-color: #bbb;

            &.active {
              border-bottom-color: @xtxColor;
            }
          }

          &.down {
            top: 15px;
            border-top-color: #bbb;

            &.active {
              border-top-color: @xtxColor;
            }
          }
        }
      }
    }

    .check {
      .xtx-checkbox {
        margin-left: 20px;
        color: #999;
      }
    }
  }
}

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
