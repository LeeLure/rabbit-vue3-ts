import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ApiRes, GoodsInfo } from '@/types/data'

export default defineStore('goods', {
  state() {
    return {
      info: {} as GoodsInfo
    }
  },

  actions: {
    // 商品详情
    async getGoodsInfo(id: string) {
      const res = await request.get<ApiRes<GoodsInfo>>('/goods', { params: { id } })

      this.info = res.data.result
    },

    // 清空数据
    resetGoodsInfo() {
      this.info = {} as GoodsInfo
    }
  }
})