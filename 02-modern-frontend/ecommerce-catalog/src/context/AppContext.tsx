// context/AppContext.tsx - React Context for global state management

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, Product, ViewMode } from '../types/Product';
import { appReducer, initialAppState, actionCreators } from './AppReducer';
import { mockProducts } from '../data/mockProducts';

// Context type definition
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<any>;
  // Convenient action functions
  actions: typeof actionCreators;
  // UI action functions
  setViewMode: (mode: ViewMode) => void;
  toggleCart: () => void;
  toggleWishlist: () => void;
  toggleMobileMenu: () => void;
  // Utility functions
  searchProducts: (query: string, filters?: any) => void;
  getProductById: (id: string) => Product | undefined;
  isInWishlist: (productId: string) => boolean;
  isInCart: (productId: string) => boolean;
  getCartItemCount: (productId: string) => number;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Local storage keys
const CART_STORAGE_KEY = 'ecommerce-cart';
const WISHLIST_STORAGE_KEY = 'ecommerce-wishlist';
const USER_PREFERENCES_KEY = 'ecommerce-preferences';

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      // Load cart from localStorage
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        // Restore cart items
        cartData.items.forEach((item: any) => {
          dispatch(actionCreators.addToCart(
            item.product,
            item.quantity,
            item.selectedSize,
            item.selectedColor
          ));
        });
      }

      // Load wishlist from localStorage
      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (savedWishlist) {
        const wishlistData = JSON.parse(savedWishlist);
        wishlistData.forEach((item: any) => {
          dispatch(actionCreators.addToWishlist(item.product));
        });
      }

      // Load user preferences
      const savedPreferences = localStorage.getItem(USER_PREFERENCES_KEY);
      if (savedPreferences) {
        const preferences = JSON.parse(savedPreferences);
        dispatch(actionCreators.setViewMode(preferences.viewMode || 'grid'));
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state.cart]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(state.wishlist));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }, [state.wishlist]);

  // Save preferences to localStorage
  useEffect(() => {
    try {
      const preferences = {
        viewMode: state.viewMode
      };
      localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving preferences to localStorage:', error);
    }
  }, [state.viewMode]);

  // Search products function
  const searchProducts = (query: string, filters: any = {}) => {
    dispatch(actionCreators.setSearchLoading(true));
    dispatch(actionCreators.updateSearchQuery(query));
    
    // Simulate API delay
    setTimeout(() => {
      let results = [...mockProducts];
      
      // Apply text search
      if (query) {
        const lowercaseQuery = query.toLowerCase();
        results = results.filter(product =>
          product.name.toLowerCase().includes(lowercaseQuery) ||
          product.description.toLowerCase().includes(lowercaseQuery) ||
          product.brand.toLowerCase().includes(lowercaseQuery) ||
          product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
        );
      }

      // Apply filters
      if (filters.categories && filters.categories.length > 0) {
        results = results.filter(product => 
          filters.categories.includes(product.category)
        );
      }

      if (filters.brands && filters.brands.length > 0) {
        results = results.filter(product => 
          filters.brands.includes(product.brand)
        );
      }

      if (filters.priceRange) {
        results = results.filter(product => 
          product.price >= filters.priceRange.min && 
          product.price <= filters.priceRange.max
        );
      }

      if (filters.rating) {
        results = results.filter(product => product.rating >= filters.rating);
      }

      if (filters.inStock) {
        results = results.filter(product => product.inStock);
      }

      if (filters.tags && filters.tags.length > 0) {
        results = results.filter(product =>
          filters.tags.some((tag: string) => product.tags.includes(tag))
        );
      }

      // Apply sorting
      switch (state.searchState.sortBy) {
        case 'price-low':
          results.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          results.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          results.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'name':
        default:
          results.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }

      dispatch(actionCreators.setSearchResults(results, results.length));
    }, 500);
  };

  // Get product by ID
  const getProductById = (id: string): Product | undefined => {
    return mockProducts.find(product => product.id === id);
  };

  // Check if product is in wishlist
  const isInWishlist = (productId: string): boolean => {
    return state.wishlist.some(item => item.product.id === productId);
  };

  // Check if product is in cart
  const isInCart = (productId: string): boolean => {
    return state.cart.items.some(item => item.product.id === productId);
  };

  // Get cart item count for a specific product
  const getCartItemCount = (productId: string): number => {
    const cartItem = state.cart.items.find(item => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  // UI action functions
  const setViewMode = (mode: ViewMode) => {
    dispatch(actionCreators.setViewMode(mode as any));
  };

  const toggleCart = () => {
    dispatch(actionCreators.toggleCart());
  };

  const toggleWishlist = () => {
    dispatch(actionCreators.toggleWishlist());
  };

  const toggleMobileMenu = () => {
    dispatch(actionCreators.toggleMobileMenu());
  };

  // Context value
  const contextValue: AppContextType = {
    state,
    dispatch,
    actions: actionCreators,
    setViewMode,
    toggleCart,
    toggleWishlist,
    toggleMobileMenu,
    searchProducts,
    getProductById,
    isInWishlist,
    isInCart,
    getCartItemCount
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Export context for advanced usage
export { AppContext };
