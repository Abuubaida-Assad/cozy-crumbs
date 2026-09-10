import api from './api';

export const storeService = {
  getStores: async () => {
    const response = await api.get('/stores');
    return response.data;
  },
};
