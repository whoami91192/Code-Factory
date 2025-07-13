import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

type RecentlyViewedContextType = {
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;
  clearRecentlyViewed: () => void;
  getRecentlyViewed: (limit?: number) => Product[];
};

const RecentlyViewedContext = createContext<RecentlyViewedContextType>({
  recentlyViewed: [],
  addToRecentlyViewed: () => {},
  clearRecentlyViewed: () => {},
  getRecentlyViewed: () => [],
});

export const RecentlyViewedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => {
    const saved = localStorage.getItem('recentlyViewed');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      // Remove if already exists
      const filtered = prev.filter(p => p.id !== product.id);
      // Add to beginning (most recent first)
      const updated = [product, ...filtered];
      // Keep only last 10 items
      return updated.slice(0, 10);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  const getRecentlyViewed = (limit: number = 10) => {
    return recentlyViewed.slice(0, limit);
  };

  return (
    <RecentlyViewedContext.Provider value={{ 
      recentlyViewed, 
      addToRecentlyViewed, 
      clearRecentlyViewed, 
      getRecentlyViewed 
    }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => useContext(RecentlyViewedContext); 