export interface BrandMenuItem {
  title: string;
  imageUrl: string;
  href: string;
}

export interface ChildMenuItem {
  title: string;
  href: string;
}

export interface MenuChildItem {
  main: ChildMenuItem;
  links: ChildMenuItem[];
}

export interface BaseMenuItem {
  title: string;
  href: string;
  icon: string;
  isActive?: boolean;
}

export interface MenuItem extends BaseMenuItem {
  inGeneralMenu?: boolean;
  brands?: BrandMenuItem[];
  children?: MenuChildItem[];
}

export enum PRODUCT_FEATURES {
  DELIVERY = 'delivery',
  HOT = 'hot',
  DISCOUNT = 'discount',
}

export interface ProductOption {
  title: string;
  id: string;
  values: {
    label: string;
    value: string;
    selected?: boolean;
  }[];
}

export interface ProductFeature {
  type: PRODUCT_FEATURES;
  icon: string;
  time?: number;
}

export interface ProductDetailImage {
  url: string;
  isVideo?: boolean;
  videoLink?: string;
}

export interface ProductImage {
  preview: string;
  detail?: ProductDetailImage[];
}

export interface ProductDelivery {
  freeDelivery: string;
  refundFrom: string;
  refundTo: string;
}

export interface ProductShop {
  id: string;
  name: string;
  description: string;
  image: string;
  orders: number;
  rate: number | string;
  isFavourite: boolean;
}

export interface Product {
  id: string;
  title: string;
  rate: number | string;
  groups: number;
  images: ProductImage;
  features: ProductFeature[];
  options: ProductOption[];
  description: string;
  selfPrice: number;
  groupPrice: number;
  orders: number;
  isFavourite: boolean;
  shop?: ProductShop;
  delivery?: ProductDelivery;
}

export interface Group {
  id: string;
  isJoined: boolean;
  avatar: string;
  allUsers: number;
  joinedUsers: number;
  title: string;
  time: number;
}

export interface BreadcrumbLink {
  href?: string;
  label: string;
  current?: boolean;
}

export enum ORDER_STATUSES {
  SUCCESS = 'success',
  FAIL = 'fail',
}

export interface OrderUser {
  id: string;
  orderId: string;
  name: string;
  avatar: string;
}

export interface OrderItem {
  id: string;
  image: string;
  date: string;
  title: string;
  status: ORDER_STATUSES;
  time?: number | undefined;
  price: number;
  users?: OrderUser[];
  maxUsers?: number;
}

export interface SocialLink {
  href: string,
  icon: string,
  type: string,
  title: string,
}
