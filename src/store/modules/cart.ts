import { defineStore } from 'pinia'
import axios from '@/utils/request'

export default defineStore('cart', {
  state() {
    return {
      list: []
    }
  },
  actions: {
    async addCart(data: { skuId: string, count: number }) {
      await axios.post('/member/cart', data)
    }
  }
})