// src/services/dich-vu.service.js
import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Replace with your API URL

export const fetchDichVu = async () => {
    return await axios.get(`${API_URL}/dich-vu/many`, {
        params: {
          conditions: {}
      }
  });
};

export const addDichVu = async (dichVu) => {
  return await axios.post(`${API_URL}/dich-vu`, dichVu);
};

export const updateDichVu = async (maDichVu, dichVu) => {
  return await axios.put(`${API_URL}/dich-vu/${maDichVu}`, dichVu);
};

export const deleteDichVu = async (maDichVu) => {
  return await axios.delete(`${API_URL}/dich-vu/${maDichVu}`);
};
