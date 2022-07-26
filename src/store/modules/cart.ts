import useStore from '@/store';
import { defineStore } from 'pinia'
import axios from '@/utils/request'
import { CartItem } from '@/types/cart'
import { ApiRes } from '@/types/data'
import { Confirm } from '@/components/confirm'

export default defineStore('cart', {
  // 本地化
  // persist: true,
  persist: {
    key: 'rabbit-ts-list'
  },

  state() {
    return {
      list: [] as CartItem[]
    }
  },
  actions: {
    async addCart(data: CartItem) {
      // 靠 token
      if (this.isLogin) {
        // 添加购物车
        await axios.post('/member/cart', {
          skuId: data.skuId,
          count: data.count
        })
        // 重新获取最新的购物车列表
        this.getCartList()
      } else {
        // 操作的是本地数据
        // 不是直接添加到 list 中
        // 而是需要判断, 如果该 sku 已经在购物车了
        const sku = this.list.find(item => item.skuId === data.skuId)
        if (sku) {
          // 找到对应的 sku 将其数量累加
          sku.count += data.count
        } else {
          // 如果不在购物车就是添加到购物车
          this.list.unshift(data)
        }
      }
    },

    // 购物车列表
    async getCartList() {
      if (this.isLogin) {
        const res = await axios.get<ApiRes<CartItem[]>>('/member/cart')
        // console.log(res)
        this.list = res.data.result
      } else {
        // 获取本地数据
        this.list.forEach(async sku => {
          const res = await axios.get<ApiRes<CartItem>>('/goods/stock/' + sku.skuId)
          const { nowPrice, stock, isEffective } = res.data.result
          sku.nowPrice = nowPrice
          sku.stock = stock
          sku.isEffective = isEffective
        })
      }
    },

    // 删除
    async deleteCart(skuIds: string[]) {
      await Confirm({ title: '提示', text: '确定要删除吗?' })

      if (this.isLogin) {
        await axios.delete('/member/cart', {
          data: {
            ids: skuIds
          }
        })
        // 重新获取购物车数据
        this.getCartList()
      } else {
        // 将用户传递过来的 skuId 对应的数据删除
        // 筛选出不在 skuIds 数组中的数据, 然后覆盖回 list 即可
        this.list = this.list.filter(item => !skuIds.includes(item.skuId))
      }
    },

    // 购物车
    async updateCart(skuId: string, data: { selected?: boolean, count?: number }) {
      if (this.isLogin) {
        await axios.put('/member/cart/' + skuId, data)
        // 重新获取购物车数据
        this.getCartList()
      } else {
        // 修改本地的数据
        // 1. 根据 skuId 找到对应的 sku
        const sku = this.list.find(item => item.skuId === skuId)
        // 2. 修改其选中状态和数量
        if (data.selected !== undefined) { // 如果就是想改为 false 
          sku!.selected = data.selected
        }
        if (data.count !== undefined) {
          sku!.count = data.count
        }
      }
    },

    // 全选
    async updateCartAllSelected(selected: boolean) {
      if (this.isLogin) {
        await axios.put('/member/cart/selected', {
          selected
        })
        // 重新获取购物车数据
        this.getCartList()
      } else {
        this.list.forEach(item => item.selected = selected)
      }
    },

    // 清空购物车
    clearCart() {
      this.list = []
    },

    // 合并购物车
    async mergeLocalCart() {
      const data = this.list.map(item => ({
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }))
      await axios.post('/member/cart/merge', data)
      // 重新获取购物车列表
      this.getCartList()
    }
  },

  getters: {
    // 定义一个计算属性, 获取登录状态
    isLogin(): boolean {
      const { user } = useStore()
      // return Boolean(user.profile.token)
      // return user.profile.token ? true : false
      // token: '123456'
      // 先取反(隐式转换) !token => false
      // 再转成原来的值对应的布尔值: !!token => true
      // 双重否定表肯定, 两次取反就是原值对应的布尔值
      return !!user.profile.token
    },

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