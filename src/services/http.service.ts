import axios from 'axios';
import { API_URL } from '@/config';

const newRequest = async (method, url, data?, params?) =>
  // const token = getCookie('token');
  axios({
    method,
    url,
    data,
    params,
    /* headers: {
       'Authorization': 'Bearer ' + token
     } */
  });


export const createRequest = async (method, url, data?, params?) => {
  const finalUrl = `${API_URL}${url}`;
  return newRequest(method, finalUrl, data, params);
};
