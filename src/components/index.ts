import { App } from 'vue'
import XtxSkeleton from './skeleton/index.vue'
import XtxCarousel from './carousel/index.vue'
import XtxMore from './more/index.vue'
import { useIntersectionObserver } from '@vueuse/core'
import defaultImage from '@/assets/images/200.png'
import Bread from './Bread/index.vue'
import BreadItem from './Bread/Item.vue'
import City from './city/index.vue'
import Numbox from './number/index.vue'


export default {
  install(app: App) {
    // 全局注册组件
    // 骨架屏
    app.component(XtxSkeleton.name, XtxSkeleton)
    // 轮播图
    app.component(XtxCarousel.name, XtxCarousel)
    // 查看更多
    app.component(XtxMore.name, XtxMore)
    // 面包屑
    app.component(Bread.name, Bread)
    app.component(BreadItem.name, BreadItem)
    // 城市
    app.component(City.name, City)
    // 商品数量
    app.component(Numbox.name, Numbox)



    // 全局注册组件
    // 参数1: 指令名
    // 参数2: 配置项
    app.directive('slowimage', {
      // Vue2: 当绑定的元素插入到 DOM 中时执行, inserted
      // inserted(el, binding) {}
      // Vue3: 改为了 mounted
      mounted(el, binding) {
        // el: 当前指令绑定的 DOM 元素
        // console.log(el, binding)
        // 逻辑: 当 el 进入可视区后, 给它设置 src 属性
        useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            el.src = binding.value
          }
        })

        // 对图片进行错误处理
        // onerror 事件：图片加载失败时触发
        el.onerror = () => {
          // image 的 src 只有两种：base64的字符串 url
          el.src = defaultImage
        }
      }
    })
  }
}