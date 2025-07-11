// context/AppReducer.ts - Reducer functions for complex state management

import { AppState, CartAction, CartActionType, Cart, CartItem, Product, ViewMode } from '../types/Product';

// Initial state
export const initialAppState: AppState = {
  user: null,
  cart: {
    items: [],
    total: 0,
    totalItems: 0,
    discount: 0,
    shipping: 0,
    tax: 0,
    finalTotal: 0
  },
  wishlist: [],
  searchState: {
    query: '',
    filters: {
      categories: [],
      brands: [],
      priceRange: { min: 0, max: 5000 },
      rating: 0,
      inStock: false,
      tags: []
    },
    sortBy: 'name',
    currentPage: 1,
    itemsPerPage: 12,
    totalItems: 0,
    results: [],
    isLoading: false
  },
  viewMode: ViewMode.GRID,
  isLoading: false,
  error: null,
  // UI State
  isCartOpen: false,
  isWishlistOpen: false,
  isMobileMenuOpen: false
};

// Helper function to calculate cart totals
const calculateCartTotals = (items: CartItem[], discount = 0, shippingCost = 0): Cart => {
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const tax = total * 0.08; // 8% tax rate
  const finalTotal = total - discount + shippingCost + tax;

  return {
    items,
    total,
    totalItems,
    discount,
    shipping: shippingCost,
    tax,
    finalTotal: Math.max(0, finalTotal)
  };
};

