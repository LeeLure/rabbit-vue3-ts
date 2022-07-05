import { defineStore } from 'pinia'

// defineStore 返回的是一个函数
export default defineStore('category', {
  state() {
    return {
      msg: 'Hello Word'
    }
  }
})