import axios from 'axios';
import { getToken, removeToken } from './token';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.reponse) {
      if (error.response.status === 401 || error.response.status === 403) {
        console.error('error 401 or 403', error.response);
        removeToken();
      }
    }
    return error;
  }
);

// instance.interceptors.request.use((request) => {
//   console.log('baseURL', request.baseURL);
//   return request;
// });

export default instance;
