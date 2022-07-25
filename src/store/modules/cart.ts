import { defineStore } from 'pinia'
import axios from '@/utils/request'
import { CartItem } from '@/types/cart'
import { ApiRes } from '@/types/data'

export default defineStore('cart', {
  state() {
    return {
      list: [] as CartItem[]
    }
  },
  actions: {
    async addCart(data: { skuId: string, count: number }) {
      await axios.post('/member/cart', data)
      // 重新获取购物车列表
      this.getCartList()
    },

    // 购物车列表
    async getCartList() {
      const res = await axios.get<ApiRes<CartItem[]>>('/member/cart')
      // console.log(res)
      this.list = res.data.result
    },

    // 删除
    async deleteCart(skuIds: string[]) {
      await axios.delete('/member/cart', {
        data: {
          ids: skuIds
        }
      })
      // 重新获取购物车数据
      this.getCartList()
    }
  },

  getters: {
    // 过滤出所有有效的商品放到数组中并返回
    effectiveList(): CartItem[] {
      return this.list.filter(item => item.isEffective)
    },
    // 求所有有效商品的总数量
    effectiveCounts(): number {
      return this.effectiveList.reduce((sum, item) => sum += item.count, 0)
    },
    // 求所有有效商品的总价
    effectivePrice(): string {
      // 在 ts 中, string 类型如果参与运算. 不会被隐式转换, 需要自行转换
      return this.effectiveList.reduce((sum, item) => sum += +item.nowPrice * item.count, 0).toFixed(2)
    }
  }
})