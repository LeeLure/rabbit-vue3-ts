export interface CategoryItem {
  id: string
  name: string
  picture: string
}

export interface ApiRes<T> {
  code: string
  msg: string
  result: T[]
}