export interface BrandMenuItem {
  title: string;
  imageUrl: string;
  href: string;
}

export interface ChildMenuItem {
  title: string;
  href: string;
}

export interface ChildItem {
  main: ChildMenuItem;
  links: ChildMenuItem[];
}

export interface MenuItem {
  title: string;
  href: string;
  icon: string;
  inGeneralMenu?: boolean;
  brands?: BrandMenuItem[];
  children?: ChildItem[];
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
  border: string;
  background: string;
  time?: number;
}

export interface ProductDetailImage {
  url: string;
  isVideo?: boolean;
  videoLink?: string
}

export interface ProductImage {
  preview: string;
  detail?: ProductDetailImage[];
}

export interface Product {
  id: string;
  title: string;
  rate: number;
  groups: number;
  images: ProductImage;
  features: ProductFeature[];
  options: ProductOption[];
  description: string;
  selfPrice: number;
  groupPrice: number;
  orders: number;
  isFavourite: boolean;
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
