import http from '../utils/http';

export const getDepartment = async (id) => {
  const res = await http.get(`/department/${id}`);
  return res.data;
};

export const getDepartments = async () => {
  const res = await http.get(`/department`);
  return res.data;
};

export const updateDepartment = async (params) => {
  const res = await http.put(`/department`, params);
  return res.data;
};

export const createDepartment = async (params) => {
  const res = await http.post(`/department`, params);
  return res.data;
};
