import http from '../utils/http';

export const getLog = async (id) => {
  const res = await http.get(`/log/${id}`);
  return res.data;
};

export const getLogs = async () => {
  const res = await http.get(`/log`);
  return res.data;
};
