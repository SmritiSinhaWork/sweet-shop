// API configuration for Django backend
// Update this URL to match your Django backend URL
const API_BASE_URL = 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  auth: {
    register: `${API_BASE_URL}/auth/register`,
    login: `${API_BASE_URL}/auth/login`,
  },
  sweets: {
    list: `${API_BASE_URL}/sweets`,
    search: `${API_BASE_URL}/sweets/search`,
    create: `${API_BASE_URL}/sweets`,
    update: (id: string) => `${API_BASE_URL}/sweets/${id}`,
    delete: (id: string) => `${API_BASE_URL}/sweets/${id}`,
    purchase: (id: string) => `${API_BASE_URL}/sweets/${id}/purchase`,
    restock: (id: string) => `${API_BASE_URL}/sweets/${id}/restock`,
  },
};

// Helper function to get auth headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// API client wrapper
export const apiClient = {
  get: async (url: string) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },

  post: async (url: string, data: any) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },

  put: async (url: string, data: any) => {
    const response = await fetch(url, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },

  delete: async (url: string) => {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },
};
