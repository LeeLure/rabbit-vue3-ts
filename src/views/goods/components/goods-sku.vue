<script setup lang="ts" name="GoodsSku">
import { GoodsInfo, SpecItem, valueItem } from '@/types/data';

defineProps<{ goods: GoodsInfo }>()

// 高亮事件
// sub：当前点击的条目  item：当前点击的条目所属的规格
const changeSelected = (sub: valueItem, item: SpecItem) => {
  // 排他思想
  item.values.forEach(i => i.selected = false)

  // 修改当前被点击的对象属性 selected 取反
  // selected 默认是 undefined 而 undefined 取反正好是 true
  sub.selected = !sub.selected
}
</script>
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.name">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="sub in item.values" :key="sub.name">
          <img @click="changeSelected(sub, item)" v-if="sub.picture" :alt="sub.name" :title="sub.name"
            :class="{ selected: sub.selected }" :src="sub.picture" alt="" />
          <span @click="changeSelected(sub, item)" :class="{ selected: sub.selected }" v-else>{{ sub.name }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: @xtxColor;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      >img {
        width: 50px;
        height: 50px;
        margin-top: 5px;
        .sku-state-mixin ();
      }

      >span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
