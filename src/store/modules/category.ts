import { defineStore } from 'pinia'
import axios from '@/utils/request'
import { ApiRes, CategoryItem } from '@/types/data'
import { topCategory } from './constants'

// perf: 给一级分类导航名字套个壳子，解决网速慢时分类显示不及时
const defaultList = topCategory.map(item => ({ name: item }))

// defineStore 返回的是一个函数
export default defineStore('category', {
  state() {
    return {
      list: defaultList as CategoryItem[]
    }
  },

  actions: {
    async getAllCategory() {
      const res = await axios.get<ApiRes<CategoryItem>>('/home/category/head')
      // console.log(res);

      this.list = res.data.result
    }
  }
})