import { useIntersectionObserver } from "@vueuse/core"
import { ref } from "vue"

// 数据懒加载
export function useLazyData(callback: () => void) {

  // 如果是原始封装，形参 callback 之前还应有个 target 的形参，且 target 无需定义
  const target = ref(null)

  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {

    if (isIntersecting) {
      // 进入可视区要做的事情 
      callback()

      // 只调用一次
      stop()
    }
  })

  return target
}