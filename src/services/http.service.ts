import axios from 'axios';
import { API_URL, PROXY_URL } from '@/config';

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

export const createRequest = async (method, url: string, data?, params?): Promise<any> => {
  const isErroredEndpoints = ['/profile'];
  // const isErroredEndpoints = [];
  const SAFE_API_URL = process.env.NODE_ENV && 'development' && isErroredEndpoints.includes(url) ? PROXY_URL : API_URL;
  const finalUrl = `${SAFE_API_URL}${url}`;
  return newRequest(method, finalUrl, data, params);
};
