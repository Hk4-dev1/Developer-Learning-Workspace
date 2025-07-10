import React, { useState, useEffect } from 'react';
import { Clock, X, Search, TrendingUp } from 'lucide-react';
import './RecentSearches.css';

interface RecentSearchesProps {
  onSearchSelect: (query: string) => void;
  currentQuery: string;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ onSearchSelect, currentQuery }) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [trendingSearches] = useState<string[]>([
    'iPhone', 'MacBook', 'Nike shoes', 'KitchenAid', 'Yoga mat'
  ]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recent-searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    }
  }, []);

  // Save search to recent searches
  useEffect(() => {
    if (currentQuery && currentQuery.length > 2) {
      const updatedSearches = [
        currentQuery,
        ...recentSearches.filter(search => search !== currentQuery)
      ].slice(0, 5); // Keep only last 5 searches

      setRecentSearches(updatedSearches);
      localStorage.setItem('recent-searches', JSON.stringify(updatedSearches));
    }
  }, [currentQuery, recentSearches]);

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recent-searches');
  };

  const removeSearch = (searchToRemove: string) => {
    const updated = recentSearches.filter(search => search !== searchToRemove);
    setRecentSearches(updated);
    localStorage.setItem('recent-searches', JSON.stringify(updated));
  };

  if (recentSearches.length === 0 && trendingSearches.length === 0) {
    return null;
  }

  return (
    <div className="recent-searches">
      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="search-section">
          <div className="search-section-header">
            <div className="search-section-title">
              <Clock size={16} />
              <span>Recent Searches</span>
            </div>
            <button 
              className="clear-all-btn"
              onClick={clearRecentSearches}
              title="Clear all recent searches"
            >
              Clear All
            </button>
          </div>
          
          <div className="search-items">
            {recentSearches.map((search, index) => (
              <div key={index} className="search-item">
                <button
                  className="search-item-btn"
                  onClick={() => onSearchSelect(search)}
                >
                  <Search size={14} />
                  <span>{search}</span>
                </button>
                <button
                  className="remove-search-btn"
                  onClick={() => removeSearch(search)}
                  title="Remove from recent searches"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trending Searches */}
      <div className="search-section">
        <div className="search-section-header">
          <div className="search-section-title">
            <TrendingUp size={16} />
            <span>Trending</span>
          </div>
        </div>
        
        <div className="search-items">
          {trendingSearches.map((search, index) => (
            <button
              key={index}
              className="trending-item"
              onClick={() => onSearchSelect(search)}
            >
              <span>{search}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentSearches;
