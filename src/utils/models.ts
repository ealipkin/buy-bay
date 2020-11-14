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
  count?: string;
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

export interface Location {
  street: string;
  house: string;
  flat: string;
  city: string;
  county: string;
  index: string;
}

export interface Contacts {
  name: string;
  phone: string;
  address: Location;
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
  title: string;
  rate: number | string;
  groups: number;
  images: ProductImage;
  features: ProductFeature[];
  meta: ProductMeta;
  options: ProductOption[];
  description: string;
  selfPrice: number;
  groupPrice: number;
  orders: number;
  isFavourite: boolean;
  shop?: ProductShop;
  delivery?: ProductDelivery;
  contacts: Contacts;
  users: OrderUser[];
  messages: Message[];
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
  SUCCESS = 'success', // заказ доставлен
  PENDING = 'pending', // ожидаем участников группы
  FULFILL = 'fulfill', // группа сформирована
  FAIL = 'fail', // группа не сформирована
  SEND = 'send', // заказ отправлен
  REJECT = 'reject', // заказ отменен
}

export enum REQUIRED_ADDRESS_FIELDS {
  SURNAME = 'surname',
  NAME = 'name',
  EMAIL = 'email',
  COUNTRY = 'country',
  CITY = 'city',
  INDEX = 'index',
}

export interface OrderUser {
  id: string;
  orderId: string;
  name: string;
  avatar: string;
}

export interface Message {
  userId: string;
  date: string;
  text: string;
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
  href: string;
  icon: string;
  type: string;
  title: string;
}

export interface AddressItem {
  id: string;
  isActive: boolean;
  [REQUIRED_ADDRESS_FIELDS.SURNAME]: string;
  [REQUIRED_ADDRESS_FIELDS.NAME]: string;
  patronymic: string;
  street?: string;
  house?: string;
  building?: string;
  part?: string;
  flat?: string;
  [REQUIRED_ADDRESS_FIELDS.EMAIL]: string;
  phone?: string;
  [REQUIRED_ADDRESS_FIELDS.CITY]: string;
  district?: string;
  [REQUIRED_ADDRESS_FIELDS.COUNTRY]: string;
  [REQUIRED_ADDRESS_FIELDS.INDEX]: string;
  getFullName?: () => string;
  getLocation?: () => string;
  getGlobal?: () => string;
}

export interface CardItem {
  id: string;
  isActive: boolean;
  type: string;
  number: string;
  owner: string;
  date: string;
  cvv: string;
}

export interface ProfileUser {
  id: string;
  name: string;
  surname: string;
  patronymic?: string;
  gender?: string;
  age?: string;
  contacts: { phone: string; email: string };
  avatar?: string;
  addresses: AddressItem[];
  cards: CardItem[];
}

export enum NOTIFICATIONS_TYPES {
  MESSAGE = 'message',
  GROUP = 'group',
  DELIVERY = 'delivery',
}

export interface NotificationItem {
  type: NOTIFICATIONS_TYPES;
  title: string;
  text: string;
  read: boolean;
}
