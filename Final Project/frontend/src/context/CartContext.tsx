import React, { createContext, useContext, useState } from 'react';
import { Product } from '../types';
import type { ProductCustomization } from '../components/ProductCustomizer';
import api from '../services/api';
import { useAuth } from './AuthContext';

export type CartItem = Product & { quantity: number };

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  updateQuantity: (id: number, quantity: number) => void;
  placeOrder: (address: string, notes?: string) => Promise<void>;
};

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  updateQuantity: () => {},
  placeOrder: async () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { token } = useAuth();

  const addToCart = (product: Product & Partial<ProductCustomization>) => {
    setItems(prev => {
      // Αν το προϊόν είναι customized, φτιάξε customId με βάση όλα τα customization
      const isCustomized = product.name?.includes('(Customized)');
      if (isCustomized) {
        // Δημιούργησε customId με βάση id, price, size, crust, toppings, extras
        const toppingsKey = (product.toppings || []).map(t => t.id).sort().join('-');
        const extrasKey = (product.extras || []).map(e => e.id).sort().join('-');
        const customId = `${product.id}-${product.price}-${product.size || ''}-${product.crust || ''}-${toppingsKey}-${extrasKey}`;
        const existing = prev.find(i => (i as any).customId === customId);
        if (existing) {
          return prev.map(i => ((i as any).customId === customId) ? { ...i, quantity: i.quantity + 1 } : i);
        }
        return [...prev, { ...product, quantity: 1, customId, size: product.size, crust: product.crust, toppings: product.toppings, extras: product.extras, specialInstructions: product.specialInstructions }];
      } else {
        const existing = prev.find(i => i.id === product.id && !('customId' in i));
        if (existing) {
          return prev.map(i => (i.id === product.id && !('customId' in i)) ? { ...i, quantity: i.quantity + 1 } : i);
        }
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === id);
      if (!existing) return prev;
      if (existing.quantity > 1) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const clearCart = () => setItems([]);

  const updateQuantity = (id: number, quantity: number) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
  };

  const placeOrder = async (address: string, notes?: string) => {
    if (!token) throw new Error('Not authenticated');
    await api.post('/orders', {
      items: items.map(i => ({ productId: i.id, quantity: i.quantity, price: i.price })),
      deliveryAddress: address,
      deliveryNotes: notes || '',
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // clearCart() removed - will be called by Cart component after showing success message
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, updateQuantity, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); 