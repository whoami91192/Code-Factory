import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestHeaders } from 'axios';

// Extend the type to allow _retry property
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: (process.env.REACT_APP_API_URL || 'http://localhost:8080') + '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      if (!config.headers) config.headers = {} as AxiosRequestHeaders;
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    // Remove debug logs except for actual errors

    // Handle 401 Unauthorized (token expired)
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Attempt to refresh the token
        const refreshResponse = await axios.post(
          `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/auth/refresh`,
          { password: refreshToken }
        );

        // Use correct property names from backend
        const { accessToken: newToken, refreshToken: newRefreshToken } = refreshResponse.data;
        
        // Update tokens in localStorage
        localStorage.setItem('token', newToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        
        // Update the original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        // Redirect to login page
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    if (error.response?.status === 403) {
      console.error('Access forbidden - insufficient permissions');
    } else if (error.response?.status === 404) {
      console.error('Resource not found');
    } else if (error.response && error.response.status && error.response.status >= 500) {
      console.error('Server error occurred');
    }

    return Promise.reject(error);
  }
);

// API service functions
export const authService = {
  login: async (credentials: { username: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: { username: string; email: string; password: string }) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  refreshToken: async (refreshToken: string) => {
    const response = await api.post('/auth/refresh', { password: refreshToken });
    return response.data;
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  },
};

export const productService = {
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  create: async (productData: any) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  update: async (id: number, productData: any) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

export const orderService = {
  create: async (orderData: any) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  getUserOrders: async (userId: number) => {
    const response = await api.get(`/orders/user/${userId}`);
    return response.data;
  },

  getAllOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  updateStatus: async (orderId: number, status: string) => {
    const response = await api.patch(`/orders/${orderId}/status`, { status });
    return response.data;
  },
};

export const userService = {
  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  create: async (userData: any) => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  update: async (id: number, userData: any) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  toggleStatus: async (id: number, enabled: boolean) => {
    const response = await api.patch(`/users/${id}/status`, { enabled });
    return response.data;
  },
};

export const contactService = {
  submit: async (contactData: any) => {
    const response = await api.post('/contacts', contactData);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/contacts');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  },

  updateStatus: async (id: number, status: string) => {
    const response = await api.patch(`/contacts/${id}/status`, status);
    return response.data;
  },

  getByStatus: async (status: string) => {
    const response = await api.get(`/contacts/status/${status}`);
    return response.data;
  },

  search: async (keyword: string) => {
    const response = await api.get(`/contacts/search?keyword=${encodeURIComponent(keyword)}`);
    return response.data;
  },

  getStatistics: async () => {
    const response = await api.get('/contacts/statistics');
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
  },
};

export default api; 