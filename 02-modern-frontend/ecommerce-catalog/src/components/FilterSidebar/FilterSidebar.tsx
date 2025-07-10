import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { ProductFilters, PriceRange } from '../../types/Product';
import { useApp } from '../../context/AppContext';
import './FilterSidebar.css';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  categories: string[];
  brands: string[];
  priceRange: PriceRange;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  categories,
  brands,
  priceRange
}) => {
  const { actions } = useApp();
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brand: true,
    price: true,
    rating: true,
    availability: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category: string) => {
    const updatedCategories = filters.categories?.includes(category)
      ? filters.categories.filter((c: string) => c !== category)
      : [...(filters.categories || []), category];
    
    onFiltersChange({
      ...filters,
      categories: updatedCategories
    });
  };

  const handleBrandChange = (brand: string) => {
    const updatedBrands = filters.brands?.includes(brand)
      ? filters.brands.filter((b: string) => b !== brand)
      : [...(filters.brands || []), brand];
    
    onFiltersChange({
      ...filters,
      brands: updatedBrands
    });
  };

  const handlePriceRangeChange = (newPriceRange: PriceRange) => {
    onFiltersChange({
      ...filters,
      priceRange: newPriceRange
    });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({
      ...filters,
      minRating: filters.minRating === rating ? undefined : rating
    });
  };

  const handleAvailabilityChange = (inStock: boolean) => {
    onFiltersChange({
      ...filters,
      inStock: filters.inStock === inStock ? undefined : inStock
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const activeFiltersCount = 
    (filters.categories?.length || 0) +
    (filters.brands?.length || 0) +
    (filters.priceRange ? 1 : 0) +
    (filters.minRating ? 1 : 0) +
    (filters.inStock !== undefined ? 1 : 0);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="filter-sidebar-overlay" onClick={handleBackdropClick}>
      <div className="filter-sidebar">
        <div className="filter-header">
          <div className="filter-title">
            <Filter size={20} />
            <h3>Filters</h3>
            {activeFiltersCount > 0 && (
              <span className="filter-count">{activeFiltersCount}</span>
            )}
          </div>
          <button className="close-filter-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="filter-content">
          {activeFiltersCount > 0 && (
            <div className="filter-actions">
              <button className="clear-filters-btn" onClick={clearAllFilters}>
                Clear All Filters
              </button>
            </div>
          )}

          {/* Categories */}
          <div className="filter-section">
            <button 
              className="filter-section-header"
              onClick={() => toggleSection('category')}
            >
              <span>Categories</span>
              {expandedSections.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {expandedSections.category && (
              <div className="filter-section-content">
                {categories.map(category => (
                  <label key={category} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.categories?.includes(category) || false}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-label">{category}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Brands */}
          <div className="filter-section">
            <button 
              className="filter-section-header"
              onClick={() => toggleSection('brand')}
            >
              <span>Brands</span>
              {expandedSections.brand ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {expandedSections.brand && (
              <div className="filter-section-content">
                {brands.map(brand => (
                  <label key={brand} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.brands?.includes(brand) || false}
                      onChange={() => handleBrandChange(brand)}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-label">{brand}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className="filter-section">
            <button 
              className="filter-section-header"
              onClick={() => toggleSection('price')}
            >
              <span>Price Range</span>
              {expandedSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {expandedSections.price && (
              <div className="filter-section-content">
                <div className="price-range-inputs">
                  <div className="price-input-group">
                    <label>Min Price</label>
                    <input
                      type="number"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={filters.priceRange?.min || priceRange.min}
                      onChange={(e) => handlePriceRangeChange({
                        ...filters.priceRange,
                        min: Number(e.target.value),
                        max: filters.priceRange?.max || priceRange.max
                      })}
                      className="price-input"
                    />
                  </div>
                  <div className="price-input-group">
                    <label>Max Price</label>
                    <input
                      type="number"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={filters.priceRange?.max || priceRange.max}
                      onChange={(e) => handlePriceRangeChange({
                        ...filters.priceRange,
                        min: filters.priceRange?.min || priceRange.min,
                        max: Number(e.target.value)
                      })}
                      className="price-input"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="filter-section">
            <button 
              className="filter-section-header"
              onClick={() => toggleSection('rating')}
            >
              <span>Minimum Rating</span>
              {expandedSections.rating ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {expandedSections.rating && (
              <div className="filter-section-content">
                {[4, 3, 2, 1].map(rating => (
                  <label key={rating} className="filter-radio">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.minRating === rating}
                      onChange={() => handleRatingChange(rating)}
                    />
                    <span className="radio-mark"></span>
                    <span className="radio-label">
                      {rating}+ Stars
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Availability */}
          <div className="filter-section">
            <button 
              className="filter-section-header"
              onClick={() => toggleSection('availability')}
            >
              <span>Availability</span>
              {expandedSections.availability ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {expandedSections.availability && (
              <div className="filter-section-content">
                <label className="filter-radio">
                  <input
                    type="radio"
                    name="availability"
                    checked={filters.inStock === true}
                    onChange={() => handleAvailabilityChange(true)}
                  />
                  <span className="radio-mark"></span>
                  <span className="radio-label">In Stock Only</span>
                </label>
                <label className="filter-radio">
                  <input
                    type="radio"
                    name="availability"
                    checked={filters.inStock === false}
                    onChange={() => handleAvailabilityChange(false)}
                  />
                  <span className="radio-mark"></span>
                  <span className="radio-label">Out of Stock</span>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
