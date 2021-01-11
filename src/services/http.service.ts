import axios from 'axios';
import { API_URL } from '@/config';

// const token = getCookie('token');
const newRequest = async (method, url, data?, params?) => {
  const token = localStorage.getItem('laravel-jwt-auth');
  return axios({
    method,
    url,
    data,
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createRequest = async (method, url, data?, params?) => {
  const finalUrl = `${API_URL}${url}`;
  return newRequest(method, finalUrl, data, params);
};
