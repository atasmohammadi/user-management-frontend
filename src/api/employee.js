import http from '../utils/http';
import { isLoggedIn } from '../utils/token';

export const getEmployee = (id) => {
  if (!isLoggedIn) throw new Error('Unauthorized');
  return http.get(`/employee/${id}`);
};

export const getEmployees = () => {
  if (!isLoggedIn) throw new Error('Unauthorized');
  return http.get(`/employee`);
};

export const updateEmployee = (params) => {
  if (!isLoggedIn) throw new Error('Unauthorized');
  return http.put(`/employee`, params);
};

export const createEmployee = (params) => {
  if (!isLoggedIn) throw new Error('Unauthorized');
  return http.post(`/employee`, params);
};
