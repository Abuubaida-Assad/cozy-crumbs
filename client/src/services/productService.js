import api from './api';

export const productService = {
  getProducts: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  getFeaturedProducts: async () => {
    const response = await api.get('/products/featured');
    return response.data;
  },

  getProductById: async (idOrSlug) => {
    const response = await api.get(`/products/${idOrSlug}`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  toggleAvailability: async (id) => {
    const response = await api.patch(`/products/${id}/toggle-availability`);
    return response.data;
  },

  toggleFeatured: async (id) => {
    const response = await api.patch(`/products/${id}/toggle-featured`);
    return response.data;
  },
};
