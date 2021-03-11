import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import $store from '../store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/brand/:id',
    name: 'Brand',
    component: () => import('../views/Catalog.vue'),
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
    path: '/category/:id',
    name: 'Category item',
    component: () => import('../views/Category.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Catalog.vue'),
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('../views/Product.vue'),
  },
  // {
  //   path: '/product/:id/checkout',
  //   name: 'OrderCheckout',
  //   component: () => import('../views/OrderCheckout.vue'),
  // },
  {
    path: '/order/:id',
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
    path: '/profile/favourites',
    name: 'Favourites',
    component: () => import('../views/Favourites.vue'),
  },
  {
    path: '/profile/groups',
    name: 'Groups',
    component: () => import('../views/Orders.vue'),
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

export async function updateProfileCounts(to, from, next) {
  if (to.path.includes('profile')) {
    await $store.dispatch('app/updateProfileCounts');
  }
  next();
}

export async function loadUser(to, from, next) {
  await $store.dispatch('app/loadUser');
  next();
}

export async function redirectForPublic(to, from, next) {
  if (to.path.includes('/public')) {
    const newPath = to.path.replace('/public', '');
    next({ path: newPath, query: to.query });
  } else {
    next();
  }
}

router.beforeEach(redirectForPublic);
router.beforeEach(loadUser);
router.beforeEach(updateProfileCounts);
export default router;
