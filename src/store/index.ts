// 中转站：汇总导出
import useCategoryStore from "./modules/category";
import useHomeStore from "./modules/home";
import useGoodsStore from './modules/goods'


export default function useStore() {
  return {
    category: useCategoryStore(),
    home: useHomeStore(),
    goods: useGoodsStore()
  }
}