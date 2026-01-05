import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // Make sure this matches your backend port
  headers: {
    'Content-Type': 'application/json',
  },
});   

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    // Check if it's an admin route
    const isAdminRoute = config.url.includes('/admin');
    
    // Get appropriate token
    const token = isAdminRoute 
      ? localStorage.getItem('admin-token')
      : localStorage.getItem('token');
    
    // Add token to headers if it exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      const isAdminRoute = error.config.url.includes('/admin');
      
      if (isAdminRoute) {
        // Clear admin tokens
        localStorage.removeItem('admin-token');
        localStorage.removeItem('admin-auth');
        localStorage.removeItem('admin-user');
        
        // Redirect to admin login
        if (window.location.pathname !== '/admin/login') {
          window.location.href = '/admin/login';
        }
      } else {
        // Clear user tokens
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Redirect to user login
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;