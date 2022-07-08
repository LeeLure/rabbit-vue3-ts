import { ApiRes, BannerItem, NewItem } from './../../types/data.d';
import { defineStore } from 'pinia'
import axios from '@/utils/request'


// defineStore 返回的是一个函数
export default defineStore('home', {
  state() {
    return {
      bannerList: [] as BannerItem[],
      newList: [] as NewItem[]
    }
  },

  actions: {
    // 轮播图
    async getBannerList() {
      const res = await axios.get<ApiRes<BannerItem>>('/home/banner')
      // console.log(res);
      this.bannerList = res.data.result
    },

    // 新鲜好物
    async getNewList() {
      const result = await axios.get<ApiRes<NewItem>>('/home/new')
      // console.log(result);
      this.newList = result.data.result
    }
  }
})