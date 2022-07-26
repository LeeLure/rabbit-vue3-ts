import useStore from '@/store';
import { ApiRes } from './../../types/data.d';
import { defineStore } from 'pinia'
import axios from '@/utils/request'
import { Profile } from '@/types/user';
import { getProfile, removeProfile, setProfile } from '@/utils/storage';

export default defineStore('user', {

  state() {
    return {
      profile: getProfile() as Profile
    }
  },

  actions: {

    // 登录
    async login(data: { account: String, password: String }) {
      const res = await axios.post<ApiRes<Profile>>('/login', data)
      // console.log(res);
      this.profile = res.data.result

      // 本地化
      setProfile(res.data.result)

      const { cart } = useStore()
      cart.mergeLocalCart()
    },

    // 获取手机验证码
    async sendMobileMsg(mobile: string) {
      await axios.get('/login/code', { params: { mobile } })

      const { cart } = useStore()
      cart.mergeLocalCart()
    },

    // 短信登录
    async mobileLogin(data: { mobile: String, code: String }) {
      const res = await axios.post<ApiRes<Profile>>('/login/code', data)
      // 1. 保存用户信息到 state 中
      this.profile = res.data.result

      // 本地化
      setProfile(res.data.result)

      const { cart } = useStore()
      cart.mergeLocalCart()
    },

    logout() {
      // 清除 pinia 的数据
      this.profile = {} as Profile
      // 清除 localStorage 的信息
      removeProfile()
      // 清空购物车
      const { cart } = useStore()
      cart.clearCart()
    },

    // QQ登录
    async qqLogin(data: { unionId: string, source: number }) {
      const res = await axios.post<ApiRes<Profile>>('/login/social', data)
      this.profile = res.data.result
      setProfile(res.data.result)

      const { cart } = useStore()
      cart.mergeLocalCart()
    },

    async bindQQSms(mobile: string) {
      await axios.get('/login/social/code', {
        params: {
          mobile
        }
      })

      const { cart } = useStore()
      cart.mergeLocalCart()
    },

    // 绑定账号
    async bindQQ(data: { unionId: string, mobile: string, code: string }) {
      const res = await axios.post<ApiRes<Profile>>('/login/social/bind', data)
      this.profile = res.data.result
      setProfile(res.data.result)

      const { cart } = useStore()
      cart.mergeLocalCart()
    },

    async sendQQPathMsg(mobile: string) {
      await axios.get('/register/code', {
        params: {
          mobile
        }
      })

      const { cart } = useStore()
      cart.mergeLocalCart()
    },

    async qqPatchLogin(data: any) {
      const res = await axios.post<ApiRes<Profile>>(
        `/login/social/${data.openId}/complement`,
        data
      )
      // 1. 保存用户信息到 state 中
      this.profile = res.data.result
      setProfile(res.data.result)

      const { cart } = useStore()
      cart.mergeLocalCart()
    }
  }
})