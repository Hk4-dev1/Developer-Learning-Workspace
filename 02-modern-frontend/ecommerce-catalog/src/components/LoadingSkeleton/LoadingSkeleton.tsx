import React from 'react';
import './LoadingSkeleton.css';

interface LoadingSkeletonProps {
  variant?: 'product-card' | 'product-list' | 'text' | 'avatar';
  count?: number;
  className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  variant = 'product-card', 
  count = 1,
  className = ''
}) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'product-card':
        return (
          <div className={`skeleton-product-card ${className}`}>
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
              <div className="skeleton-text skeleton-title"></div>
              <div className="skeleton-text skeleton-subtitle"></div>
              <div className="skeleton-price-row">
                <div className="skeleton-text skeleton-price"></div>
                <div className="skeleton-text skeleton-rating"></div>
              </div>
              <div className="skeleton-button"></div>
            </div>
          </div>
        );
      
      case 'product-list':
        return (
          <div className={`skeleton-product-list ${className}`}>
            <div className="skeleton-image-list"></div>
            <div className="skeleton-content-list">
              <div className="skeleton-text skeleton-title-large"></div>
              <div className="skeleton-text skeleton-description"></div>
              <div className="skeleton-text skeleton-description short"></div>
              <div className="skeleton-price-row">
                <div className="skeleton-text skeleton-price-large"></div>
                <div className="skeleton-text skeleton-rating"></div>
              </div>
              <div className="skeleton-actions">
                <div className="skeleton-button"></div>
                <div className="skeleton-button secondary"></div>
              </div>
            </div>
          </div>
        );
      
      case 'text':
        return <div className={`skeleton-text ${className}`}></div>;
      
      case 'avatar':
        return <div className={`skeleton-avatar ${className}`}></div>;
      
      default:
        return <div className={`skeleton-default ${className}`}></div>;
    }
  };

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="skeleton-wrapper">
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton;
