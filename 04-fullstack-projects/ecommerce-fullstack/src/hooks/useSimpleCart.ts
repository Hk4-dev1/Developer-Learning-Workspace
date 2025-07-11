// Simple Cart Hook - Alternative implementation
import { useState, useEffect } from 'react';
import { Product } from '../types/Product';

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  addedAt: string;
}

interface Cart {
  items: CartItem[];
  total: number;
  totalItems: number;
}

interface WishlistItem {
  id: string;
  product: Product;
  addedAt: string;
}

const CART_STORAGE_KEY = 'simple-cart';
const WISHLIST_STORAGE_KEY = 'simple-wishlist';

export const useSimpleCart = () => {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0, totalItems: 0 });
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Calculate cart totals
  const calculateTotals = (items: CartItem[]): Cart => {
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    return { items, total, totalItems };
  };

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        setCart(cartData);
      }

      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (savedWishlist) {
        const wishlistData = JSON.parse(savedWishlist);
        setWishlist(wishlistData);
      }
    } catch (error) {
      console.error('Error loading cart/wishlist from localStorage', error);
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Save wishlist to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  // Add to cart
  const addToCart = (product: Product, quantity: number = 1, selectedSize?: string, selectedColor?: string) => {
    setCart(currentCart => {
      const existingItemIndex = currentCart.items.findIndex(
        item => 
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update existing item
        newItems = currentCart.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}`,
          product,
          quantity,
          selectedSize,
          selectedColor,
          addedAt: new Date().toISOString()
        };
        newItems = [...currentCart.items, newItem];
      }

      const newCart = calculateTotals(newItems);
      return newCart;
    });
  };

  // Remove from cart
  const removeFromCart = (itemId: string) => {
    setCart(currentCart => {
      const newItems = currentCart.items.filter(item => item.id !== itemId);
      return calculateTotals(newItems);
    });
  };

  // Update cart quantity
  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(currentCart => {
      const newItems = currentCart.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      return calculateTotals(newItems);
    });
  };

  // Clear cart
  const clearCart = () => {
    setCart({ items: [], total: 0, totalItems: 0 });
  };

  // Add to wishlist
  const addToWishlist = (product: Product) => {
    setWishlist(currentWishlist => {
      const isAlreadyInWishlist = currentWishlist.some(item => item.product.id === product.id);
      
      if (isAlreadyInWishlist) {
        return currentWishlist;
      }

      const newItem: WishlistItem = {
        id: `wishlist-${product.id}-${Date.now()}`,
        product,
        addedAt: new Date().toISOString()
      };

      return [...currentWishlist, newItem];
    });
  };

  // Remove from wishlist
  const removeFromWishlist = (productId: string) => {
    setWishlist(currentWishlist => 
      currentWishlist.filter(item => item.product.id !== productId)
    );
  };

  // Helper functions
  const isInCart = (productId: string): boolean => {
    return cart.items.some(item => item.product.id === productId);
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlist.some(item => item.product.id === productId);
  };

  const getCartItemCount = (productId: string): number => {
    const cartItem = cart.items.find(item => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Toggle functions
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleWishlist = () => {
    setIsWishlistOpen(!isWishlistOpen);
  };

  return {
    // State
    cart,
    wishlist,
    isCartOpen,
    isWishlistOpen,
    
    // Actions
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    toggleCart,
    toggleWishlist,
    
    // Helper functions
    isInCart,
    isInWishlist,
    getCartItemCount
  };
};
