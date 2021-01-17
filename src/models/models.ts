import {
  NOTIFICATIONS_TYPES,
  ORDER_STATUSES,
  REQUIRED_ADDRESS_FIELDS,
  SEARCH_ITEM_TYPE,
  SEX_TYPES,
} from '@/models/enums';

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
  phone?: string;
  image?: string;
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

export interface SortOption {
  label: string;
  value: any;
}