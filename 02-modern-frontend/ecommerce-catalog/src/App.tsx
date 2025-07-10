import React, { useState, useMemo } from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';
import CartSidebar from './components/CartSidebar/CartSidebar';
import FilterSidebar from './components/FilterSidebar/FilterSidebar';
import ProductRecommendations from './components/ProductRecommendations/ProductRecommendations';
import { mockProducts } from './data/mockProducts';
import { ProductFilters, Product } from './types/Product';
import './App.css';

function App() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({});

  // Extract unique categories and brands from products
  const categories = useMemo(() => 
    Array.from(new Set(mockProducts.map(p => p.category))).sort(),
    []
  );
  
  const brands = useMemo(() => 
    Array.from(new Set(mockProducts.map(p => p.brand))).sort(),
    []
  );

  const priceRange = useMemo(() => {
    const prices = mockProducts.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, []);

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product: Product) => {
      // Category filter
      if (filters.categories?.length && !filters.categories.includes(product.category)) {
        return false;
      }

      // Brand filter
      if (filters.brands?.length && !filters.brands.includes(product.brand)) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
          return false;
        }
      }

      // Rating filter
      if (filters.minRating && product.rating < filters.minRating) {
        return false;
      }

      // Stock filter
      if (filters.inStock !== undefined && product.inStock !== filters.inStock) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFiltersChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
  };

  return (
    <AppProvider>
      <div className="App">
        <Header onFilterClick={handleFilterToggle} />
        <main className="main-content">
          <ProductList 
            products={filteredProducts} 
            isLoading={false}
            error={null}
          />
          <ProductRecommendations 
            title="Recommended for You"
            recommendations={mockProducts.slice(0, 6)}
          />
        </main>
        <CartSidebar />
        <FilterSidebar
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          categories={categories}
          brands={brands}
          priceRange={priceRange}
        />
      </div>
    </AppProvider>
  );
}

export default App;
