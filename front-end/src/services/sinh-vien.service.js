import axios from 'axios';
import { getToken } from './auth.service';

const API_BASE_URL = 'http://localhost:3001';  // Thay URL này bằng backend của bạn

const authAxios = axios.create({
  baseURL: API_BASE_URL,
});
authAxios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchuser = (condition) => {
  return authAxios.get(`${API_BASE_URL}/user/all`, {
    params: {
      condition: JSON.stringify(condition || {
        systemRole: "SinhVien"
      }),
      
    }
  });
};

export const adduser = (userData) => {
  return authAxios.post(`${API_BASE_URL}/user`, {
    ...userData,
    systemRole: "SinhVien",
    username: userData.cmtCccd,
    password: "abc123",
    
  });
};

export const updateuser = (id, userData) => {
  return authAxios.put(`${API_BASE_URL}/user/${id}`, userData);
};

export const deleteuser = (id) => {
  return authAxios.delete(`${API_BASE_URL}/user/${id}`);
};