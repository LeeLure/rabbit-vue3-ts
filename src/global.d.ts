import XtxSkeleton from '@/components/skeleton/index.vue'
// 参考：
declare module 'vue' {
  export interface GlobalComponents {
    // 组件名：typeof 组件对象
    XtxSkeleton: typeof XtxSkeleton
  }
}
export { }