import XtxSkeleton from '@/components/skeleton/index.vue'
import XtxCarousel from '@/components/carousel/index.vue'
import XtxMore from '@/components/more/index.vue'
import XtxBread from '@/components/bread/index.vue'
import XtxBreadItem from '@/components/bread/item.vue'
import XtxCity from '@/components/city/index.vue'
import XtxNumBox from '@/components/number/index.vue'
import XtxButton from '@/components/button/index.vue'
import XtxCheckBox from '@/components/checkbox/index.vue'
import XtxDialog from '@/components/dialog/index.vue'
import XtxSwitch from '@/components/switch/index.vue'

// 参考：
declare module 'vue' {
  export interface GlobalComponents {
    // 组件名：typeof 组件对象
    XtxSkeleton: typeof XtxSkeleton
    XtxCarousel: typeof XtxCarousel
    XtxMore: typeof XtxMore
    XtxBread: typeof XtxBread
    XtxBreadItem: typeof XtxBreadItem
    XtxCity: typeof XtxCity
    XtxNumBox: typeof XtxNumBox
    XtxButton: typeof XtxButton
    XtxCheckBox: typeof XtxCheckBox
    XtxDialog: typeof XtxDialog
    XtxSwitch: typeof XtxSwitch
  }
}
export { }