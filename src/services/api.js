import axios from 'axios';

// Test Server Configuration
const BASE_URL = 'https://t4e-testserver.onrender.com/api';

// Institution API - Token Authentication
export const getToken = async (studentId, password, set) => {
  const { data } = await axios.post(`${BASE_URL}/public/token`, {
    studentId,
    password,
    set,
  });
  return data;
};

// Get Dataset from Institution API
export const getDataset = async (token, dataUrl) => {
  const { data } = await axios.get(`${BASE_URL}${dataUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

// Initialize API client
const apiClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock activity API for local development
export const activityAPI = {
  // Get all activities
  getAll: async () => {
    try {
      // Replace with real API call if needed
      return [];
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // Get activity by ID
  getById: async (id) => {
    try {
      return null;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // Create new activity
  create: async (activity) => {
    try {
      return { ...activity, id: Date.now().toString() };
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // Update activity
  update: async (id, activity) => {
    try {
      return { ...activity, id };
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // Delete activity
  delete: async (id) => {
    try {
      return { id };
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // Get activities by date range
  getByDateRange: async (startDate, endDate) => {
    try {
      return [];
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // Get activity statistics
  getStatistics: async () => {
    try {
      return {
        totalSteps: 0,
        totalCalories: 0,
        totalWorkoutMinutes: 0,
        goalsAchieved: 0,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default apiClient;
