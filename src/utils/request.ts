import { Message } from '@/components/message'
import useStore from '@/store'
import axios, { AxiosError } from 'axios'

// 备用接口地址: http://pcapi-xiaotuxian-front-devtest.itheima.net/
// https://apipc-xiaotuxian-front.itheima.net
const instance = axios.create({
  // baseURL: 'http://pcapi-xiaotuxian-front.itheima.net/',
  // baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net/',
  // baseURL: 'https://apipc-xiaotuxian-front.itheima.net',
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net/', // 已绑定
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 数据在 pinia 所以直接 useStore 获取 token
    const { user } = useStore()
    if (user.profile.token) {
      config.headers!.Authorization = 'Bearer ' + user.profile.token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError<{ message: string, code: string }>) {
    // 对响应错误做点什么
    if (error.response) {
      // Message.error(error.response.data.message)
      const { code, message } = error.response.data
      if (code === '501' && message === '三方登录失败') {
        Message.success('欢迎来到小兔鲜, 请您绑定账号')
      } else {
        Message.error(message)
      }
    } else {
      Message.error('网络异常，请稍后重置')
    }

    return Promise.reject(error)
  }
)

export default instance