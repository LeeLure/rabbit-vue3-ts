import { ApiRes, BannerItem, HotItem, NewItem } from './../../types/data.d';
import { defineStore } from 'pinia'
import axios from '@/utils/request'


// defineStore 返回的是一个函数
export default defineStore('home', {
  state() {
    return {
      // 轮播图
      bannerList: [] as BannerItem[],
      // 新鲜好物
      newList: [] as NewItem[],
      // 人气推荐
      hotList: [] as HotItem[]
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
      const res = await axios.get<ApiRes<NewItem>>('/home/new')
      // console.log(res);
      this.newList = res.data.result
    },

    // 人气推荐
    async getHotList() {
      const res = await axios.get<ApiRes<HotItem>>('/home/hot')
      // console.log(res);
      this.hotList = res.data.result
    }
  }
})