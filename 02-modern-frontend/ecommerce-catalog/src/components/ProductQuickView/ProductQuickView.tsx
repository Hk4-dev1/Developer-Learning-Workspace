import React from 'react';
import { X, ShoppingCart, Heart, Star, Check } from 'lucide-react';
import { Product } from '../../types/Product';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/helpers';
import ProductRecommendations from '../ProductRecommendations/ProductRecommendations';
import { mockProducts } from '../../data/mockProducts';
import './ProductQuickView.css';

interface ProductQuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductQuickView: React.FC<ProductQuickViewProps> = ({ product, isOpen, onClose }) => {
  const { actions, isInWishlist, isInCart, getCartItemCount } = useApp();

  const isWishlisted = isInWishlist(product.id);
  const isInCartAlready = isInCart(product.id);
  const cartQuantity = getCartItemCount(product.id);

  const handleAddToCart = () => {
    actions.addToCart(product, 1);
  };

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      actions.removeFromWishlist(product.id);
    } else {
      actions.addToWishlist(product);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`star ${index < Math.floor(rating) ? 'filled' : ''}`}
        fill={index < Math.floor(rating) ? 'currentColor' : 'none'}
      />
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="quick-view-overlay" onClick={handleBackdropClick}>
      <div className="quick-view-modal">
        {/* Close button */}
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="quick-view-content">
          {/* Product Image */}
          <div className="quick-view-image">
            <img src={product.thumbnail} alt={product.name} />
            {discountPercentage > 0 && (
              <span className="discount-badge">-{discountPercentage}%</span>
            )}
            {!product.inStock && (
              <div className="out-of-stock-overlay">
                <span>Out of Stock</span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="quick-view-details">
            <div className="product-meta">
              <span className="product-category">{product.category}</span>
              <span className="product-brand">{product.brand}</span>
            </div>

            <h2 className="product-name">{product.name}</h2>

            <div className="product-rating">
              <div className="stars">
                {renderStars(product.rating)}
              </div>
              <span className="rating-text">
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>

            <p className="product-description">{product.description}</p>

            {/* Pricing */}
            <div className="pricing">
              <span className="current-price">{formatCurrency(product.price)}</span>
              {product.originalPrice && (
                <span className="original-price">{formatCurrency(product.originalPrice)}</span>
              )}
            </div>

            {/* Stock Status */}
            <div className="stock-status">
              {product.inStock ? (
                <div className="in-stock">
                  <Check size={16} />
                  <span>In Stock ({product.stockQuantity} available)</span>
                </div>
              ) : (
                <div className="out-of-stock">
                  <span>Out of Stock</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="product-tags">
                {product.tags.slice(0, 4).map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            )}

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="specifications">
                <h4>Specifications</h4>
                <div className="spec-list">
                  {Object.entries(product.specifications).slice(0, 4).map(([key, value]) => (
                    <div key={key} className="spec-item">
                      <span className="spec-key">{key}:</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="quick-view-actions">
              <button
                className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                onClick={handleToggleWishlist}
                title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart size={20} />
                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>

              {isInCartAlready ? (
                <div className="in-cart-indicator">
                  <ShoppingCart size={20} />
                  <span>In Cart ({cartQuantity})</span>
                </div>
              ) : (
                <button
                  className="add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              )}
            </div>
          </div>

          {/* Related Products Section */}
          <div className="related-products-section">
            <ProductRecommendations
              currentProduct={product}
              recommendations={mockProducts
                .filter(p => p.id !== product.id && p.category === product.category)
                .slice(0, 4)
              }
              title="Related Products"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
