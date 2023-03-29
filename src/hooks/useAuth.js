import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
import { useSnackbar } from './useSnackbar';
import http from '../utils/http';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  // call this function when you want to authenticate the user
  const login = async (email, password) => {
    try {
      const res = await http.post(`/auth/login`, {
        email,
        password,
      });
      if (res.data && res.data.token) {
        showSnackbar('Logged in successfully', 'success');
        setUser(res.data.token);
        navigate('/dashboard');
        return res.data;
      }
      throw new Error(res.message);
    } catch (e) {
      showSnackbar('Login failed', 'error');
      setUser(null);
      throw e;
    }
  };

  // call this function when you want to register the user
  const register = async (email, password) => {
    try {
      const res = await http.post(`/auth/register`, {
        password,
        email,
      });
      if (res.data && res.data.token) {
        showSnackbar('Registered successfully', 'success');
        setUser(res.data.token);
        navigate('/dashboard');
        return res.data;
      }
      throw new Error(res.message);
    } catch (e) {
      showSnackbar('Registration failed', 'error');
      setUser(null);
      throw e;
    }
  };

  // call this function to sign out logged in user
  const logout = () => {
    showSnackbar('Logged out successfully', 'success');
    setUser(null);
    navigate('/', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      register,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
