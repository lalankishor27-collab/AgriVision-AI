import axios from 'axios';

const API_BASE = '/api';

export const api = {
  predictLeaf: async (formData) => {
    const res = await axios.post(`${API_BASE}/predict`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },

  getSamples: async () => {
    const res = await axios.get(`${API_BASE}/samples`);
    return res.data;
  },

  getHistory: async (params = {}) => {
    const res = await axios.get(`${API_BASE}/history`, { params });
    return res.data;
  },

  deleteHistory: async (id) => {
    const res = await axios.delete(`${API_BASE}/history/${id}`);
    return res.data;
  },

  login: async (credentials) => {
    const res = await axios.post(`${API_BASE}/auth/login`, credentials);
    return res.data;
  },

  register: async (details) => {
    const res = await axios.post(`${API_BASE}/auth/register`, details);
    return res.data;
  }
};
