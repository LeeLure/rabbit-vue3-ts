import { defineStore } from 'pinia'
import axios from '@/utils/request'
import { ApiRes, CategoryItem } from '@/types/data'

// defineStore 返回的是一个函数
export default defineStore('category', {
  state() {
    return {
      list: [] as CategoryItem[]
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