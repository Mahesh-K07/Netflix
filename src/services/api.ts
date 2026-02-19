import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.omdbapi.com/',
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(
        new Error(error.response.data?.Error || 'Something went wrong'),
      );
    }
    if (error.request) {
      return Promise.reject(new Error('Network error. Please try again.'));
    }
    return Promise.reject(error);
  },
);

export default api;

