import { useState, useRef, useEffect, useCallback } from 'react';
import { useWeatherStore } from '@/store/weatherStore';
import type { CitySuggestion } from '@/types/weather.types';

export const useCitySearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const { searchHistory, addToSearchHistory, searchWeather } = useWeatherStore();

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim().length >= 2) {
        searchCities(query.trim());
      } else {
        setSuggestions([]);
        setSearchError(null);
      }
    }, 700);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const searchCities = async (searchTerm: string) => {
    if (searchTerm.length < 2) return;
    setIsSearching(true);
    setSearchError(null);
    try {
      const { geocodingSuggestions } = await import('@/services/geocodingService');
      const results = await geocodingSuggestions(searchTerm);
      // Transform results to match CitySuggestion interface
      const suggestions = results.map((result: any) => ({
        id: `${result.latitude}-${result.longitude}`,
        name: result.name,
        admin1: result.admin1,
        country: result.country,
        latitude: result.latitude,
        longitude: result.longitude,
      }));
      setSuggestions(suggestions);
      if (suggestions.length === 0) {
        setSearchError('Ciudad no encontrada');
      } else {
        setSearchError(null);
      }
    } catch (error) {
      setSearchError('Error buscando ciudades');
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = useCallback((value: string) => {
    setQuery(value);
    if (value.trim().length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
      setSearchError(null);
    }
  }, []);

  const handleInputFocus = useCallback(() => {
    if (query.trim().length > 0 || searchHistory.length > 0) {
      setShowSuggestions(true);
    }
  }, [query, searchHistory]);

  const handleCitySelect = useCallback(async (city: CitySuggestion) => {
    setQuery(city.name);
    setShowSuggestions(false);
    setSuggestions([]);
    setSearchError(null);
    // Add to search history and search
    addToSearchHistory(city.name);
    await searchWeather(city.name);
  }, [addToSearchHistory, searchWeather]);

  const handleHistorySelect = useCallback(async (cityName: string) => {
    setQuery(cityName);
    setShowSuggestions(false);
    setSearchError(null);
    await searchWeather(cityName);
  }, [searchWeather]);

  return {
    query,
    suggestions,
    showSuggestions,
    isSearching,
    searchHistory,
    handleInputChange,
    handleInputFocus,
    handleCitySelect,
    handleHistorySelect,
    searchRef,
    searchError,
  };
}; 