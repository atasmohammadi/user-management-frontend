import http from '../utils/http';

export const getEmployee = async (id) => {
  const res = await http.get(`/employee/${id}`);
  return res.data;
};

export const getEmployees = async () => {
  const res = await http.get(`/employee`);
  return res.data;
};

export const updateEmployee = async (params) => {
  const res = await http.put(`/employee`, params);
  return res.data;
};

export const createEmployee = async (params) => {
  const res = await http.post(`/employee`, params);
  return res.data;
};

export const deleteEmployee = async (id) => {
  const res = await http.delete(`/employee/${id}`);
  return res.data;
};
