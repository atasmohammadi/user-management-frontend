import http from '../utils/http';

export const getLog = (id) => {
  return http.get(`/log/${id}`);
};

export const getLogs = () => {
  return http.get(`/log`);
};
