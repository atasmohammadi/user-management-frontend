import http from '../utils/http';
import { setToken } from '../utils/token';

export const login = async (email, password) => {
  try {
    const res = await http.post(`/auth/login`, {
      email,
      password,
    });
    if (res.data.token) {
      setToken(res.data.token);
    }
    return res.data.token;
  } catch (e) {
    setToken(null);
    throw e;
  }
};

export const register = async ({ email, password }) => {
  try {
    const res = await http.post(`/auth/register`, {
      password,
      email,
    });
    if (res.data.token) {
      setToken(res.data.token);
    }
    return res.data.token;
  } catch (e) {
    setToken(null);
    throw e;
  }
};
