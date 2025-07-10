import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ProductProvider } from './context/ProductProvider';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';
import CartSidebar from './components/CartSidebar/CartSidebar';
import FilterSidebar from './components/FilterSidebar/FilterSidebar';
import ProductRecommendations from './components/ProductRecommendations/ProductRecommendations';
import { ApiStatus } from './components/ApiStatus';
import { ProductFilters } from './types/Product';
import './App.css';

// Inner component that uses the context
const AppContent: React.FC = () => {
  const { state, searchProducts } = useApp();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({});

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFiltersChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
    // Trigger search with new filters
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
      <Header onFilterClick={handleFilterToggle} />
      <ApiStatus />
      <main className="main-content">
        <ProductList 
          products={state.searchState.results} 
          isLoading={state.searchState.isLoading}
          error={state.error}
        />
        {state.searchState.results.length > 0 && (
          <ProductRecommendations 
            title="Recommended for You"
            recommendations={state.searchState.results.slice(0, 6)}
          />
        )}
      </main>
      <CartSidebar />
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        categories={[]} // Will be populated by ProductProvider
        brands={[]} // Will be populated by ProductProvider
        priceRange={{ min: 0, max: 5000 }} // Default range
      />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <ProductProvider>
        <AppContent />
      </ProductProvider>
    </AppProvider>
  );
}

export default App;
