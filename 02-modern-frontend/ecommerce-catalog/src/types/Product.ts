// types/Product.ts - Type definitions for e-commerce catalog

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For sale prices
  category: string;
  subcategory?: string;
  brand: string;
  images: string[];
  thumbnail: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockQuantity: number;
  tags: string[];
  specifications?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  description: string;
  categoryId: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  addedAt: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  totalItems: number;
  discount: number;
  shipping: number;
  tax: number;
  finalTotal: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  favoriteCategories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  preferredBrands: string[];
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

export interface Filter {
  categories: string[];
  brands: string[];
  priceRange: {
    min: number;
    max: number;
  };
  rating: number;
  inStock: boolean;
  tags: string[];
}

export interface SortOption {
  value: string;
  label: string;
  direction: 'asc' | 'desc';
}

export interface SearchState {
  query: string;
  filters: Filter;
  sortBy: string;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  results: Product[];
  isLoading: boolean;
}

export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  helpful: number;
  verified: boolean;
}

// Enums for better type safety
export enum ProductStatus {
  AVAILABLE = 'available',
  OUT_OF_STOCK = 'out_of_stock',
  DISCONTINUED = 'discontinued',
  COMING_SOON = 'coming_soon'
}

export enum CartActionType {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  UPDATE_QUANTITY = 'UPDATE_QUANTITY',
  CLEAR_CART = 'CLEAR_CART',
  APPLY_DISCOUNT = 'APPLY_DISCOUNT',
  UPDATE_SHIPPING = 'UPDATE_SHIPPING',
  // UI Actions
  TOGGLE_CART = 'TOGGLE_CART',
  TOGGLE_WISHLIST = 'TOGGLE_WISHLIST',
  TOGGLE_MOBILE_MENU = 'TOGGLE_MOBILE_MENU',
  SET_VIEW_MODE = 'SET_VIEW_MODE',
  // Wishlist Actions
  ADD_TO_WISHLIST = 'ADD_TO_WISHLIST',
  REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST',
  // Search Actions
  SET_SEARCH_QUERY = 'SET_SEARCH_QUERY',
  SET_SEARCH_FILTERS = 'SET_SEARCH_FILTERS',
  SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS'
}

export enum ViewMode {
  GRID = 'grid',
  LIST = 'list'
}

// Action types for useReducer
export interface CartAction {
  type: CartActionType;
  payload?: any;
}

export interface AppState {
  user: User | null;
  cart: Cart;
  wishlist: WishlistItem[];
  searchState: SearchState;
  viewMode: ViewMode;
  isLoading: boolean;
  error: string | null;
  // UI State
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isMobileMenuOpen: boolean;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface ProductFilters {
  categories?: string[];
  brands?: string[];
  priceRange?: PriceRange;
  minRating?: number;
  inStock?: boolean;
  tags?: string[];
}
