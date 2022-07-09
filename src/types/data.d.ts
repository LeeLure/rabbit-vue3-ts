export interface CategoryItem {
  id: string
  name: string
  picture: string
  // 巧妙的设计：这是类型，不会造成死递归栈溢出
  children: CategoryItem[],
  show: boolean
  goods: GoodsItem[]
}

export interface ApiRes<T> {
  code: string
  msg: string
  result: T[]
}

export interface GoodsItem {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  discount?: number;
  orderNum?: number;
}

// 轮播图类型
export interface BannerItem {
  id: string;
  imgUrl: string;
  hrefUrl: string;
  type: string;
}

// 新鲜好物
export interface NewItem {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  discount?: number;
  orderNum: number;
}

// 人气推荐
export interface HotItem {
  id: string;
  picture: string;
  title: string;
  alt: string;
}

// 热门品牌
export type BrandItem = {
  id: string
  name: string
  nameEn: string
  logo: string
  picture: string
  type?: any
  desc: string
  place: string
}