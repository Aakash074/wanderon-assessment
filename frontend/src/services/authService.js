import axios from 'axios';

// Create axios instance with default config
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor 
API.interceptors.request.use(
  (config) => {
    // Authentication is handled via httpOnly cookies automatically
    // No need to manually add Authorization headers
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - cookie will be handled by backend
      // Don't redirect here as it might cause infinite loops
      // Let the components handle the redirect
    }
    return Promise.reject(error);
  }
);

export const authService = {
  // Register a new user
  register: async (userData) => {
    const response = await API.post('/auth/register', userData);
    // Token is automatically set as httpOnly cookie by backend
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await API.post('/auth/login', credentials);
    // Token is automatically set as httpOnly cookie by backend
    return response.data;
  },

  // Logout user
  logout: async () => {
    try {
      await API.post('/auth/logout');
      // Backend will clear the httpOnly cookie
    } catch (error) {
      // Even if logout fails on server, cookie will be cleared by backend
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await API.get('/auth/me');
    return response.data;
  },

  // Check authentication status
  checkAuth: async () => {
    const response = await API.get('/auth/check');
    return response.data;
  },

  // Refresh token
  refreshToken: async () => {
    const response = await API.post('/auth/refresh');
    // Token is automatically set as httpOnly cookie by backend
    return response.data;
  },
};

export const userService = {
  // Get user profile
  getProfile: async () => {
    const response = await API.get('/user/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await API.put('/user/profile', profileData);
    return response.data;
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await API.put('/user/password', passwordData);
    return response.data;
  },

};

// Add user service methods to auth service for convenience
authService.updateProfile = userService.updateProfile;
authService.changePassword = userService.changePassword;
authService.getProfile = userService.getProfile;

export default API;