// Cart reducer function
export const cartReducer = (state: Cart, action: CartAction): Cart => {
  console.log('🛒 Cart reducer received action:', action.type, action.payload);
  
  switch (action.type) {
    case CartActionType.ADD_ITEM: {
      const { product, quantity = 1, selectedSize, selectedColor } = action.payload;
      
      // Check if item already exists in cart
      const existingItemIndex = state.items.findIndex(
        item => 
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}`,
          product,
          quantity,
          selectedSize,
          selectedColor,
          addedAt: new Date().toISOString()
        };
        newItems = [...state.items, newItem];
      }

      return calculateCartTotals(newItems, state.discount, state.shipping);
    }

    case CartActionType.REMOVE_ITEM: {
      const { itemId } = action.payload;
      const newItems = state.items.filter(item => item.id !== itemId);
      return calculateCartTotals(newItems, state.discount, state.shipping);
    }

    case CartActionType.UPDATE_QUANTITY: {
      const { itemId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        const newItems = state.items.filter(item => item.id !== itemId);
        return calculateCartTotals(newItems, state.discount, state.shipping);
      }

      const newItems = state.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      
      return calculateCartTotals(newItems, state.discount, state.shipping);
    }

    case CartActionType.CLEAR_CART: {
      return calculateCartTotals([], 0, 0);
    }

    case CartActionType.APPLY_DISCOUNT: {
      const { discountAmount } = action.payload;
      return calculateCartTotals(state.items, discountAmount, state.shipping);
    }

    case CartActionType.UPDATE_SHIPPING: {
      const { shippingCost } = action.payload;
      return calculateCartTotals(state.items, state.discount, shippingCost);
    }

    default:
      return state;
  }
};

// Main app reducer
export const appReducer = (state: AppState, action: any): AppState => {
  console.log('🔄 Reducer received action:', action.type, action.payload);
  
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };

    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      };

    case 'SET_VIEW_MODE':
      return {
        ...state,
        viewMode: action.payload
      };

    case 'UPDATE_SEARCH_QUERY':
      return {
        ...state,
        searchState: {
          ...state.searchState,
          query: action.payload,
          currentPage: 1 // Reset to first page when searching
        }
      };

    case 'UPDATE_SEARCH_FILTERS':
      return {
        ...state,
        searchState: {
          ...state.searchState,
          filters: {
            ...state.searchState.filters,
            ...action.payload
          },
          currentPage: 1 // Reset to first page when filtering
        }
      };

    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        searchState: {
          ...state.searchState,
          results: action.payload.products,
          totalItems: action.payload.total,
          isLoading: false
        }
      };

    case 'SET_SEARCH_LOADING':
      return {
        ...state,
        searchState: {
          ...state.searchState,
          isLoading: action.payload
        }
      };

    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        searchState: {
          ...state.searchState,
          currentPage: action.payload
        }
      };

    case 'SET_SORT_BY':
      return {
        ...state,
        searchState: {
          ...state.searchState,
          sortBy: action.payload,
          currentPage: 1 // Reset to first page when sorting
        }
      };

    case 'ADD_TO_WISHLIST': {
      const { product } = action.payload;
      const isAlreadyInWishlist = state.wishlist.some(item => item.product.id === product.id);
      
      if (isAlreadyInWishlist) {
        return state; // Don't add duplicates
      }

      const newWishlistItem = {
        id: `wishlist-${product.id}-${Date.now()}`,
        product,
        addedAt: new Date().toISOString()
      };

      return {
        ...state,
        wishlist: [...state.wishlist, newWishlistItem]
      };
    }

    case 'REMOVE_FROM_WISHLIST': {
      const { productId } = action.payload;
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.product.id !== productId)
      };
    }

    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
        // Close other panels when opening cart
        isWishlistOpen: state.isCartOpen ? state.isWishlistOpen : false
      };

    case 'TOGGLE_WISHLIST':
      return {
        ...state,
        isWishlistOpen: !state.isWishlistOpen,
        // Close other panels when opening wishlist
        isCartOpen: state.isWishlistOpen ? state.isCartOpen : false
      };

    case 'TOGGLE_MOBILE_MENU':
      return {
        ...state,
        isMobileMenuOpen: !state.isMobileMenuOpen
      };

    // Cart actions - delegate to cart reducer
    case CartActionType.ADD_ITEM:
    case CartActionType.REMOVE_ITEM:
    case CartActionType.UPDATE_QUANTITY:
    case CartActionType.CLEAR_CART:
    case CartActionType.APPLY_DISCOUNT:
    case CartActionType.UPDATE_SHIPPING:
      return {
        ...state,
        cart: cartReducer(state.cart, action)
      };

    // Restore actions for localStorage
    case 'RESTORE_CART':
      return {
        ...state,
        cart: action.payload
      };

    case 'RESTORE_WISHLIST':
      return {
        ...state,
        wishlist: action.payload
      };

    default:
      return state;
  }
};

// Action creators for type safety
export const actionCreators = {
  setLoading: (loading: boolean) => ({
    type: 'SET_LOADING',
    payload: loading
  }),

  setError: (error: string | null) => ({
    type: 'SET_ERROR',
    payload: error
  }),

  clearError: () => ({
    type: 'CLEAR_ERROR'
  }),

  setUser: (user: any) => ({
    type: 'SET_USER',
    payload: user
  }),

  setViewMode: (mode: 'grid' | 'list') => ({
    type: 'SET_VIEW_MODE',
    payload: mode
  }),

  updateSearchQuery: (query: string) => ({
    type: 'UPDATE_SEARCH_QUERY',
    payload: query
  }),

  updateSearchFilters: (filters: Partial<any>) => ({
    type: 'UPDATE_SEARCH_FILTERS',
    payload: filters
  }),

  setSearchResults: (products: Product[], total: number) => ({
    type: 'SET_SEARCH_RESULTS',
    payload: { products, total }
  }),

  setSearchLoading: (loading: boolean) => ({
    type: 'SET_SEARCH_LOADING',
    payload: loading
  }),

  setCurrentPage: (page: number) => ({
    type: 'SET_CURRENT_PAGE',
    payload: page
  }),

  setSortBy: (sortBy: string) => ({
    type: 'SET_SORT_BY',
    payload: sortBy
  }),

  addToWishlist: (product: Product) => ({
    type: 'ADD_TO_WISHLIST',
    payload: { product }
  }),

  removeFromWishlist: (productId: string) => ({
    type: 'REMOVE_FROM_WISHLIST',
    payload: { productId }
  }),

  toggleCart: () => ({
    type: 'TOGGLE_CART'
  }),

  toggleWishlist: () => ({
    type: 'TOGGLE_WISHLIST'
  }),

  toggleMobileMenu: () => ({
    type: 'TOGGLE_MOBILE_MENU'
  }),

  // Cart actions
  addToCart: (product: Product, quantity = 1, selectedSize?: string, selectedColor?: string) => ({
    type: CartActionType.ADD_ITEM,
    payload: { product, quantity, selectedSize, selectedColor }
  }),

  removeFromCart: (itemId: string) => ({
    type: CartActionType.REMOVE_ITEM,
    payload: { itemId }
  }),

  updateCartQuantity: (itemId: string, quantity: number) => ({
    type: CartActionType.UPDATE_QUANTITY,
    payload: { itemId, quantity }
  }),

  clearCart: () => ({
    type: CartActionType.CLEAR_CART
  }),

  applyDiscount: (discountAmount: number) => ({
    type: CartActionType.APPLY_DISCOUNT,
    payload: { discountAmount }
  }),

  updateShipping: (shippingCost: number) => ({
    type: CartActionType.UPDATE_SHIPPING,
    payload: { shippingCost }
  }),

  // Restore state actions for localStorage
  restoreCart: (cart: Cart) => ({
    type: 'RESTORE_CART',
    payload: cart
  }),

  restoreWishlist: (wishlist: any[]) => ({
    type: 'RESTORE_WISHLIST',
    payload: wishlist
  })
};
