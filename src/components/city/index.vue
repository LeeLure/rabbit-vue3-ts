<script lang="ts" setup name="XtxCity">
import { ref, watchEffect } from 'vue';
import $http from 'axios'
import { onClickOutside } from '@vueuse/core'


// 城市列表类型
export type cityList = {
  code: string
  level: number
  name: string
  areaList: cityList[]
}

// 选择的城市结果类型
export type CityResult = {
  provinceCode: string
  provinceName: string
  cityCode: string
  cityName: string
  countyCode: string
  countyName: string
}

defineProps<{ address?: string }>()
const emit = defineEmits<{ (e: 'changeCity', city: CityResult): void }>()

const active = ref(false)

const cityList = ref<cityList[]>([])
// 再存一份
const cacheList = ref<cityList[]>([])

const target = ref(null)

// 选择的城市
const cityResult = ref<CityResult>({} as CityResult)

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
  // console.log('选择城市:', city.name)
  // 选择城市时判断当前选择的是省还是市还是区
  if (city.level === 0) {
    // 选择的是省
    cityResult.value.provinceName = city.name
    cityResult.value.provinceCode = city.code
  }

  if (city.level === 1) {
    // 选择的是市
    cityResult.value.cityName = city.name
    cityResult.value.cityCode = city.code
  }

  if (city.level === 2) {
    // 选择的是区
    cityResult.value.countyName = city.name
    cityResult.value.countyCode = city.code

    // 通知父组件, 数据携带过去
    emit('changeCity', cityResult.value)
  }

  // 选完区就关闭窗口
  if (!city.areaList) return active.value = false

  // 重置数据为省份
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
      <span v-if="address" class="placeholder">{{ address }}</span>
      <span v-else class="placeholder">请选择配送地址</span>
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