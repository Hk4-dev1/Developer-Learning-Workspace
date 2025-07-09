// hooks/useSearch.ts - Custom hook untuk search functionality

import { useState, useEffect, useCallback, useRef } from 'react';
import { LocationData } from '../types/Weather';

export interface UseSearchProps {
  onSearch: (query: string) => Promise<LocationData[]>;
  onSelect: (location: LocationData) => void;
  debounceMs?: number;
  minQueryLength?: number;
}

export const useSearch = ({
  onSearch,
  onSelect,
  debounceMs = 300,
  minQueryLength = 2,
}: UseSearchProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<LocationData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Clear search state
   */
  const clearSearch = useCallback(() => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    setIsSearching(false);
    
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
  }, []);

  /**
   * Handle search query change
   */
  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
    setSelectedIndex(-1);
    
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    // If query is too short, clear suggestions
    if (newQuery.length < minQueryLength) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsSearching(false);
      return;
    }
    
    // Set loading state
    setIsSearching(true);
    setShowSuggestions(true);
    
    // Debounce search
    debounceTimer.current = setTimeout(async () => {
      try {
        const results = await onSearch(newQuery);
        setSuggestions(results);
        setIsSearching(false);
      } catch (error) {
        console.error('Search failed:', error);
        setSuggestions([]);
        setIsSearching(false);
      }
    }, debounceMs);
  }, [onSearch, debounceMs, minQueryLength]);

  /**
   * Handle suggestion selection
   */
  const handleSelect = useCallback((location: LocationData) => {
    setQuery(location.name);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    onSelect(location);
  }, [onSelect]);

  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
        
      case 'Enter':
        event.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelect(suggestions[selectedIndex]);
        } else if (suggestions.length > 0) {
          handleSelect(suggestions[0]);
        }
        break;
        
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  }, [showSuggestions, suggestions, selectedIndex, handleSelect]);

  /**
   * Handle input focus
   */
  const handleFocus = useCallback(() => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  }, [suggestions.length]);

  /**
   * Handle input blur
   */
  const handleBlur = useCallback(() => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }, 200);
  }, []);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  /**
   * Handle recent searches (could be enhanced with localStorage)
   */
  const [recentSearches, setRecentSearches] = useState<LocationData[]>([]);

  const addToRecentSearches = useCallback((location: LocationData) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item.name !== location.name);
      return [location, ...filtered].slice(0, 5); // Keep only 5 recent searches
    });
  }, []);

  // Enhanced select handler that adds to recent searches
  const enhancedSelect = useCallback((location: LocationData) => {
    handleSelect(location);
    addToRecentSearches(location);
  }, [handleSelect, addToRecentSearches]);

  return {
    // State
    query,
    suggestions,
    isSearching,
    showSuggestions,
    selectedIndex,
    recentSearches,
    
    // Refs
    inputRef,
    
    // Handlers
    handleQueryChange,
    handleSelect: enhancedSelect,
    handleKeyDown,
    handleFocus,
    handleBlur,
    clearSearch,
    
    // Utilities
    hasResults: suggestions.length > 0,
    isEmpty: query.length === 0,
    isValidQuery: query.length >= minQueryLength,
  };
};
