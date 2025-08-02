import type { OpenMeteoForecastResponse, OpenMeteoCurrentResponse, WeatherLocation } from "@/types/weather.types";

export interface WeatherState {
    // State
    location: WeatherLocation | null;
    currentWeather: OpenMeteoCurrentResponse | null;
    forecast: OpenMeteoForecastResponse | null;
    loading: boolean;
    error: string | null;
    lastSearchedCity: string | null;
    searchHistory: string[];
  
    // Actions
    setLocation: (location: WeatherLocation | null) => void;
    setCurrentWeather: (weather: OpenMeteoCurrentResponse | null) => void;
    setForecast: (forecast: OpenMeteoForecastResponse | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setLastSearchedCity: (city: string | null) => void;
    addToSearchHistory: (city: string) => void;
    clearSearchHistory: () => void;
    reset: () => void;
    
    // Computed actions
    searchWeather: (city: string) => Promise<void>;
    searchWeatherByLocation: () => Promise<void>;
  }