import { h, render } from "vue";
import message from './message.vue'

type Options = {
  type: 'success' | 'error' | 'warning'
  text: String
  duration?: number
}

// Message({ type: 'success', text: '刘狄威牛逼' })
// 封装到函数
// { text, type } 结构参数
// 参数 1 是配置对象
export function Message({ type, text, duration = 2000 }: Options) {

  // 创建一个 div 将其添加至 body
  const div = document.createElement('div')

  // 添加类名
  div.setAttribute('class', 'xtx-message-container')

  // 追加到 body 
  document.body.appendChild(div)

  // 1. 创建 message 组件的虚拟 DOM
  const vnode = h(message, { type, text })
  // 2. 渲染到 body => 渲染到 div
  render(vnode, div)

  // 开启定时器: 等 3 秒后让其消失
  setTimeout(() => {
    // 调用 render 函数, 传入 null
    render(null, div)
    // 移除 div
    div.remove() // 自我了结
  }, duration)
}