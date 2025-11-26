import React, { createContext, useState, useEffect, useCallback, useRef } from 'react';
import axiosClient from '../api/axiosClient';

export const AuthContext = createContext();

// Token storage keys
const TOKEN_KEY = 'zelora_token';
const REFRESH_TOKEN_KEY = 'zelora_refresh_token';
const USER_KEY = 'zelora_user';
const TOKEN_EXPIRY_KEY = 'zelora_token_expiry';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const refreshTimeoutRef = useRef(null);

  // Get stored tokens
  const getStoredToken = () => localStorage.getItem(TOKEN_KEY);
  const getStoredRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

  // Store auth data
  const storeAuthData = useCallback((userData) => {
    if (userData.token) {
      localStorage.setItem(TOKEN_KEY, userData.token);
    }
    if (userData.refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, userData.refreshToken);
    }
    if (userData.expiresIn) {
      const expiryTime = Date.now() + userData.expiresIn;
      localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
    }
    
    // Store user data without tokens for display purposes
    const userForStorage = {
      customerId: userData.customerId,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: userData.role
    };
    localStorage.setItem(USER_KEY, JSON.stringify(userForStorage));
    setUser(userForStorage);
  }, []);

  // Clear auth data
  const clearAuthData = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
    setUser(null);
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
  }, []);

  // Refresh token function
  const refreshToken = useCallback(async () => {
    const storedRefreshToken = getStoredRefreshToken();
    if (!storedRefreshToken) {
      clearAuthData();
      return false;
    }

    try {
      const response = await axiosClient.post('/auth/refresh', {
        refreshToken: storedRefreshToken
      });
      
      if (response.data.customerId) {
        storeAuthData(response.data);
        scheduleTokenRefresh(response.data.expiresIn);
        return true;
      }
      
      clearAuthData();
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      clearAuthData();
      return false;
    }
  }, [clearAuthData, storeAuthData]);

  // Schedule automatic token refresh (5 minutes before expiry)
  const scheduleTokenRefresh = useCallback((expiresIn) => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
    
    // Refresh 5 minutes before token expires
    const refreshTime = expiresIn - (5 * 60 * 1000);
    if (refreshTime > 0) {
      refreshTimeoutRef.current = setTimeout(() => {
        refreshToken();
      }, refreshTime);
    }
  }, [refreshToken]);

  // Validate current token on mount
  const validateSession = useCallback(async () => {
    const token = getStoredToken();
    const savedUser = localStorage.getItem(USER_KEY);
    const tokenExpiry = localStorage.getItem(TOKEN_EXPIRY_KEY);

    if (!token || !savedUser) {
      clearAuthData();
      setLoading(false);
      return;
    }

    // Check if token is expired locally first
    if (tokenExpiry && Date.now() > parseInt(tokenExpiry)) {
      // Token expired, try to refresh
      const refreshed = await refreshToken();
      if (!refreshed) {
        clearAuthData();
      }
      setLoading(false);
      return;
    }

    try {
      // Validate token with backend
      const response = await axiosClient.get('/auth/validate');
      
      if (response.data.customerId) {
        const userForStorage = {
          customerId: response.data.customerId,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          role: response.data.role
        };
        setUser(userForStorage);
        localStorage.setItem(USER_KEY, JSON.stringify(userForStorage));
        
        // Schedule refresh based on remaining time
        const remainingTime = tokenExpiry ? parseInt(tokenExpiry) - Date.now() : 0;
        if (remainingTime > 0) {
          scheduleTokenRefresh(remainingTime);
        }
      } else {
        // Token invalid, try refresh
        const refreshed = await refreshToken();
        if (!refreshed) {
          clearAuthData();
        }
      }
    } catch (error) {
      console.error('Session validation failed:', error);
      // Try to refresh token if validation fails
      const refreshed = await refreshToken();
      if (!refreshed) {
        clearAuthData();
      }
    }
    
    setLoading(false);
  }, [clearAuthData, refreshToken, scheduleTokenRefresh]);

  useEffect(() => {
    validateSession();

    // Listen for forced logout from axios interceptor
    const handleForcedLogout = () => {
      clearAuthData();
    };
    window.addEventListener('auth:logout', handleForcedLogout);
    
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
      window.removeEventListener('auth:logout', handleForcedLogout);
    };
  }, [validateSession, clearAuthData]);

  const login = async (email, password) => {
    try {
      const response = await axiosClient.post('/auth/login', { email, password });
      const userData = response.data;
      
      if (userData.customerId) {
        storeAuthData(userData);
        
        // Schedule token refresh
        if (userData.expiresIn) {
          scheduleTokenRefresh(userData.expiresIn);
        }
        
        return { success: true, message: userData.message };
      }
      
      return { success: false, message: userData.message };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed. Please try again.' 
      };
    }
  };

  const signup = async (firstName, lastName, email, password) => {
    try {
      const response = await axiosClient.post('/auth/register', {
        firstName,
        lastName,
        email,
        password
      });
      const userData = response.data;
      
      if (userData.customerId) {
        storeAuthData(userData);
        
        // Schedule token refresh
        if (userData.expiresIn) {
          scheduleTokenRefresh(userData.expiresIn);
        }
        
        return { success: true, message: userData.message };
      }
      
      return { success: false, message: userData.message };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed. Please try again.' 
      };
    }
  };

  const logout = () => {
    clearAuthData();
  };

  const isAdmin = () => {
    return user?.role === 'ADMIN';
  };

  // Expose token getter for API calls
  const getToken = () => getStoredToken();

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      isAdmin, 
      loading, 
      getToken,
      refreshToken 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
