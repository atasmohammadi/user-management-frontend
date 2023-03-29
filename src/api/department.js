import http from '../utils/http';

export const getDepartment = (id) => {
  return http.get(`/department/${id}`);
};

export const getDepartments = () => {
  return http.get(`/department`);
};

export const updateDepartment = (params) => {
  return http.put(`/department`, params);
};

export const createDepartment = (params) => {
  return http.post(`/department`, params);
};
