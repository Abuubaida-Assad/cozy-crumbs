import api from './api';

export const contactService = {
  submitContact: async (messageData) => {
    const response = await api.post('/contact', messageData);
    return response.data;
  },

  getMessages: async () => {
    const response = await api.get('/contact');
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await api.patch(`/contact/${id}/status`, { status });
    return response.data;
  },
};
