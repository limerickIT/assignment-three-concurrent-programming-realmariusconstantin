import { useState, useEffect, useCallback } from 'react';
import axiosClient from '../api/axiosClient';
import { useAuth } from './useAuth';

export function useWishlist() {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to safely get productId from wishlist item
  const getProductIdFromItem = (item) => {
    if (!item) return null;
    // Handle nested structure: item.productId can be an object with productId
    if (item.productId && typeof item.productId === 'object') {
      return item.productId.productId;
    }
    // Or it could be a direct number/string
    return item.productId;
  };

  const fetchWishlist = useCallback(async () => {
    if (!user?.customerId) {
      setWishlistItems([]);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const response = await axiosClient.get(`/wishlist/customer/${user.customerId}`);
      const items = Array.isArray(response.data) ? response.data : [];
      setWishlistItems(items);
    } catch (err) {
      console.error('Error fetching wishlist:', err);
      // Don't show error for 404 - just means empty wishlist
      if (err.response?.status !== 404) {
        setError('Failed to load wishlist');
      }
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  }, [user?.customerId]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addToWishlist = async (productId, notes = '') => {
    if (!user?.customerId) {
      throw new Error('Please sign in to add items to wishlist');
    }
    
    if (!productId) {
      throw new Error('Product ID is required');
    }
    
    try {
      const response = await axiosClient.post('/wishlist', {
        customerId: user.customerId,
        productId: productId,
        notes: notes
      });
      
      // Refresh wishlist
      await fetchWishlist();
      
      return response.data;
    } catch (err) {
      console.error('Error adding to wishlist:', err);
      throw new Error(err.response?.data?.error || err.response?.data?.message || 'Failed to add to wishlist');
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user?.customerId) {
      throw new Error('Please sign in');
    }
    
    if (!productId) {
      throw new Error('Product ID is required');
    }
    
    try {
      await axiosClient.delete(`/wishlist/customer/${user.customerId}/product/${productId}`);
      
      // Update local state - handle both nested and flat structures
      setWishlistItems(prev => 
        prev.filter(item => {
          const itemProductId = getProductIdFromItem(item);
          return itemProductId !== productId;
        })
      );
      
      return true;
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      throw new Error(err.response?.data?.error || err.response?.data?.message || 'Failed to remove from wishlist');
    }
  };

  const isInWishlist = useCallback((productId) => {
    if (!productId) return false;
    return wishlistItems.some(item => {
      const itemProductId = getProductIdFromItem(item);
      return itemProductId === productId;
    });
  }, [wishlistItems]);

  const toggleWishlist = async (productId) => {
    if (isInWishlist(productId)) {
      return removeFromWishlist(productId);
    } else {
      return addToWishlist(productId);
    }
  };

  const getWishlistCount = useCallback(() => {
    return wishlistItems.length;
  }, [wishlistItems]);

  return {
    wishlistItems,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    getWishlistCount,
    refreshWishlist: fetchWishlist
  };
}

export default useWishlist;
