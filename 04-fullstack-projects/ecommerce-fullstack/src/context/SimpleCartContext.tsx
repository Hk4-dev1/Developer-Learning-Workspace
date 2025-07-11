// Simple Cart Context Provider
import React, { createContext, useContext, ReactNode } from 'react';
import { useSimpleCart } from '../hooks/useSimpleCart';
import { Product } from '../types/Product';

interface SimpleCartContextType {
  // State
  cart: {
    items: any[];
    total: number;
    totalItems: number;
  };
  wishlist: any[];
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  
  // Actions
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleCart: () => void;
  toggleWishlist: () => void;
  
  // Helper functions
  isInCart: (productId: string) => boolean;
  isInWishlist: (productId: string) => boolean;
  getCartItemCount: (productId: string) => number;
}

const SimpleCartContext = createContext<SimpleCartContextType | undefined>(undefined);

interface SimpleCartProviderProps {
  children: ReactNode;
}

export const SimpleCartProvider: React.FC<SimpleCartProviderProps> = ({ children }) => {
  const cartHook = useSimpleCart();

  return (
    <SimpleCartContext.Provider value={cartHook}>
      {children}
    </SimpleCartContext.Provider>
  );
};

export const useSimpleCartContext = (): SimpleCartContextType => {
  const context = useContext(SimpleCartContext);
  if (!context) {
    throw new Error('useSimpleCartContext must be used within a SimpleCartProvider');
  }
  return context;
};

export { SimpleCartContext };
