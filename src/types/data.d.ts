export interface CategoryItem {
  id: string
  name: string
  picture: string
  // 巧妙的设计：这是类型，不会造成死递归栈溢出
  children: CategoryItem[],
  show: boolean
}

export interface ApiRes<T> {
  code: string
  msg: string
  result: T[]
}