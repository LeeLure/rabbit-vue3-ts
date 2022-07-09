import { ApiRes, BannerItem, BrandItem, HotItem, NewItem, ProductRes } from './../../types/data.d';
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
      hotList: [] as HotItem[],
      // 热门品牌
      brandList: [] as BrandItem[],
      // 好物：居家、美食、服饰、母婴
      productList: [] as ProductRes[]
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
    },

    // 热门品牌
    async getBrandList() {
      const res = await axios.get<ApiRes<BrandItem>>('/home/brand')
      // console.log(res);
      this.brandList = res.data.result
      // 测试
      // this.brandList = [...res.data.result, ...res.data.result]
      // this.brandList.pop()
      // this.brandList.pop()
    },

    // 产品区块
    async getProductList() {
      const res = await axios.get<ApiRes<ProductRes>>('/home/goods')
      // console.log(res);
      this.productList = res.data.result
    }
  }
})