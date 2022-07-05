// 中转站：汇总导出
import useCategoryStore from "./modules/category";

export default function useStore() {
  return {
    category: useCategoryStore()
  }
}