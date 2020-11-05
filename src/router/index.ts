import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
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
    path: '/category',
    name: 'Category',
    component: () => import('../views/Category.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
  },
  {
    path: '/product/:id',
    name: 'ItemDetail',
    component: () => import('../views/ItemDetail.vue'),
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
    path: '/my-groups',
    name: 'MyGroups',
    component: () => import('../views/MyGroups.vue'),
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
