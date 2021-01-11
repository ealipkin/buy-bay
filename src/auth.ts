import driverAuthBearer from '@websanova/vue-auth/dist/drivers/auth/bearer.esm';
import driverHttpAxios from '@websanova/vue-auth/dist/drivers/http/axios.1.x.esm';
import driverRouterVueRouter from '@websanova/vue-auth/dist/drivers/router/vue-router.2.x.esm';
import { API_URL } from '@/config';

import axios from 'axios';
import router from './router';

/**
 * Authentication configuration, some of the options can be override in method calls
 */

const config = {
  plugins: {
    http: axios, // Axios
    // http: Vue.http, // Vue Resource
    router,
  },
  drivers: {
    auth: driverAuthBearer,
    http: driverHttpAxios,
    router: driverRouterVueRouter,
  },
  options: {
    rememberKey: 'auth_remember',
    tokenDefaultKey: 'laravel-jwt-auth',
    stores: ['storage', 'cookie'],
    registerData: {
      url: `${API_URL}/auth/register`,
      method: 'POST',
      redirect: '/login',
    },
    loginData: {
      url: `${API_URL}/auth/login`,
      method: 'POST',
      redirect: '',
      fetchUser: false,
    },
    logoutData: {
      url: `${API_URL}/auth/logout`,
      method: 'POST',
      makeRequest: false,
    },
    fetchData: {
      url: `${API_URL}/auth/user`,
      method: 'GET',
      enabled: false,
    },
    refreshData: {
      url: `${API_URL}/auth/refresh`,
      method: 'GET',
      enabled: true,
      interval: 30,
    },
  },
};

export default config;
