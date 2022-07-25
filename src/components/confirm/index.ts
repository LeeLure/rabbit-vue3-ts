import { h, render } from "vue"
import XtxConfirm from './confirm.vue'

type Options = {
  title: string
  text: string
}
export function Confirm({ title, text }: Options) {
  // // 创建容器
  // const div = document.createElement('div')
  // div.setAttribute('class', 'xtx-confirm-container')
  // document.body.appendChild(div)
  // // 使用 h 创建虚拟 DOM
  // const vnode = h(XtxConfirm, { title, text })
  // // 渲染到 div
  // render(vnode, div)
  // Promise 的状态不可逆, 只能修改为一种状态
  return new Promise((resolve, reject) => {
    function cancelCallback() {
      // console.log('用户点了取消')
      reject('取消') // 将来 .catch 会执行
      // render(null, div)
      div.remove()
    }
    function confirmCallback() {
      // console.log('用户点了确认')
      resolve('确定') // 将来 .then 的第一个回调会执行
      // render(null, div)
      div.remove()
    }
    // 创建容器
    const div = document.createElement('div')
    div.setAttribute('class', 'xtx-confirm-container')
    document.body.appendChild(div)
    // 使用 h 创建虚拟 DOM
    const vnode = h(XtxConfirm, { title, text, cancelCallback, confirmCallback })
    // 渲染到 div
    render(vnode, div)
  })
}