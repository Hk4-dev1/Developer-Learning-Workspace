// API Service for Django Backend Integration
import axios, { AxiosResponse } from 'axios';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

// Type definitions for API responses
export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string | null;
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: string;
  name: string;
  description: string;
  logo: string | null;
  website: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  original_price: string | null;
  category: string; // Category name in list view
  brand: string; // Brand name in list view
  in_stock: boolean;
  stock_quantity: number;
  rating: string;
  review_count: number;
  thumbnail: string | null;
  tags: string[];
  is_on_sale: boolean | null;
  discount_percentage: number;
  created_at: string;
}

export interface ProductDetail {
  id: string;
  name: string;
  description: string;
  price: string;
  original_price: string | null;
  category: Category; // Full category object in detail view
  brand: Brand; // Full brand object in detail view
  in_stock: boolean;
  stock_quantity: number;
  rating: string;
  review_count: number;
  thumbnail: string | null;
  tags: string[];
  is_on_sale: boolean | null;
  discount_percentage: number;
  created_at: string;
  specifications: Record<string, any>;
  images: any[];
  reviews: any[];
}

export interface SearchParams {
  q?: string;
  category?: string;
  brand?: string;
  min_price?: number;
  max_price?: number;
  min_rating?: number;
  in_stock?: boolean;
  page?: number;
  page_size?: number;
}

// API Service Class
class ApiService {
  // Categories API
  async getCategories(): Promise<Category[]> {
    const response: AxiosResponse<ApiResponse<Category>> = await apiClient.get('/categories/');
    return response.data.results;
  }

  async getCategory(id: string): Promise<Category> {
    const response: AxiosResponse<Category> = await apiClient.get(`/categories/${id}/`);
    return response.data;
  }

  // Brands API
  async getBrands(): Promise<Brand[]> {
    const response: AxiosResponse<ApiResponse<Brand>> = await apiClient.get('/brands/');
    return response.data.results;
  }

  async getBrand(id: string): Promise<Brand> {
    const response: AxiosResponse<Brand> = await apiClient.get(`/brands/${id}/`);
    return response.data;
  }

  // Products API
  async getProducts(params?: SearchParams): Promise<ApiResponse<Product>> {
    const response: AxiosResponse<ApiResponse<Product>> = await apiClient.get('/products/', {
      params: this.cleanParams(params),
    });
    return response.data;
  }

  async getProduct(id: string): Promise<ProductDetail> {
    const response: AxiosResponse<ProductDetail> = await apiClient.get(`/products/${id}/`);
    return response.data;
  }

  // Search API
  async searchProducts(params: SearchParams): Promise<ApiResponse<Product>> {
    const response: AxiosResponse<ApiResponse<Product>> = await apiClient.get('/search/', {
      params: this.cleanParams(params),
    });
    return response.data;
  }

  // Utility method to clean undefined params
  private cleanParams(params?: SearchParams): Record<string, any> {
    if (!params) return {};
    
    const cleaned: Record<string, any> = {};
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        cleaned[key] = value;
      }
    });
    return cleaned;
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await apiClient.get('/health/');
      return response.status === 200 && response.data.status === 'healthy';
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export for testing
export { apiClient };

// Utility functions for error handling
export const isNetworkError = (error: any): boolean => {
  return !error.response && error.request;
};

export const getErrorMessage = (error: any): string => {
  if (isNetworkError(error)) {
    return 'Network error. Please check your connection and try again.';
  }
  
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.response?.data?.detail) {
    return error.response.data.detail;
  }
  
  return error.message || 'An unexpected error occurred.';
};

export default apiService;
