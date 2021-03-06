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
  result: T
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

// 好物：居家、美食、服饰
export interface ProductRes {
  id: string;
  name: string;
  picture: string;
  saleInfo: string;
  children: ChildItem[];
  goods: GoodItem[];
}

export interface GoodItem {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  discount?: any;
  orderNum: number;
}

interface ChildItem {
  id: string;
  name: string;
  layer: number;
  parent?: any;
}

// 最新专题
interface Special {
  creator: string;
  isDelete: number;
  createTime: string;
  updateTime: string;
  id: string;
  classificationId: string;
  title: string;
  summary: string;
  lowestPrice: number;
  cover: string;
  detailsUrl: string;
  collectNum: number;
  viewNum: number;
  replyNum: number;
}

// 顶级分类
interface TopCategory {
  id: string;
  name: string;
  picture?: any;
  children: TopCategoryItem[];
}

// 二级分类
export interface SubCategory {
  id: string;
  name: string;
  picture?: any;
  parentId: string;
  parentName: string;
  goods: Good[];
  categories: Category[];
  brands: Brand[];
  saleProperties: SaleProperty[];
}

export interface SaleProperty {
  id: string;
  name: string;
  properties: Property[];
}

export interface Property {
  id: string;
  name: string;
}

export interface Brand {
  id: string;
  name: string;
  nameEn: string;
  logo: string;
  picture: string;
  type?: any;
  desc: string;
  place: string;
}

interface Category {
  id: string;
  name: string;
  layer: number;
  parent?: any;
}

interface Good {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  discount?: any;
  orderNum: number;
}

// 商品详情
export type GoodsInfo = {
  id: string
  name: string
  spuCode: string
  desc: string
  price: string
  oldPrice: string
  discount: number
  inventory: number
  salesCount: number
  commentCount: number
  collectCount: number
  mainVideos: any[]
  videoScale: number
  mainPictures: string[]
  isPreSale: boolean
  isCollect?: any
  recommends?: any
  userAddresses?: any
  evaluationInfo?: any
  categories: {
    id: string
    name: string
  }[]
  specs: SpecItem[]
  skus: SkuItem[]
  details: GoodsDetail
}

// 商品的规格类型
export type SpecItem = {
  name: string
  values: ValueItem[]
}

// 商品的规格的值的类型
export type ValueItem = {
  desc: string
  name: string
  picture: string
  selected: boolean
  disabled: boolean
}

// sku 类型
export type SkuItem = {
  id: string
  inventory: number
  oldPrice: string
  price: string
  skuCode: string
  specs: {
    name: string
    valueName: string
  }[]
}

// 商品详情
export type GoodsDetail = {
  pictures: string[]
  properties: {
    name: string
    value: string
  }[]
}