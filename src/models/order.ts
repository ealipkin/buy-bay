import { ORDER_STATUSES, PRODUCT_FEATURES } from '@/models/enums';
import {
  Contacts, ISeoBlock, Message, OrderUser, UserAddressItem,
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
  brand_id: string;
  name: string;
  brand?: string;
  description: string;
  category: string;
  image: string;
  orders: number;
  rate: number | string;
  isFavourite: boolean;
  link: string;
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

export interface BrandItem {
  brand: string;
  category: string;
  data: Product[];
  id_brand: string;
  link: string;
  rate: number;
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
  short_link: string;
}

export interface OrderPaymentOption {
  propValue: {
    id_property_value?: number;
    title: string | Date;
  };
  property: {
    id_property?: number;
    is_required?: number;
    title: string;
    type?: string;
  };
  isDate?: boolean;
}

export interface OrderPaymentItem {
  orderProductOptions: OrderPaymentOption[];
  product: Product;
}

export interface Order {
  created_at: string;
  group_id?: number;
  id: number;
  is_group: number;
  oid: string;
  payment_card_id?: number;
  payment_id?: number;
  price: number;
  order_status_id: ORDER_STATUSES;
  updated_at: string;
  user_address_id?: number;
  user_id: number;
}

export interface GroupUser {
  created_at: string;
  group_id: number;
  id: number;
  image: string;
  emoji?: string;
  is_creator: number;
  name: string;
  updated_at: string;
  user_id: number;
}

export interface Group {
  allUsers: number;
  avatar: string;
  created_at: string;
  group_status: string;
  id: number;
  isJoined: any;
  is_complete: number;
  joinedUsers: GroupUser[];
  now: string; // "08:46:08"
  time: number;
  time_h: string; // "23"
  time_min: number;
  title: string;
}

export interface OrderPaymentPos {
  amount: number;
  created_at: string;
  id: number;
  order_id: number;
  price: number;
  product_id: number;
  updated_at: string;
}

export interface OrderStatus {
  code: string; // 'in_process'
  comment: string; // 'Юзер нажал кнопку, оформляет'
  id: number;
  is_bad: number;
  message?: any;
  notify?: any;
  sms?: any;
  title: string; // 'В процессе оформления'
}

export interface OrderDelivery {
  from: number;
  title: string;
  to: number;
}

export interface OrderData {
  address: UserAddressItem;
  order: Order;
  group?: Group;
  orderItems: OrderPaymentItem[];
  orderPos: OrderPaymentPos[];
  order_status: OrderStatus;
  delivery?: OrderDelivery;
  orderInfo?: OrderData;
  seo_block: ISeoBlock;
}
