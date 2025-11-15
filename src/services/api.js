import axios from 'axios';

const API_URL = 'https://innovative-flow-production.up.railway.app/api';

// Mock data for development
const mockTasks = [
  {
    _id: '1',
    title: 'Complete React Project',
    description: 'Finish the task management application',
    status: 'in-progress',
    userId: 'user1',
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Review Code',
    description: 'Review the latest pull requests',
    status: 'pending',
    userId: 'user1',
    createdAt: new Date().toISOString()
  }
];

let taskStorage = [...mockTasks];

export const authApi = {
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData, {
        timeout: 5000
      });
      return {
        user: {
          id: response.data.user.id,
          name: response.data.user.username,
          token: response.data.token || ''
        }
      };
    } catch (error) {
      console.warn('API not available, using mock authentication:', error.message);
      // Mock registration
      return {
        user: {
          id: 'user1',
          name: userData.username,
          token: 'mock-token'
        }
      };
    }
  },
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials, {
        timeout: 5000
      });
      return {
        user: {
          id: response.data.user.id,
          name: response.data.user.username,
          token: response.data.token || ''
        }
      };
    } catch (error) {
      console.warn('API not available, using mock authentication:', error.message);
      // Mock login - accept any credentials
      if (credentials.username && credentials.password) {
        return {
          user: {
            id: 'user1',
            name: credentials.username,
            token: 'mock-token'
          }
        };
      } else {
        throw new Error('Username and password are required');
      }
    }
  }
};

export const taskApi = {
  fetchTasks: async (userId) => {
    try {
      // Try real API first, fallback to mock data
      const response = await axios.get(`${API_URL}/tasks`, {
        params: { userId },
        timeout: 5000
      });
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock data:', error.message);
      // Return mock data filtered by userId
      return taskStorage.filter(task => task.userId === userId);
    }
  },
  
  createTask: async (taskData) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, taskData, {
        timeout: 5000
      });
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock data:', error.message);
      // Create task in mock storage
      const newTask = {
        ...taskData,
        _id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      taskStorage.push(newTask);
      return newTask;
    }
  },
  
  updateTask: async (taskId, taskData) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData, {
        timeout: 5000
      });
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock data:', error.message);
      // Update task in mock storage
      const taskIndex = taskStorage.findIndex(task => task._id === taskId);
      if (taskIndex !== -1) {
        taskStorage[taskIndex] = { ...taskStorage[taskIndex], ...taskData };
        return taskStorage[taskIndex];
      }
      throw new Error('Task not found');
    }
  },
  
  deleteTask: async (taskId) => {
    try {
      const response = await axios.delete(`${API_URL}/tasks/${taskId}`, {
        timeout: 5000
      });
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock data:', error.message);
      // Delete task from mock storage
      const taskIndex = taskStorage.findIndex(task => task._id === taskId);
      if (taskIndex !== -1) {
        taskStorage.splice(taskIndex, 1);
        return { message: 'Task deleted successfully' };
      }
      throw new Error('Task not found');
    }
  }
};