// context/AppContext.tsx - React Context for global state management

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, Product, ViewMode } from '../types/Product';
import { appReducer, initialAppState, actionCreators } from './AppReducer';
import { apiService, getErrorMessage } from '../services/api';

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

  // Helper function to transform API sort parameter
  const getApiSortParam = (sortBy: string): string => {
    switch (sortBy) {
      case 'price-low':
        return 'price';
      case 'price-high':
        return '-price';
      case 'rating':
        return '-average_rating';
      case 'newest':
        return '-created_at';
      case 'name':
      default:
        return 'name';
    }
  };

  // Helper function to transform API product to our Product interface
  const transformApiProduct = (apiProduct: any): Product => {
    return {
      id: apiProduct.id.toString(),
      name: apiProduct.name,
      description: apiProduct.description,
      price: parseFloat(apiProduct.price),
      originalPrice: apiProduct.original_price ? parseFloat(apiProduct.original_price) : undefined,
      category: apiProduct.category,
      subcategory: apiProduct.subcategory,
      brand: apiProduct.brand,
      images: apiProduct.images?.map((img: any) => img.image_url || img.image) || [],
      thumbnail: apiProduct.thumbnail_url || apiProduct.thumbnail || (apiProduct.images?.[0]?.image_url) || '',
      rating: parseFloat(apiProduct.rating) || 0,
      reviewCount: apiProduct.review_count || 0,
      inStock: apiProduct.in_stock,
      stockQuantity: apiProduct.stock_quantity,
      tags: apiProduct.tags || [],
      specifications: apiProduct.specifications || {},
      createdAt: apiProduct.created_at,
      updatedAt: apiProduct.updated_at || apiProduct.created_at,
    };
  };

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

  // Load initial products on mount
  useEffect(() => {
    const loadInitialProducts = async () => {
      try {
        dispatch(actionCreators.setSearchLoading(true));
        const response = await apiService.getProducts({ page: 1, page_size: 12 });
        const transformedProducts = response.results.map(transformApiProduct);
        dispatch(actionCreators.setSearchResults(transformedProducts, response.count));
      } catch (error) {
        console.error('Error loading initial products:', error);
        dispatch(actionCreators.setError(getErrorMessage(error)));
      }
    };

    loadInitialProducts();
  }, []);

  // Search products function
  const searchProducts = async (query: string, filters: any = {}) => {
    dispatch(actionCreators.setSearchLoading(true));
    dispatch(actionCreators.updateSearchQuery(query));
    
    try {
      // Build search parameters for the API
      const searchParams: any = {
        search: query || undefined,
        page: state.searchState.currentPage,
        page_size: state.searchState.itemsPerPage,
        ordering: getApiSortParam(state.searchState.sortBy),
      };

      // Apply filters
      if (filters.categories && filters.categories.length > 0) {
        searchParams.category = filters.categories.join(',');
      }

      if (filters.brands && filters.brands.length > 0) {
        searchParams.brand = filters.brands.join(',');
      }

      if (filters.priceRange) {
        searchParams.min_price = filters.priceRange.min;
        searchParams.max_price = filters.priceRange.max;
      }

      if (filters.rating) {
        searchParams.min_rating = filters.rating;
      }

      if (filters.inStock) {
        searchParams.in_stock = true;
      }

      // Make API call
      const response = await apiService.searchProducts(searchParams);
      
      // Transform API products to match our Product interface
      const transformedProducts = response.results.map(transformApiProduct);
      
      dispatch(actionCreators.setSearchResults(transformedProducts, response.count));
    } catch (error) {
      console.error('Search error:', error);
      dispatch(actionCreators.setSearchResults([], 0));
      dispatch(actionCreators.setError(getErrorMessage(error)));
    }
  };

  // Get product by ID - this will be handled by individual components using useProduct hook
  const getProductById = (id: string): Product | undefined => {
    // For now, check in search results
    return state.searchState.results.find((product: Product) => product.id === id);
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
