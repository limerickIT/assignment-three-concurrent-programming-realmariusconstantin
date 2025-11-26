import axios from 'axios';

// Token storage key
const TOKEN_KEY = 'zelora_token';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add JWT token to requests
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    
    // Add Authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle 401 unauthorized responses
axiosClient.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status, response.config.url);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If 401 error and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('zelora_refresh_token');
      
      if (refreshToken) {
        try {
          // Try to refresh the token
          const response = await axios.post('http://localhost:8080/auth/refresh', {
            refreshToken: refreshToken
          });
          
          if (response.data.token) {
            // Store new tokens
            localStorage.setItem(TOKEN_KEY, response.data.token);
            localStorage.setItem('zelora_refresh_token', response.data.refreshToken);
            
            if (response.data.expiresIn) {
              const expiryTime = Date.now() + response.data.expiresIn;
              localStorage.setItem('zelora_token_expiry', expiryTime.toString());
            }
            
            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
            return axiosClient(originalRequest);
          }
        } catch (refreshError) {
          console.error('Token refresh failed in interceptor:', refreshError);
          // Clear auth data and redirect to login
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem('zelora_refresh_token');
          localStorage.removeItem('zelora_user');
          localStorage.removeItem('zelora_token_expiry');
          
          // Dispatch custom event for auth context to handle
          window.dispatchEvent(new CustomEvent('auth:logout'));
        }
      }
    }
    
    console.error('API Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default axiosClient;
