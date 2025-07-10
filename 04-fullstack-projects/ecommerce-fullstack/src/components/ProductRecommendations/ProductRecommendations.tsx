import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../../types/Product';
import ProductCard from '../ProductCard/ProductCard';
import { ViewMode } from '../../types/Product';
import './ProductRecommendations.css';

interface ProductRecommendationsProps {
  currentProduct?: Product;
  cartItems?: Product[];
  recommendations: Product[];
  title?: string;
  onViewAll?: () => void;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  currentProduct,
  cartItems = [],
  recommendations,
  title = "You might also like",
  onViewAll
}) => {
  if (recommendations.length === 0) {
    return null;
  }

  const getRecommendationReason = (product: Product): string => {
    if (currentProduct) {
      if (product.category === currentProduct.category) {
        return `Similar to ${currentProduct.name}`;
      }
      if (product.brand === currentProduct.brand) {
        return `More from ${product.brand}`;
      }
    }
    
    if (cartItems.length > 0) {
      const cartCategories = cartItems.map(item => item.category);
      if (cartCategories.includes(product.category)) {
        return 'Based on your cart';
      }
    }
    
    if (product.rating >= 4.7) {
      return 'Highly rated';
    }
    
    return 'Trending now';
  };

  return (
    <section className="product-recommendations">
      <div className="recommendations-header">
        <div className="recommendations-title">
          <Sparkles className="title-icon" size={20} />
          <h3>{title}</h3>
        </div>
        
        {onViewAll && (
          <button className="view-all-btn" onClick={onViewAll}>
            View All
            <ArrowRight size={16} />
          </button>
        )}
      </div>

      <div className="recommendations-grid">
        {recommendations.slice(0, 4).map((product) => (
          <div key={product.id} className="recommendation-item">
            <div className="recommendation-reason">
              {getRecommendationReason(product)}
            </div>
            <ProductCard
              product={product}
              viewMode={ViewMode.GRID}
            />
          </div>
        ))}
      </div>

      {recommendations.length > 4 && (
        <div className="recommendations-footer">
          <button className="show-more-btn" onClick={onViewAll}>
            Show {recommendations.length - 4} more recommendations
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductRecommendations;
