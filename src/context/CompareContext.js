import React, { createContext, useContext, useState, useCallback } from 'react';

const CompareContext = createContext();

export const MAX_COMPARE_ITEMS = 4;

export function CompareProvider({ children }) {
  const [compareItems, setCompareItems] = useState([]);
  const [error, setError] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Add item to compare list
  const addToCompare = useCallback((product) => {
    setError(null);
    
    setCompareItems(prev => {
      // Check if already in compare list
      if (prev.some(item => item.productId === product.productId)) {
        return prev;
      }

      // Check max items
      if (prev.length >= MAX_COMPARE_ITEMS) {
        setError(`Maximum ${MAX_COMPARE_ITEMS} items can be compared at once`);
        return prev;
      }

      // Open drawer when first item is added
      setIsDrawerOpen(true);
      
      return [...prev, product];
    });
  }, []);

  // Remove item from compare list
  const removeFromCompare = useCallback((productId) => {
    setCompareItems(prev => {
      const newItems = prev.filter(item => item.productId !== productId);
      // Close drawer if no items left
      if (newItems.length === 0) {
        setIsDrawerOpen(false);
      }
      return newItems;
    });
    setError(null);
  }, []);

  // Clear all items
  const clearCompare = useCallback(() => {
    setCompareItems([]);
    setIsDrawerOpen(false);
    setError(null);
  }, []);

  // Check if product is in compare list
  const isInCompare = useCallback((productId) => {
    return compareItems.some(item => item.productId === productId);
  }, [compareItems]);

  // Toggle drawer
  const toggleDrawer = useCallback(() => {
    if (compareItems.length > 0) {
      setIsDrawerOpen(prev => !prev);
    }
  }, [compareItems.length]);

  // Open drawer
  const openDrawer = useCallback(() => {
    if (compareItems.length > 0) {
      setIsDrawerOpen(true);
    }
  }, [compareItems.length]);

  // Close drawer
  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    compareItems,
    error,
    isDrawerOpen,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    toggleDrawer,
    openDrawer,
    closeDrawer,
    clearError,
    canCompare: compareItems.length >= 2
  };

  return (
    <CompareContext.Provider value={value}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}

export default CompareContext;
