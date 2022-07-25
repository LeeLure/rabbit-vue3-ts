import { defineStore } from 'pinia'
import axios from '@/utils/request'
import { CartItem } from '@/types/cart'
import { ApiRes } from '@/types/data'
import { Confirm } from '@/components/confirm'

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
      await Confirm({ title: '提示', text: '确定要删除吗?' })

      await axios.delete('/member/cart', {
        data: {
          ids: skuIds
        }
      })
      // 重新获取购物车数据
      this.getCartList()
    },

    // 购物车
    async updateCart(skuId: string, data: { selected?: boolean, count?: number }) {
      await axios.put('/member/cart/' + skuId, data)
      // 重新获取购物车数据
      this.getCartList()
    },

    // 全选
    async updateCartAllSelected(selected: boolean) {
      await axios.put('/member/cart/selected', {
        selected
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
    },

    // 全选
    isAllSelected(): boolean {
      return this.effectiveList.length > 0 && this.effectiveList.every(item => item.selected)
    },

    // 筛选出所有已选中的有效商品
    selectedList(): CartItem[] {
      return this.effectiveList.filter(item => item.selected)
    },

    // 所有选中的商品数量求和
    selectedCounts(): number {
      return this.selectedList.reduce((sum, item) => sum += item.count, 0)
    },

    // 所有选中的商品总价求和
    selectedPrice(): string {
      return this.selectedList.reduce((sum, item) => sum += +item.nowPrice * item.count, 0).toFixed(2)
    }
  }
})