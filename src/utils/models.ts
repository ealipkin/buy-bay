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
  href?: string;
  icon?: string;
  action?: string;
  is_active?: boolean;
  count?: string;
}

export interface MenuItem extends BaseMenuItem {
  is_general_menu?: boolean;
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
  name: string;
  description: string;
  category: string;
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
  shop?: ProductShop;
  delivery?: ProductDelivery | false;
  contacts: Contacts | false;
  users: OrderUser[];
  messages: Message[];
  orderDate: string | Date;
}

export interface Group {
  id: string;
  isJoined: boolean;
  avatar: string;
  allUsers: number;
  joinedUsers: GroupUser[] | [] | null;
  title: string;
  time: number;
}

export interface BreadcrumbLink {
  href?: string;
  label: string;
  current?: boolean;
}

export enum ORDER_STATUSES {
  // SUCCESS = 'success', // заказ доставлен
  // PENDING = 'pending', // ожидаем участников группы
  // FAIL = 'fail', // группа не сформирована
  REJECT = 'reject', // заказ отменен
  // success order statuses
  FULFILL = 'fulfill', // группа сформирована
  PREPARED = 'prepared', // Заказ передан продавцу
  SEND = 'send', // заказ отправлен
  // fail order statuses
  CANCELLED = 'cancelled', // Заказ отменён продавцом
  CANCELLED_BY_CUSTOMER = 'cancelledByCustomer', // Заказ отменён покупателем
  DELIVERED = 'delivered', // Заказ доставлен
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

export interface GroupUser {
  group_id: number;
  id: number;
  is_creator: number;
  name: string;
  user_id: number;
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
  sex?: {
    label: string;
    value: SEX_TYPES;
  };
  age?: string;
  birthday?: Date;
  contacts: { phone: string; email: string };
  avatar?: string;
  addresses: AddressItem[];
  cards: CardItem[];
  getFormatDate?: () => string;
}

export enum NOTIFICATIONS_TYPES {
  MESSAGE = 'message',
  GROUP = 'group',
  DELIVERY = 'delivery',
}

export enum SEX_TYPES {
  MALE = 'male',
  FEMALE = 'female',
}

export interface NotificationItem {
  type: NOTIFICATIONS_TYPES;
  title: string;
  text: string;
  read: boolean;
}

export interface SeoBlock {
  title: string;
  text: string;
  meta_title: string;
  meta_desc: string;
  og_desc: string;
}

export interface BigSliderItem {
  image: string;
  image_mob: string;
  link: string;
  title: string;
}

export interface BrandItem {
  brand: string;
  category: string;
  data: Product[];
  id_brand: string;
  link: string;
  rate: number;
}

export enum SEARCH_ITEM_TYPE {
  BRAND = 'brand',
  PRODUCT = 'product',
  CATEGORY = 'category',
}

export interface SearchItem {
  id: string;
  type: SEARCH_ITEM_TYPE;
  title: string;
  image?: string;
  price?: number | string;
  groups?: number;
}

export interface SearchSuggestItem {
  title: string;
  items: SearchItem[];
}
