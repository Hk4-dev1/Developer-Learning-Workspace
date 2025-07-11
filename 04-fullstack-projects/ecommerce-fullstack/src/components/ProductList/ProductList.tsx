import React, { useState } from 'react';
import { Product, ViewMode } from '../../types/Product';
import { useApp } from '../../context/AppContext';
import SimpleProductCard from '../SimpleProductCard';
import ProductQuickView from '../ProductQuickView/ProductQuickView';
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton';
import { AlertCircle, Filter, SortAsc } from 'lucide-react';
import './ProductList.css';

interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  error?: string | null;
}

const ProductList: React.FC<ProductListProps> = ({ products, isLoading, error }) => {
  const { state } = useApp();
  const { viewMode, searchState } = state;
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Force show products if we have them, regardless of loading state
  const shouldShowProducts = products && products.length > 0;
  const actuallyLoading = isLoading || searchState.isLoading;

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  // Loading state - only show if actually loading AND no products
  if (actuallyLoading && !shouldShowProducts) {
    return (
      <div className="product-list-container">
        <div className={`product-grid ${viewMode === ViewMode.LIST ? 'list-view' : 'grid-view'}`}>
          <LoadingSkeleton 
            variant={viewMode === ViewMode.LIST ? 'product-list' : 'product-card'}
            count={8}
          />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="product-list-container">
        <div className="error-state">
          <AlertCircle className="error-icon" size={48} />
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button 
            className="retry-btn"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!products || products.length === 0) {
    const hasActiveFilters = searchState.query || 
      searchState.filters.categories.length > 0 ||
      searchState.filters.brands.length > 0 ||
      searchState.filters.tags.length > 0 ||
      searchState.filters.rating > 0 ||
      searchState.filters.inStock;

    return (
      <div className="product-list-container">
        <div className="empty-state">
          {hasActiveFilters ? (
            <>
              <Filter className="empty-icon" size={48} />
              <h3>No products found</h3>
              <p>Try adjusting your search criteria or filters to find what you're looking for.</p>
              <div className="empty-actions">
                <button 
                  className="clear-filters-btn"
                  onClick={() => {
                    // This would clear filters - implementation depends on your filter component
                    window.location.reload();
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="empty-icon-container">
                <SortAsc className="empty-icon" size={48} />
              </div>
              <h3>No products available</h3>
              <p>We're working on adding new products. Please check back soon!</p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      {/* Results header */}
      <div className="results-header">
        <div className="results-info">
          <span className="results-count">
            {products.length} {products.length === 1 ? 'product' : 'products'}
            {searchState.query && (
              <span className="search-query"> for "{searchState.query}"</span>
            )}
          </span>
        </div>
        
        <div className="view-info">
          <span className="view-mode-indicator">
            {viewMode === ViewMode.GRID ? 'Grid View' : 'List View'}
          </span>
        </div>
      </div>

      {/* Product grid/list */}
      <div className={`product-list ${viewMode === ViewMode.GRID ? 'product-grid' : 'product-list-view'}`}>
        {products.map((product, index) => (
          <SimpleProductCard
            key={product.id}
            product={product}
            viewMode={viewMode}
            onQuickView={handleQuickView}
          />
        ))}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          isOpen={true}
          onClose={closeQuickView}
        />
      )}

      {/* Load more button or pagination could go here */}
      {products.length >= searchState.itemsPerPage && (
        <div className="load-more-container">
          <button className="load-more-btn">
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
