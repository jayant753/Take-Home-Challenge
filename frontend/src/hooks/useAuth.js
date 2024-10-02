import { useState } from 'react';
import { loginUser, registerUser, logoutUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const { token, username } = await loginUser(credentials);
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      navigate('/projects');
    } catch (error) {
      setAuthError(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (userInfo) => {
    try {
      await registerUser(userInfo);
      navigate('/login');
    } catch (error) {
      setAuthError(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    logoutUser();
    navigate('/login');
  };

  return { login, register, logout, authError };
};
