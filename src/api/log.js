import http from '../utils/http';
import { isLoggedIn } from '../utils/token';

export const getLog = (id) => {
  if (!isLoggedIn) throw new Error('Unauthorized');
  return http.get(`/log/${id}`);
};

export const getLogs = () => {
  if (!isLoggedIn) throw new Error('Unauthorized');
  return http.get(`/log`);
};
