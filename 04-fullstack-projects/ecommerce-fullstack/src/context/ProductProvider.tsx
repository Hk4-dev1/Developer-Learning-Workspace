// context/ProductProvider.tsx - Context for individual product data

import React, { createContext, useContext, ReactNode } from 'react';
import { useProduct, useCategories, useBrands } from '../hooks/useApi';
import { Product as FrontendProduct } from '../types/Product';
import { ProductDetail, Category, Brand } from '../services/api';

interface ProductContextType {
  product: FrontendProduct | null;
  productLoading: boolean;
  productError: string | null;
  categories: Category[] | null;
  categoriesLoading: boolean;
  categoriesError: string | null;
  brands: Brand[] | null;
  brandsLoading: boolean;
  brandsError: string | null;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
  productId?: string;
}

// Helper function to transform API ProductDetail to frontend Product
const transformProductDetail = (apiProduct: ProductDetail): FrontendProduct => {
  return {
    id: apiProduct.id.toString(),
    name: apiProduct.name,
    description: apiProduct.description,
    price: parseFloat(apiProduct.price),
    originalPrice: apiProduct.original_price ? parseFloat(apiProduct.original_price) : undefined,
    category: apiProduct.category.name,
    subcategory: undefined, // Not available in API response
    brand: apiProduct.brand.name,
    images: apiProduct.images?.map((img: any) => img.image_url || img.image) || [],
    thumbnail: (apiProduct as any).thumbnail_url || apiProduct.thumbnail || (apiProduct.images?.[0] as any)?.image_url || '',
    rating: parseFloat(apiProduct.rating) || 0,
    reviewCount: apiProduct.review_count || 0,
    inStock: apiProduct.in_stock,
    stockQuantity: apiProduct.stock_quantity,
    tags: apiProduct.tags || [],
    specifications: apiProduct.specifications || {},
    createdAt: apiProduct.created_at,
    updatedAt: apiProduct.created_at, // Using created_at as fallback
  };
};

export const ProductProvider: React.FC<ProductProviderProps> = ({ 
  children, 
  productId 
}) => {
  const { 
    data: apiProduct, 
    loading: productLoading, 
    error: productError 
  } = useProduct(productId || null);

  const { 
    data: categories, 
    loading: categoriesLoading, 
    error: categoriesError 
  } = useCategories();

  const { 
    data: brands, 
    loading: brandsLoading, 
    error: brandsError 
  } = useBrands();

  // Transform API product to frontend format
  const product = apiProduct ? transformProductDetail(apiProduct) : null;

  const contextValue: ProductContextType = {
    product,
    productLoading,
    productError,
    categories,
    categoriesLoading,
    categoriesError,
    brands,
    brandsLoading,
    brandsError,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
