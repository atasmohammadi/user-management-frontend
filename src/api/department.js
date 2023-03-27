import http from '../utils/http';
import { isLoggedIn } from '../utils/token';

export const getDepartment = (id) => {
  if (!isLoggedIn) throw new Error('Unauthorized');
  return http.get(`/department/${id}`);
};

export const getDepartments = () => {
  if (!isLoggedIn) throw new Error('Unauthorized');
  return http.get(`/department`);
};

export const updateDepartment = (params) => {
  if (!isLoggedIn) throw new Error('Unauthorized');
  return http.put(`/department`, params);
};

export const createDepartment = (params) => {
  if (!isLoggedIn) throw new Error('Unauthorized');
  return http.post(`/department`, params);
};
