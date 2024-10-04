import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Replace with your actual API URL

export const fetchPhongKtx = async () => {
    return await axios.get(`${API_URL}/phong-ktx/many`, {
        params: {
          conditions: {}
      }
  });
};

export const addPhongKtx = async (phongKtx) => {
  return await axios.post(`${API_URL}/phong-ktx`, phongKtx);
};

export const updatePhongKtx = async (id, phongKtx) => {
  return await axios.put(`${API_URL}/phong-ktx/${id}`, phongKtx);
};

export const deletePhongKtx = async (id) => {
  return await axios.delete(`${API_URL}/phong-ktx/${id}`);
};
