import axios from 'axios';

const getUser = () => {
  const value = window.localStorage.getItem('user');
  if (value) {
    return JSON.parse(value);
  }
  return null;
};

const removeUser = () => window.localStorage.removeItem('user');

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use((config) => {
  const user = getUser();

  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.reponse) {
      if (error.response.status === 401 || error.response.status === 403) {
        console.error('error 401 or 403', error.response);
        removeUser();
      }
    }
    return error;
  }
);

// instance.interceptors.request.use((request) => {
//   console.log('baseURL', request.baseURL);
//   return request;
// });

export default instance;
