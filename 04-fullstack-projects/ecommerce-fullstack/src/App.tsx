import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ProductProvider } from './context/ProductProvider';
import { SimpleCartProvider } from './context/SimpleCartContext';
import SimpleHeader from './components/SimpleHeader';
import ProductList from './components/ProductList/ProductList';
import SimpleCartSidebar from './components/SimpleCartSidebar';
import FilterSidebar from './components/FilterSidebar/FilterSidebar';
import ProductRecommendations from './components/ProductRecommendations/ProductRecommendations';
import { ApiStatus } from './components/ApiStatus';
import { ProductFilters, Product } from './types/Product';
import { Product as ApiProduct } from './services/api';
import './App.css';

// Transform API product to our local Product type
const transformApiProduct = (apiProduct: ApiProduct): Product => ({
  id: apiProduct.id,
  name: apiProduct.name,
  description: apiProduct.description,
  price: parseFloat(apiProduct.price),
  originalPrice: apiProduct.original_price ? parseFloat(apiProduct.original_price) : undefined,
  category: apiProduct.category,
  brand: apiProduct.brand,
  images: [],
  thumbnail: (apiProduct as any).thumbnail_url || apiProduct.thumbnail || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
  rating: parseFloat(apiProduct.rating),
  reviewCount: apiProduct.review_count,
  inStock: apiProduct.in_stock,
  stockQuantity: apiProduct.stock_quantity,
  tags: apiProduct.tags,
  specifications: {},
  createdAt: apiProduct.created_at,
  updatedAt: apiProduct.created_at
});

// Fallback products if API fails
const fallbackProducts: Product[] = [
  {
    id: "fallback-1",
    name: "iPhone 15 Pro",
    description: "Latest iPhone with advanced features",
    price: 999.99,
    originalPrice: 1199.99,
    category: "Electronics",
    brand: "Apple",
    images: [],
    thumbnail: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 150,
    inStock: true,
    stockQuantity: 50,
    tags: ["smartphone", "apple", "premium"],
    specifications: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "fallback-2", 
    name: "Samsung Galaxy S24",
    description: "Powerful Android smartphone with excellent camera",
    price: 799.99,
    category: "Electronics",
    brand: "Samsung",
    images: [],
    thumbnail: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    stockQuantity: 30,
    tags: ["smartphone", "samsung", "android"],
    specifications: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Inner component that uses the context
const AppContent: React.FC = () => {
  const { state, searchProducts } = useApp();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingAPI, setIsUsingAPI] = useState(false);

  // Load products from API
  useEffect(() => {
    let mounted = true;
    
    const loadProductsWithRetry = async (retries = 3) => {
      if (!mounted) return;
      
      setLoading(true);
      setError(null);
      
      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/products/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          
          const data = await response.json();
          
          if (mounted && data.results) {
            const transformedProducts = data.results.map(transformApiProduct);
            setProducts(transformedProducts);
            setIsUsingAPI(true);
            setLoading(false);
            return; // Success!
          }
        } catch (err) {
          console.error(`API attempt ${attempt} failed:`, err);
          
          if (attempt === retries) {
            // Final attempt failed
            if (mounted) {
              setError('Unable to connect to server. Using cached data.');
              setProducts(fallbackProducts);
              setIsUsingAPI(false);
            }
          } else {
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      }
      
      if (mounted) {
        setLoading(false);
      }
    };

    loadProductsWithRetry();

    return () => {
      mounted = false;
    };
  }, []);

  // Manual reconnect function
  const reconnectAPI = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/products/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      const transformedProducts = data.results.map(transformApiProduct);
      setProducts(transformedProducts);
      setIsUsingAPI(true);
      
    } catch (err) {
      console.error('Manual reconnection failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Reconnection failed: ${errorMessage}`);
      setProducts(fallbackProducts);
      setIsUsingAPI(false);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFiltersChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
    searchProducts(state.searchState.query, {
      categories: newFilters.categories,
      brands: newFilters.brands,
      priceRange: newFilters.priceRange,
      rating: newFilters.minRating,
      inStock: newFilters.inStock,
    });
  };

  return (
    <div className="App">
      <SimpleHeader onFilterClick={handleFilterToggle} />
      <ApiStatus />
      
      {/* Data Source Indicator */}
      <div style={{
        background: isUsingAPI ? '#e8f5e8' : '#fff3cd',
        color: isUsingAPI ? '#2e7d32' : '#856404',
        padding: '8px 16px',
        margin: '10px',
        borderRadius: '4px',
        fontSize: '14px',
        textAlign: 'center'
      }}>
        {isUsingAPI ? '🌐 Live data from API' : '💾 Using offline data'}
        {` (${products.length} products)`}
      </div>

      {error && (
        <div style={{ 
          background: '#ffebee', 
          color: '#c62828', 
          padding: '10px', 
          margin: '10px',
          borderRadius: '5px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{error}</span>
          <button 
            onClick={reconnectAPI}
            style={{
              background: '#1976d2',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            Reconnect
          </button>
        </div>
      )}
      <main className="main-content">
        <ProductList 
          products={products} 
          isLoading={loading}
          error={error}
        />
        <ProductRecommendations 
          title="Recommended for You"
          recommendations={products.slice(0, 3)}
        />
      </main>
      <SimpleCartSidebar />
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        categories={[]}
        brands={[]}
        priceRange={{ min: 0, max: 5000 }}
      />
    </div>
  );
};

function App() {
  return (
    <SimpleCartProvider>
      <AppProvider>
        <ProductProvider>
          <AppContent />
        </ProductProvider>
      </AppProvider>
    </SimpleCartProvider>
  );
}

export default App;
