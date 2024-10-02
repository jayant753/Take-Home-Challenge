import api from './api';

export const loginUser = async (credentials) => {
  const { data } = await api.post('/login', credentials);
  return data;
};

export const registerUser = async (userInfo) => {
  const { data } = await api.post('/register', userInfo);
  return data;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
};
