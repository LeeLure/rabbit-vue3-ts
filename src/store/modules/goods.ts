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
    async getGoodsInfo(id: string) {
      const res = await request.get<ApiRes<GoodsInfo>>('/goods', {
        params: {
          id
        }
      })
      this.info = res.data.result
    }
  }
})