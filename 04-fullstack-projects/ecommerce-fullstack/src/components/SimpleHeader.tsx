// Simple Header that uses SimpleCart
import React, { useState } from 'react';
import { ShoppingCart, Heart, Search, Grid, List, User, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useSimpleCartContext } from '../context/SimpleCartContext';
import { ViewMode } from '../types/Product';
import RecentSearches from './RecentSearches/RecentSearches';
import './Header/Header.css';

interface SimpleHeaderProps {
  onFilterClick?: () => void;
}

const SimpleHeader: React.FC<SimpleHeaderProps> = ({ onFilterClick }) => {
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const {
    state,
    searchProducts,
    setViewMode
  } = useApp();

  const {
    cart,
    wishlist,
    isCartOpen,
    isWishlistOpen,
    toggleCart,
    toggleWishlist
  } = useSimpleCartContext();

  const { searchState, viewMode } = state;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchProducts(e.target.value);
  };

  const handleSearchFocus = () => {
    setShowRecentSearches(true);
  };

  const handleSearchBlur = () => {
    // Delay hiding to allow clicks on search suggestions
    setTimeout(() => setShowRecentSearches(false), 200);
  };

  const handleSearchSelect = (query: string) => {
    searchProducts(query);
    setShowRecentSearches(false);
  };

  const cartItemCount = cart.totalItems;
  const wishlistCount = wishlist.length;

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo">
          <h1>ShopCatalog</h1>
        </div>

        {/* Search Bar */}
        <div className="header-search">
          <div className="search-input-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchState.query}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className="search-input"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="header-actions">
          {/* View Mode Toggle */}
          <div className="view-mode-toggle">
            <button
              className={`view-mode-btn ${viewMode === ViewMode.GRID ? 'active' : ''}`}
              onClick={() => setViewMode(ViewMode.GRID)}
              title="Grid View"
            >
              <Grid size={20} />
            </button>
            <button
              className={`view-mode-btn ${viewMode === ViewMode.LIST ? 'active' : ''}`}
              onClick={() => setViewMode(ViewMode.LIST)}
              title="List View"
            >
              <List size={20} />
            </button>
          </div>

          {/* Filter Button */}
          {onFilterClick && (
            <button
              className="header-btn filter-btn"
              onClick={onFilterClick}
              title="Filters"
            >
              <Filter size={20} />
            </button>
          )}

          {/* Wishlist */}
          <button
            className={`header-btn wishlist-btn ${isWishlistOpen ? 'active' : ''}`}
            onClick={toggleWishlist}
            title="Wishlist"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="badge">{wishlistCount}</span>
            )}
          </button>

          {/* Cart */}
          <button
            className={`header-btn cart-btn ${isCartOpen ? 'active' : ''}`}
            onClick={toggleCart}
            title="Shopping Cart"
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="badge">{cartItemCount}</span>
            )}
          </button>

          {/* User Profile */}
          <button className="header-btn user-btn" title="User Profile">
            <User size={20} />
          </button>
        </div>
      </div>

      {/* Recent Searches */}
      {showRecentSearches && (
        <RecentSearches
          onSearchSelect={handleSearchSelect}
          currentQuery={searchState.query}
        />
      )}
    </header>
  );
};

export default SimpleHeader;
