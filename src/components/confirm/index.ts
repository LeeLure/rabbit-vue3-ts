import { h, render } from "vue"
import XtxConfirm from './confirm.vue'

type Options = {
  title: string
  text: string
}
export function Confirm({ title, text }: Options) {
  // 创建容器
  const div = document.createElement('div')
  div.setAttribute('class', 'xtx-confirm-container')
  document.body.appendChild(div)
  // 使用 h 创建虚拟 DOM
  const vnode = h(XtxConfirm, { title, text })
  // 渲染到 div
  render(vnode, div)
}