import http from '../utils/http';

export const getUser = async (id) => {
  const res = await http.get(`/user/${id}`);
  return res.data;
};

export const getUsers = async () => {
  const res = await http.get(`/user`);
  return res.data;
};

export const updateUser = async (params) => {
  const res = await http.put(`/user`, params);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await http.delete(`/user/${id}`);
  return res.data;
};
