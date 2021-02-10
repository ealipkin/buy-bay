import { SORT_PARAMS } from '@/models/enums';

export const API_URL = process.env.VUE_APP_API_URL;
export const PROXY_URL = process.env.VUE_APP_PROXY_URL;
export const AUTH_API_URL = process.env.VUE_APP_AUTH_API_URL;

export const DEFAULT_PAGINATE_PAGE = 1;

export interface PaginationInfo {
  page: number;
  sort: SORT_PARAMS | string;
}

export const endpoints = {
  index: '/mp/build',
  product: '/product',
  getPhoneCode: '/auth/phone',
  login: '/auth/login',
  user: '/auth/user',
  logout: '/auth/logout',
  refreshToken: '/auth/refresh ',
  getMenu: '/category/tree',
  favourites: {
    products: ({ page = DEFAULT_PAGINATE_PAGE, sort = '' }: PaginationInfo) => `/wishlist/products?page=${page}&sort=${sort}`,
    brands: ({ page = DEFAULT_PAGINATE_PAGE, sort = '' }: PaginationInfo) => `/wishlist/brands?page=${page}&sort=${sort}`,
    addProduct: (id) => `/wishlist/product/${id}/add`,
    deleteProduct: (id) => `/wishlist/product/${id}/delete`,
    addBrand: (id) => `/wishlist/brand/${id}/add`,
    deleteBrand: (id) => `/wishlist/brand/${id}/delete`,
    counter: '/wishlist/counter',
  },
  profile: {
    load: '/profile',
    edit: '/profile/edit',
    checkPhone: '/profile/check_phone',
    addresses: '/profile/addresses',
    counts: '/profile/left_menu_counts',
  },
  address: {
    get: (id) => `/profile/address/${id}`,
    update: (id) => `/profile/address/edit/${id}`,
    create: '/profile/address',
  },
  card: {
    create: '/profile/card/create',
    edit: (id) => `/profile/card/${id}`,
    setActive: (id) => `/profile/card/active/${id}`,
  },
  order: {
    get: (id) => `/order/get/${id}`,
    self: '/order/buyself',
    group: '/order/buygroup',
    cards: '/order/cards',
    addAddress: (orderId) => `/order/address/add/${orderId}`,
    selectAddress: '/order/address/select',
    selectCard: (orderId) => `/order/card/select/${orderId}`,
    pay: (orderId) => `/order/pay/${orderId}`,
    deleteAddress: (addressId, orderId) => `/profile/address/${addressId}/${orderId}`,
    deleteCard: (cardId, orderId) => `/profile/card/${cardId}/${orderId}`,
  },
  orders: {
    active: ({ page = DEFAULT_PAGINATE_PAGE, sort = '' }: PaginationInfo) => `/profile/orders/active?page=${page}&sort=${sort}`,
    inactive: ({ page = DEFAULT_PAGINATE_PAGE, sort = '' }: PaginationInfo) => `/profile/orders/inactive?page=${page}&sort=${sort}`,
  },
};
