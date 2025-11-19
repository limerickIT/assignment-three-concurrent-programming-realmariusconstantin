import React, { createContext, useState, useEffect } from 'react';
import axiosClient from './api/axiosClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosClient.post('/auth/login', { email, password });
      const userData = response.data;
      
      if (userData.customerId) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
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
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
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
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAdmin = () => {
    return user?.role === 'ADMIN';
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
