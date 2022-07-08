import { ApiRes, BannerItem } from './../../types/data.d';
import { defineStore } from 'pinia'
import axios from '@/utils/request'


// defineStore 返回的是一个函数
export default defineStore('home', {
  state() {
    return {
      bannerList: [] as BannerItem[]
    }
  },

  actions: {
    // 轮播图
    async getBannerList() {
      const res = await axios.get<ApiRes<BannerItem>>('/home/banner')
      // console.log(res);
      this.bannerList = res.data.result
    }
  }
})