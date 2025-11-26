import React, { createContext, useState, useCallback, useEffect, useContext } from 'react';
import axiosClient from '../api/axiosClient';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  
  // Get userId from logged-in user
  const userId = user?.customerId;
  
  const loadCart = useCallback(async () => {
    if (!userId) {
      setCartItems([]);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await axiosClient.get(`/cart/${userId}`);
      const cartData = Array.isArray(response.data) ? response.data : [];
      setCartItems(cartData);
    } catch (err) {
      console.error('Error loading cart:', err);
      // Don't set error for empty cart (404)
      if (err.response?.status !== 404) {
        setError('Failed to load cart');
      }
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);
  
  // Load cart from backend when user changes
  useEffect(() => {
    if (userId) {
      loadCart();
    } else {
      setCartItems([]);
    }
  }, [userId, loadCart]);
  
  const addToCart = useCallback(async (productId, quantity = 1) => {
    if (!userId) throw new Error('User not logged in');
    try {
      setError(null);
      await axiosClient.post('/cart/add', {
        userId,
        productId,
        quantity
      });
      // Reload cart to get updated items with product details
      await loadCart();
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError('Failed to add item to cart');
      throw err;
    }
  }, [userId, loadCart]);
  
  const removeFromCart = useCallback(async (cartItemId) => {
    if (!userId) throw new Error('User not logged in');
    try {
      setError(null);
      await axiosClient.delete(`/cart/remove/${cartItemId}`, {
        params: { userId }
      });
      // Update local state immediately
      setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError('Failed to remove item from cart');
      // Reload cart in case of error to sync state
      await loadCart();
      throw err;
    }
  }, [userId, loadCart]);
  
  const updateQuantity = useCallback(async (cartItemId, newQuantity) => {
    if (!userId) throw new Error('User not logged in');
    try {
      setError(null);
      if (newQuantity <= 0) {
        await removeFromCart(cartItemId);
        return;
      }
      
      await axiosClient.put('/cart/update', {
        cartItemId,
        quantity: newQuantity
      });
      
      // Update local state immediately
      setCartItems(prev => prev.map(item =>
        item.cartItemId === cartItemId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    } catch (err) {
      console.error('Error updating quantity:', err);
      setError('Failed to update quantity');
      // Reload cart in case of error to sync state
      await loadCart();
      throw err;
    }
  }, [userId, removeFromCart, loadCart]);
  
  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const qty = parseInt(item.quantity) || 0;
      return total + (price * qty);
    }, 0);
  }, [cartItems]);
  
  const clearCart = useCallback(async () => {
    if (!userId) throw new Error('User not logged in');
    try {
      setError(null);
      await axiosClient.delete(`/cart/clear/${userId}`);
      setCartItems([]);
    } catch (err) {
      console.error('Error clearing cart:', err);
      setError('Failed to clear cart');
      throw err;
    }
  }, [userId]);
  
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart,
    loadCart,
    loading,
    error,
    userId
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
