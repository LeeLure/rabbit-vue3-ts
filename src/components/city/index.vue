<script lang="ts" setup name="XtxCity">
import { ref, watchEffect } from 'vue';
import $http from 'axios'
import { onClickOutside } from '@vueuse/core'

const active = ref(false)

// 城市列表类型
type cityList = {
  code: string
  level: number
  name: string
  areaList: cityList[]
}

const cityList = ref<cityList[]>([])
// 再存一份
const cacheList = ref<cityList[]>([])

const target = ref(null)

// 获取城市列表
const getCityList = (async () => {
  const res = await $http.get<cityList[]>('https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json')

  // console.log(res);

  cityList.value = res.data
  cacheList.value = res.data
})

getCityList()

// 当目标元素 target 外面被点击时触发事件
onClickOutside(target, () => {
  active.value = false
})

// 选择省份
const selectCity = (city: cityList) => {
  if (!city.areaList) return active.value = false

  cityList.value = city.areaList
}

// 监听 active
watchEffect(() => {
  // 当关闭active的时候， 还原省份的数据
  if (!active.value) cityList.value = cacheList.value
})
</script>
<template>
  <div ref="target" class="xtx-city">
    <div @click="active = !active" :class="{ active }" class="select">
      <span class="placeholder">请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div v-show="active" class="option">
      <span @click="selectCity(item)" class="ellipsis" v-for="item in cityList" :key="item.name">{{ item.name }}</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;

  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;

    &.active {
      background: #fff;
    }

    .placeholder {
      color: #999;
    }

    .value {
      color: #666;
      font-size: 12px;
    }

    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }

  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;

    >span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;

      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>