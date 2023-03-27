import http from '../utils/http';
import { isLoggedIn } from '../utils/token';

export const getUser = (id) => {
  if (!isLoggedIn) throw new Error('Unauthorized');
  return http.get(`/user/${id}`);
};

export const getUsers = () => {
  if (!isLoggedIn) throw new Error('Unauthorized');
  return http.get(`/user`);
};

export const updateUser = (params) => {
  if (!isLoggedIn) throw new Error('Unauthorized');
  return http.put(`/user`, params);
};
