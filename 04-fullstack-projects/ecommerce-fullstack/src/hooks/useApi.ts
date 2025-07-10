// Custom React hooks for API integration
import { useState, useEffect, useCallback } from 'react';
import { 
  apiService, 
  Category, 
  Brand, 
  Product, 
  ProductDetail, 
  SearchParams, 
  ApiResponse,
  getErrorMessage 
} from '../services/api';

// Generic API hook state
interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Hook for fetching categories
export const useCategories = () => {
  const [state, setState] = useState<ApiState<Category[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const categories = await apiService.getCategories();
        setState({ data: categories, loading: false, error: null });
      } catch (error) {
        setState({ 
          data: null, 
          loading: false, 
          error: getErrorMessage(error) 
        });
      }
    };

    fetchCategories();
  }, []);

  return state;
};

// Hook for fetching brands
export const useBrands = () => {
  const [state, setState] = useState<ApiState<Brand[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const brands = await apiService.getBrands();
        setState({ data: brands, loading: false, error: null });
      } catch (error) {
        setState({ 
          data: null, 
          loading: false, 
          error: getErrorMessage(error) 
        });
      }
    };

    fetchBrands();
  }, []);

  return state;
};

// Hook for fetching products with search/filter
export const useProducts = (searchParams?: SearchParams) => {
  const [state, setState] = useState<ApiState<ApiResponse<Product>>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchProducts = useCallback(async (params?: SearchParams) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await apiService.getProducts(params);
      setState({ data: response, loading: false, error: null });
    } catch (error) {
      setState({ 
        data: null, 
        loading: false, 
        error: getErrorMessage(error) 
      });
    }
  }, []);

  useEffect(() => {
    fetchProducts(searchParams);
  }, [fetchProducts, searchParams]);

  return {
    ...state,
    refetch: fetchProducts,
  };
};

// Hook for product search
export const useProductSearch = () => {
  const [state, setState] = useState<ApiState<ApiResponse<Product>>>({
    data: null,
    loading: false,
    error: null,
  });

  const search = useCallback(async (params: SearchParams) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await apiService.searchProducts(params);
      setState({ data: response, loading: false, error: null });
    } catch (error) {
      setState({ 
        data: null, 
        loading: false, 
        error: getErrorMessage(error) 
      });
    }
  }, []);

  const clearSearch = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    search,
    clearSearch,
  };
};

// Hook for single product
export const useProduct = (productId: string | null) => {
  const [state, setState] = useState<ApiState<ProductDetail>>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!productId) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    const fetchProduct = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const product = await apiService.getProduct(productId);
        setState({ data: product, loading: false, error: null });
      } catch (error) {
        setState({ 
          data: null, 
          loading: false, 
          error: getErrorMessage(error) 
        });
      }
    };

    fetchProduct();
  }, [productId]);

  return state;
};

// Hook for API health check
export const useApiHealth = () => {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);

  const checkHealth = useCallback(async () => {
    setChecking(true);
    try {
      const healthy = await apiService.healthCheck();
      setIsHealthy(healthy);
    } catch (error) {
      setIsHealthy(false);
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  return {
    isHealthy,
    checking,
    checkHealth,
  };
};

// Hook for debounced search
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook for paginated data
export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20); // Match Django backend page size

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const nextPage = useCallback(() => {
    setCurrentPage(prev => prev + 1);
  }, []);

  const prevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  }, []);

  const reset = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    pageSize,
    goToPage,
    nextPage,
    prevPage,
    reset,
  };
};
