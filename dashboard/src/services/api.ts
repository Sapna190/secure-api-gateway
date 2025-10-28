import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to handle API requests
const handleRequest = async (request) => {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'An error occurred');
    } else {
      throw new Error('Network error');
    }
  }
};

// API calls
export const login = async (email, password) => {
  return handleRequest(() => apiClient.post('/auth/login', { email, password }));
};

export const fetchLogs = async (limit = 50, page = 1) => {
  return handleRequest(() => apiClient.get(`/admin/logs?limit=${limit}&page=${page}`));
};

export const blockIp = async (ip, reason, ttl) => {
  return handleRequest(() => apiClient.post('/admin/block', { ip, reason, ttl }));
};

export const unblockIp = async (id) => {
  return handleRequest(() => apiClient.delete(`/admin/block/${id}`));
};

export const fetchStats = async () => {
  return handleRequest(() => apiClient.get('/admin/stats'));
};