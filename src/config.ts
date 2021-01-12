export const API_URL = process.env.VUE_APP_API_URL;
export const AUTH_API_URL = process.env.VUE_APP_AUTH_API_URL;

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
    counter: '/wishlist/counter',
  },
};
