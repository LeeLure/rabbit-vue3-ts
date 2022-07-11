import { defineStore } from 'pinia'
import axios from '@/utils/request'
import { ApiRes, CategoryItem, SubCategory, TopCategory } from '@/types/data'
import { topCategory } from './constants'

// perf: 给一级分类导航名字套个壳子，解决网速慢时分类显示不及时
const defaultList = topCategory.map(item => ({ name: item }))

// defineStore 返回的是一个函数
export default defineStore('category', {
  state() {
    return {
      list: defaultList as CategoryItem[],
      // 顶级分类
      topCategoryList: {} as TopCategory,
      // 二级分类
      subCategoryList: {} as SubCategory
    }
  },

  actions: {
    async getAllCategory() {
      const res = await axios.get<ApiRes<CategoryItem[]>>('/home/category/head')
      // console.log(res);

      this.list = res.data.result
    },

    show(id: string) {
      // 找到对应 id 的元素, 将其状态改为 true
      const item = this.list.find(item => item.id === id)
      // if (item) {
      //   item.show = false
      // }

      // 暴力：
      // item!.show = false

      // 优雅：
      item && (item.show = true)  // = 优先级低，所以要加括号
    },

    hide(id: string) {
      // 找到对应 id 的元素, 将其状态改为 true
      const item = this.list.find(item => item.id === id)
      // if (item) {
      //   item.show = false
      // }

      // 暴力：
      // item!.show = false

      // 优雅：
      item && (item.show = false)  // = 优先级低，所以要加括号
    },

    // 顶级分类
    async getTopCategoryList(id: string) {
      const res = await axios.get<ApiRes<TopCategory>>('/category', { params: { id } })
      // console.log(res);
      this.topCategoryList = res.data.result
    },

    // 二级分类
    async getSubCategoryList(id: string) {
      const res = await axios.get<ApiRes<SubCategory>>('/category/sub/filter', { params: { id } })
      // console.log(res);
      this.subCategoryList = res.data.result
    },

    // 为优化用户体验清空 subCategoryList 
    resetSubCategoryList() {
      this.subCategoryList = {} as SubCategory
    }
  }
})