// 中转站：汇总导出
import useCategoryStore from "./modules/category";
import useHomeStore from "./modules/home";


export default function useStore() {
  return {
    category: useCategoryStore(),
    home: useHomeStore()
  }
}