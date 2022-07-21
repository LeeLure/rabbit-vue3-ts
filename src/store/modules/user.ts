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
    },

    // 获取手机验证码
    async sendMobileMsg(mobile: string) {
      await axios.get('/login/code', { params: { mobile } })
    },

    // 短信登录
    async mobileLogin(data: { mobile: String, code: String }) {
      const res = await axios.post<ApiRes<Profile>>('/login/code', data)
      // 1. 保存用户信息到 state 中
      this.profile = res.data.result

      // 本地化
      setProfile(res.data.result)
    },

    logout() {
      // 清除 pinia 的数据
      this.profile = {} as Profile
      // 清除 localStorage 的信息
      removeProfile()
    },

    // QQ登录
    async qqLogin(data: { unionId: string, source: number }) {
      const res = await axios.post<ApiRes<Profile>>('/login/social', data)
      this.profile = res.data.result
      setProfile(res.data.result)
    }
  }
})