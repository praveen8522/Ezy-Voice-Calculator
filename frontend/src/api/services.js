import api from './axios';

// ==================== AUTH SERVICES ====================
export const authService = {
  // Register new user
  register: async (userData) => {
    const { data } = await api.post('/auth/register', userData);
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  // Login user
  login: async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Remove admin tokens if any
    localStorage.removeItem('admin-auth');
    localStorage.removeItem('admin-token');
    window.location.href = '/login';
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

// ==================== USER SERVICES ====================
export const userService = {
  // Get user profile
  getProfile: async () => {
    const { data } = await api.get('/users/profile');
    return data.user;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const { data } = await api.put('/users/profile', profileData);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data.user;
  },
};

// ==================== VOICE SERVICES ====================
export const voiceService = {
  // Calculate voice input
  calculate: async (text, language = 'ta-IN') => {
    const { data } = await api.post('/voice/calculate', { text, language });
    return data;
  },

  // Get voice history
  getHistory: async () => {
    const { data } = await api.get('/voice/history');
    return data.history;
  },

  // Clear history
  clearHistory: async () => {
    const { data } = await api.delete('/voice/history');
    return data;
  },
};

// ==================== PLAN SERVICES ====================
export const planService = {
  // Get all plans
  getAllPlans: async () => {
    const { data } = await api.get('/plans');
    return data.plans;
  },

  // Get single plan
  getPlan: async (id) => {
    const { data } = await api.get(`/plans/${id}`);
    return data.plan;
  },
};

// ==================== TRANSACTION SERVICES ====================
export const transactionService = {
  // Create transaction
  createTransaction: async (transactionData) => {
    const { data } = await api.post('/transactions', transactionData);
    return data.transaction;
  },

  // Get user transactions
  getUserTransactions: async (userId) => {
    const { data } = await api.get(`/transactions/user/${userId}`);
    return data.transactions;
  },
};

// ==================== OFFER SERVICES ====================
export const offerService = {
  // Get all offers
  getAllOffers: async () => {
    const { data } = await api.get('/offers');
    return data.offers;
  },
};

// ==================== ADMIN SERVICES ====================
export const adminService = {
  // Admin login
  login: async (credentials) => {
    const { data } = await api.post('/admin/login', credentials);
    if (data.token) {
      localStorage.setItem('admin-token', data.token);
      localStorage.setItem('admin-auth', 'true');
      localStorage.setItem('admin-user', JSON.stringify(data.admin));
    }
    return data;
  },

  // Get dashboard stats
  getDashboard: async () => {
    const token = localStorage.getItem('admin-token');
    const { data } = await api.get('/admin/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data.stats;
  },

  // Get all users
  getAllUsers: async () => {
    const token = localStorage.getItem('admin-token');
    const { data } = await api.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data.users;
  },

  // Get all transactions
  getAllTransactions: async () => {
    const token = localStorage.getItem('admin-token');
    const { data } = await api.get('/transactions', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data.transactions;
  },

  // Check if admin is authenticated
  isAuthenticated: () => {
    return localStorage.getItem('admin-auth') === 'true' && !!localStorage.getItem('admin-token');
  },

  // Logout admin
  logout: () => {
    localStorage.removeItem('admin-auth');
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-user');
    window.location.href = '/admin/login';
  },
};

export const ttsService = {
  // Speak text using backend proxy
  speak: async (text, language = 'ta-IN') => {
    const { data } = await api.post('/tts/speak', { 
      text, 
      language 
    }, {
      responseType: 'blob' // Important for audio data
    });
    return data;
  },
  
  // Get audio URL for playing
  getAudioUrl: async (text, language = 'ta-IN') => {
    try {
      const response = await api.post('/tts/speak', 
        { text, language },
        { responseType: 'blob' }
      );
      
      // Create object URL from blob
      const audioBlob = response.data;
      const audioUrl = URL.createObjectURL(audioBlob);
      
      return audioUrl;
    } catch (error) {
      console.error('TTS Service Error:', error);
      throw error;
    }
  }
};

export const getTodayVoice = async () => {
  const { data } = await api.get("/admin/voice/today");
  return data;
};

export const getWeeklyVoice = async () => {
  const { data } = await api.get("/admin/voice/weekly");
  return data;
};

export const getLanguageStats = async () => {
  const { data } = await api.get("/admin/voice/language");
  return data;
};
