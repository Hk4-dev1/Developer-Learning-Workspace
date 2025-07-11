// Simple Product Card that uses SimpleCart
import React from 'react';
import { Heart, ShoppingCart, Star, Eye, ArrowRight } from 'lucide-react';
import { Product, ViewMode } from '../types/Product';
import { useSimpleCartContext } from '../context/SimpleCartContext';
import { formatCurrency } from '../utils/helpers';
import './ProductCard/ProductCard.css';

interface SimpleProductCardProps {
  product: Product;
  viewMode: ViewMode;
  onQuickView?: (product: Product) => void;
}

const SimpleProductCard: React.FC<SimpleProductCardProps> = ({ product, viewMode, onQuickView }) => {
  const { 
    addToCart, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist, 
    isInCart, 
    getCartItemCount 
  } = useSimpleCartContext();

  const isWishlisted = isInWishlist(product.id);
  const isInCartAlready = isInCart(product.id);
  const cartQuantity = getCartItemCount(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView?.(product);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={14}
        className={`star ${index < Math.floor(rating) ? 'filled' : ''}`}
        fill={index < Math.floor(rating) ? 'currentColor' : 'none'}
      />
    ));
  };

  if (viewMode === ViewMode.LIST) {
    return (
      <div className="product-card product-card--list">
        <div className="product-image-container">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
          {discountPercentage > 0 && (
            <span className="discount-badge">-{discountPercentage}%</span>
          )}
          {!product.inStock && (
            <div className="out-of-stock-overlay">
              <span>Out of Stock</span>
            </div>
          )}
          <div className="product-actions product-actions--list">
            <button
              className={`action-btn wishlist-btn ${isWishlisted ? 'active' : ''}`}
              onClick={handleToggleWishlist}
              title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart size={16} />
            </button>
            <button
              className="action-btn quick-view-btn"
              onClick={handleQuickView}
              title="Quick view"
            >
              <Eye size={16} />
            </button>
          </div>
        </div>

        <div className="product-info product-info--list">
          <div className="product-meta">
            <span className="product-category">{product.category}</span>
            <span className="product-brand">{product.brand}</span>
          </div>
          
          <h3 className="product-name">{product.name}</h3>
          
          <p className="product-description">{product.description}</p>

          <div className="product-rating">
            <div className="stars">
              {renderStars(product.rating)}
            </div>
            <span className="rating-text">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="product-tags">
            {product.tags.slice(0, 3).map((tag: string) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          <div className="product-price">
            <span className="current-price">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="original-price">{formatCurrency(product.originalPrice)}</span>
            )}
          </div>
          
          <div className="product-actions-list">
            {isInCartAlready ? (
              <div className="in-cart-indicator">
                <ShoppingCart size={16} />
                <span>In Cart ({cartQuantity})</span>
              </div>
            ) : (
              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="product-card product-card--grid">
      <div className="product-image-container">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        {discountPercentage > 0 && (
          <span className="discount-badge">-{discountPercentage}%</span>
        )}
        {!product.inStock && (
          <div className="out-of-stock-overlay">
            <span>Out of Stock</span>
          </div>
        )}
        
        <div className="product-actions">
          <button
            className={`action-btn wishlist-btn ${isWishlisted ? 'active' : ''}`}
            onClick={handleToggleWishlist}
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={18} />
          </button>
          <button
            className="action-btn quick-view-btn"
            onClick={handleQuickView}
            title="Quick view"
          >
            <Eye size={18} />
          </button>
        </div>
        
        {/* Hover overlay with quick actions */}
        <div className="product-hover-overlay">
          {isInCartAlready ? (
            <div className="in-cart-indicator">
              <ShoppingCart size={18} />
              <span>In Cart ({cartQuantity})</span>
            </div>
          ) : (
            <button
              className="add-to-cart-btn add-to-cart-btn--overlay"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          )}
        </div>
      </div>

      <div className="product-info">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <span className="product-brand">{product.brand}</span>
        </div>
        
        <h3 className="product-name">{product.name}</h3>

        <div className="product-rating">
          <div className="stars">
            {renderStars(product.rating)}
          </div>
          <span className="rating-text">({product.reviewCount})</span>
        </div>

        <div className="product-price">
          <span className="current-price">{formatCurrency(product.price)}</span>
          {product.originalPrice && (
            <span className="original-price">{formatCurrency(product.originalPrice)}</span>
          )}
        </div>

        {/* Mobile add to cart button */}
        <div className="mobile-actions">
          {isInCartAlready ? (
            <div className="in-cart-indicator in-cart-indicator--mobile">
              <ShoppingCart size={16} />
              <span>In Cart ({cartQuantity})</span>
            </div>
          ) : (
            <button
              className="add-to-cart-btn add-to-cart-btn--mobile"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart size={16} />
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleProductCard;
