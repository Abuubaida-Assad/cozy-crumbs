import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('cozy_crumbs_token', response.data.token);
      localStorage.setItem('cozy_crumbs_user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('cozy_crumbs_token', response.data.token);
      localStorage.setItem('cozy_crumbs_user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('cozy_crumbs_token');
    localStorage.removeItem('cozy_crumbs_user');
  },

  getStoredUser: () => {
    const user = localStorage.getItem('cozy_crumbs_user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('cozy_crumbs_token');
  },
};
