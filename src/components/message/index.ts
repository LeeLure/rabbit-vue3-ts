import { h, render } from "vue";
import message from './message.vue'

type Options = {
  type: 'success' | 'error' | 'warning'
  text: string
}

// Message({ type: 'success', text: '刘狄威牛逼' })
// 封装到函数
// { text, type } 结构参数
// 参数 1 是配置对象
export function Message(options: Options) {
  // 创建 message 组件的虚拟 DOM
  const vnode = h(message, options)
  // 渲染到 body
  render(vnode, document.body)
}