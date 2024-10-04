import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';  // Thay URL này bằng backend của bạn


export const login = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login/web`, credentials);
  return response.data;  // Trong response sẽ có token
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};