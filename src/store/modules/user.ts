import { ApiRes } from './../../types/data.d';
import { defineStore } from 'pinia'
import axios from '@/utils/request'
import { Profile } from '@/types/user';

export default defineStore('user', {

  state() {
    return {
      profile: {} as Profile
    }
  },

  actions: {

    // 登录
    async login(data: { account: String, password: String }) {
      const res = await axios.post<ApiRes<Profile>>('/login', data)
      // console.log(res);
      this.profile = res.data.result
    }
  }
})