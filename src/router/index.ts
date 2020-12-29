import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/brand/:id',
    name: 'Brand',
    component: () => import('../views/Shop.vue'),
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import('../views/Shop.vue'),
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: () => import('../views/Catalog.vue'),
  },
  {
    path: '/catalog/:id',
    name: 'Catalog item',
    component: () => import('../views/Catalog.vue'),
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('../views/Category.vue'),
  },
  {
    path: '/category/:id',
    name: 'Category item',
    component: () => import('../views/Category.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('../views/Product.vue'),
  },
  {
    path: '/product/:id/checkout',
    name: 'OrderCheckout',
    component: () => import('../views/OrderCheckout.vue'),
  },
  {
    path: '/product/:id/payment',
    name: 'OrderPayment',
    component: () => import('../views/OrderPayment.vue'),
  },
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue'),
  },
  {
    path: '/success',
    name: 'Success',
    component: () => import('../views/Success.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/profile/groups',
    name: 'Groups',
    component: () => import('../views/Groups.vue'),
  },
  {
    path: '/profile/orders',
    name: 'Orders',
    component: () => import('../views/Orders.vue'),
  },
  {
    path: '/profile/orders/:id',
    name: 'OrderDetail',
    component: () => import('../views/OrderDetail.vue'),
  },
  {
    path: '/profile/groups/:id',
    name: 'GroupDetail',
    component: () => import('../views/GroupDetail.vue'),
  },
  {
    path: '/profile/favourites',
    name: 'Favourites',
    component: () => import('../views/Favourites.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

export default router;
