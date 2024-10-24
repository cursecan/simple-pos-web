import router from '@/router';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`, // Set your API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to check token expiration
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    if (!!token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

      // If token is expired, handle it (logout or refresh)      
      if (decodedToken.exp < currentTime) {
        // Handle token expiration, e.g., logout or refresh
        localStorage.clear()

        router.push('/login')
        throw new axios.Cancel('Token is expired'); // Cancel the request
      }

      // Attach the token to the Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to catch 401 errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {    
    if (error.response && error.response.status === 401) {
      // Handle expired token (if backend sends 401 when the token is expired)
      localStorage.clear()

      router.push('/login')
    }
    return Promise.reject(error);
  }
);

export default apiClient;
