<script setup lang="ts" name="GoodsSku">
import { GoodsInfo, SpecItem, ValueItem } from "@/types/data";
import bwPowerSet from "@/utils/bwPowerSet";

const props = defineProps<{ goods: GoodsInfo; skuId?: string }>();
const emit = defineEmits<{ (e: "changeSku", skuId: string): void }>();

const SEPARATOR = "☆";

// sub 是当前点击的条目
// item 是当前点击的条目所属的规格
const changeSelected = (sub: ValueItem, item: SpecItem) => {
  // 判断如果被禁用了就不要选中
  if (sub.disabled) return;
  // 干掉除了我之外的所有人
  item.values.filter((v) => v.name !== sub.name).forEach((i) => (i.selected = false));
  // 修改当前被点击的对象属性 selected 取反
  // selected 默认是 undefined 而 undefined 取反正好是 true
  sub.selected = !sub.selected;

  // 调用 updateDisabledStatus
  // 更新组合规格的禁用状态
  // 该调用必须在排他结束后执行
  updateDisabledStatus();

  // 获取当前选中的规格
  // 判断是否选中了所有规格, 如果选中了就子传父将 skuId 传递过去
  const result = getSelectedSpec();
  // console.log(result)
  // 此方案可行
  // const isAll = result.every(item => item)
  // console.log(isAll)
  // 此方案也可行
  // result.filter(i => i).length === props.goods.specs.length
  // 当全部选中, 将 skuId 传递给父组件
  // 如果没有全选, 将空字符串传给父组件
  if (result.every((item) => item)) {
    // 如何获取 skuId ?
    const key = result.join(SEPARATOR);
    const val = pathMap[key];
    // console.log(val[0])
    emit("changeSku", val[0]);
  } else {
    emit("changeSku", "");
  }
};

// 测试 powerset 算法
// const result = bwPowerSet(['庆友黄', '中国'])
// console.log(result)

// console.log(props.goods.skus)
// 目标: 生成路径字典(对象/映射) => 传入一个 庆友黄+中国 => 有货
// obj['中国+10cm']
// obj['中国', '10cm'] 无法取值, 需要拼接
function getPathMap() {
  // 1. 筛选无效的数据 (没有库存的)
  const skus = props.goods.skus.filter((item) => item.inventory > 0);
  // console.log(skus)
  // 创建一个路径字典
  const pathMap: any = {};
  skus.forEach((item) => {
    // 2. 将 skus 转成字符串数组 (都是有货的 sku)
    // 算法要的是字符串数组 => 我们就将对象数组转成字符串数组
    // valueName
    const arr = item.specs.map((v) => v.valueName);
    // console.log(arr)
    // 3. 调用算法生成子集
    const result = bwPowerSet(arr);
    // console.log(result)
    // 4. 往路径字典对象中添加属性
    result.forEach((arrItem) => {
      // console.log(arrItem.join('☆'))
      // const key = arrItem.join('☆')
      // console.log(arrItem.join(SEPARATOR))
      const key = arrItem.join(SEPARATOR);
      // pathMap[key] = true
      // 'xxx' in 对象 作用是判断 'xxx' 是否是对象的属性, 有就返回 true, 没有就是 false
      if (key in pathMap) {
        // 4.2 如果对象中有这个属性, 就直接添加 id 到数组
        pathMap[key].push(item.id);
      } else {
        // 4.1 如果对象中没有这个属性, 就创建一个数组, 添加 id
        // const arr = [1, 2, 3, 4, item.id]
        pathMap[key] = [item.id];
        // pathMap[key].push(item.id)
      }
    });
  });
  return pathMap;
}

// 修改禁用状态, 页面加载时就对所有元素进行修改
function updateDisabledStatus() {
  // 先获取所有选中商品规格
  const selectedArr = getSelectedSpec();
  // console.log(selectedArr)
  // TODO: 待会儿处理具体禁用的逻辑

  // 该方法的作用: 循环所有 specs(规格) 去路径字典里找, 是否存在
  // 如果存在就不禁用, 如果不存在就禁用
  props.goods.specs.forEach((item, index) => {
    item.values.forEach((sub) => {
      // console.log(sub.name)
      // 去对象里找是否有这个属性, 该怎么做? key in obj 得到布尔值
      // 如果存在就不禁用, 如果不存在就禁用
      // if (sub.name in pathMap) {
      //   sub.disabled = false
      // } else {
      //   sub.disabled = true
      // }
      // 只要是将 if 条件表达式的结果赋值给某个对象, 都可以用这种办法: 直接将条件表达式赋给对象的属性
      // 开发小技巧
      sub.disabled = !(sub.name in pathMap);
      // 先获取所有选中商品规格
      // 返回的数据是: ['黑色', '', '']
      const selectedArr = getSelectedSpec();
      // console.log(selectedArr)
      // TODO: 待会儿处理具体禁用的逻辑
      selectedArr[index] = sub.name;
      // console.log(selectedArr, sub.name, index)
      // console.log(selectedArr.filter(v => v).join(SEPARATOR))
      const key = selectedArr.filter((v) => v).join(SEPARATOR);
      // sub.disabled = !(sub.name in pathMap)
      sub.disabled = !(key in pathMap);
    });
  });
}

// 获取被选中的规格
function getSelectedSpec() {
  // 希望获取每个规格被选中的值: ['', '', '']
  const arr: string[] = [];
  // 遍历所有的规格, 获取它们的选中状态 (selected)
  props.goods.specs.forEach((item) => {
    const result = item.values.find((v) => v.selected);
    // console.log(result?.name)
    arr.push(result?.name || "");
    // item.values.forEach(sub => {
    // console.log(sub.name, sub.selected)
    //   if (sub.selected) {
    //     arr.push(sub.name)
    //   } else {
    //     arr.push('')
    //   }
    // })
  });
  return arr;
}

// 初始化勾选状态
function initSpecSelected() {
  if (!props.skuId) return;
  // 通过 skuId 去找到当前 sku 勾选的规格
  const result = props.goods.skus.find((item) => item.id === props.skuId);
  if (!result) return;
  // console.log('通过 ID 找到的 sku:', result.specs)
  const selectArr = result.specs.map((item) => item.valueName);
  // console.log(selectArr)
  // 遍历所有的规格, 处理选中状态
  props.goods.specs.forEach((item) => {
    item.values.forEach((sub) => {
      sub.selected = selectArr.includes(sub.name);
      // sub.selected
      // sub.name =
      // if (selectArr.includes(sub.name)) {
      //   sub.selected = true
      // }
    });
  });
}

// 1. 获取路径字典
const pathMap = getPathMap();
// console.log(pathMap)

// 2. 初始化勾选状态
initSpecSelected();

// 3. 更新单个规格的禁用状态
updateDisabledStatus();
</script>
<template>
  <div class="goods-sku">
    <dl v-for="item in props.goods.specs" :key="item.name">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="sub in item.values" :key="sub.name">
          <img
            @click="changeSelected(sub, item)"
            v-if="sub.picture"
            :alt="sub.name"
            :title="sub.name"
            :class="{ selected: sub.selected, disabled: sub.disabled }"
            :src="sub.picture"
            alt=""
          />
          <span
            @click="changeSelected(sub, item)"
            :class="{ selected: sub.selected, disabled: sub.disabled }"
            v-else
            >{{ sub.name }}</span
          >
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

      > img {
        width: 50px;
        height: 50px;
        margin-top: 5px;
        .sku-state-mixin ();
      }

      > span {
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
