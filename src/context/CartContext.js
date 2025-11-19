import React, { createContext, useState, useCallback, useEffect, useContext } from 'react';
import axiosClient from '../api/axiosClient';
import { AuthContext } from '../AuthContext';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  
  // Get userId from logged-in user
  const userId = user?.customerId;
  
  // Load cart from backend when user changes
  useEffect(() => {
    if (userId) {
      loadCart();
    } else {
      setCartItems([]);
    }
  }, [userId]);
  
  const loadCart = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const response = await axiosClient.get(`/cart/${userId}`);
      setCartItems(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error loading cart:', err);
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  }, [userId]);
  
  const addToCart = useCallback(async (productId, quantity = 1) => {
    if (!userId) throw new Error('User not logged in');
    try {
      const response = await axiosClient.post('/cart/add', {
        userId,
        productId,
        quantity
      });
      setCartItems([...cartItems, response.data]);
      return response.data;
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError('Failed to add item to cart');
      throw err;
    }
  }, [cartItems, userId]);
  
  const removeFromCart = useCallback(async (cartItemId) => {
    if (!userId) throw new Error('User not logged in');
    try {
      await axiosClient.delete(`/cart/remove/${cartItemId}`, {
        params: { userId }
      });
      setCartItems(cartItems.filter(item => item.cartItemId !== cartItemId));
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError('Failed to remove item from cart');
      throw err;
    }
  }, [cartItems, userId]);
  
  const updateQuantity = useCallback(async (cartItemId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        await removeFromCart(cartItemId);
        return;
      }
      
      const response = await axiosClient.put('/cart/update', {
        cartItemId,
        quantity: newQuantity
      });
      
      setCartItems(cartItems.map(item =>
        item.cartItemId === cartItemId ? response.data : item
      ));
    } catch (err) {
      console.error('Error updating quantity:', err);
      setError('Failed to update quantity');
      throw err;
    }
  }, [cartItems, removeFromCart]);
  
  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price) * item.quantity;
      return total + itemPrice;
    }, 0);
  }, [cartItems]);
  
  const clearCart = useCallback(async () => {
    if (!userId) throw new Error('User not logged in');
    try {
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
