import React from 'react';
import { useSearch } from '../hooks/useSearch';
import { LocationData } from '../types/Weather';

interface SearchBarProps {
  onLocationSelect: (location: LocationData) => void;
  onSearch: (query: string) => Promise<LocationData[]>;
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelect, onSearch, isLoading }) => {
  const { 
    query, 
    suggestions, 
    isSearching, 
    showSuggestions,
    selectedIndex,
    inputRef,
    handleQueryChange,
    handleSelect,
    handleKeyDown,
    handleFocus,
    handleBlur,
    recentSearches
  } = useSearch({
    onSearch,
    onSelect: onLocationSelect
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && suggestions.length > 0) {
      handleSelect(suggestions[0]);
    }
  };

  const handleSuggestionClick = (location: LocationData) => {
    handleSelect(location);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Enter city name..."
            className="search-input"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={isLoading || !query.trim()}
          >
            {isLoading || isSearching ? (
              <div className="loading-spinner"></div>
            ) : (
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="21 21l-4.35-4.35"></path>
              </svg>
            )}
          </button>
        </div>
      </form>

      {/* Search suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-container">
          {suggestions.map((location, index) => (
            <button
              key={`${location.lat}-${location.lon}`}
              onClick={() => handleSuggestionClick(location)}
              className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
            >
              <div className="suggestion-main">
                <span className="suggestion-name">{location.name}</span>
                {location.state && <span className="suggestion-state">, {location.state}</span>}
                <span className="suggestion-country">, {location.country}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Recent searches */}
      {!showSuggestions && query.length === 0 && recentSearches.length > 0 && (
        <div className="recent-searches">
          <div className="recent-searches-header">Recent searches</div>
          <div className="suggestions-container">
            {recentSearches.map((location, index) => (
              <button
                key={`recent-${location.lat}-${location.lon}`}
                onClick={() => handleSuggestionClick(location)}
                className="suggestion-item recent-item"
              >
                <div className="suggestion-main">
                  <span className="suggestion-name">{location.name}</span>
                  {location.state && <span className="suggestion-state">, {location.state}</span>}
                  <span className="suggestion-country">, {location.country}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
