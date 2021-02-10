import { PRODUCT_FEATURES } from '@/models/enums';
import {
  Contacts, Group, Message, OrderUser,
} from '@/models/models';

export interface ProductOption {
  title: string;
  id?: string;
  id_property?: string;
  values: {
    label: string;
    value: string;
    selected?: boolean;
  }[];
}

export interface ProductFeature {
  type: PRODUCT_FEATURES;
  icon: string; // class
  title: string;
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
  id_brand: string;
  name: string;
  brand?: string;
  description: string;
  category: string;
  image: string;
  orders: number;
  rate: number | string;
  isFavourite: boolean;
}

export interface ProductMetaItem {
  title: string;
  value: object;
}

export interface ProductMeta {
  date: ProductMetaItem;
  index: ProductMetaItem;
  status: ProductMetaItem;
  color: ProductMetaItem;
  size: ProductMetaItem;
  quantity: ProductMetaItem;
  delivery: ProductMetaItem;
  resultCost: ProductMetaItem;
}

export interface Product {
  id: string;
  product_id: string;
  title: string;
  rate: number | string;
  groups: number;
  group?: {
    groupCount: number;
    data: Group[];
  };
  images: ProductImage;
  features: ProductFeature[];
  meta: ProductMeta;
  options: {
    [key: string]: ProductOption;
  };
  maxCount: number;
  description: string;
  crossedPrice: number;
  selfPrice: number;
  groupPrice: number;
  orders: number;
  watches?: number;
  isFavourite: boolean;
  brand?: ProductShop;
  delivery?: ProductDelivery | false;
  contacts: Contacts | false;
  users: OrderUser[];
  messages: Message[];
  orderDate: string | Date;
}

export interface BrandItem {
  brand: string;
  category: string;
  data: Product[];
  id_brand: string;
  link: string;
  rate: number;
}
