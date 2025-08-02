import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WeatherState } from '@/types/store.types';
import { MAX_SEARCH_HISTORY } from '@/config/api.config';

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      // Initial state
      location: null,
      currentWeather: null,
      forecast: null,
      loading: false,
      error: null,
      lastSearchedCity: null,
      searchHistory: [],

      // Basic setters
      setLocation: (location) => set({ location }),
      setCurrentWeather: (currentWeather) => set({ currentWeather }),
      setForecast: (forecast) => set({ forecast }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setLastSearchedCity: (lastSearchedCity) => set({ lastSearchedCity }),

      // Search history actions
      addToSearchHistory: (city) => {
        const { searchHistory } = get();
        const normalizedCity = city.trim().toLowerCase();
        
        // Remove if already exists
        const filteredHistory = searchHistory.filter(c => c.toLowerCase() !== normalizedCity);
        
        // Add to beginning and limit size
        const newHistory = [city, ...filteredHistory].slice(0, MAX_SEARCH_HISTORY);
        
        set({ searchHistory: newHistory });
      },

      clearSearchHistory: () => set({ searchHistory: [] }),

      // Reset all state
      reset: () => set({
        location: null,
        currentWeather: null,
        forecast: null,
        loading: false,
        error: null,
      }),

      // Complex actions
      searchWeather: async (city) => {
        const { setLoading, setError, setLocation, setCurrentWeather, setForecast, addToSearchHistory, setLastSearchedCity } = get();

        if (!city.trim()) {
          setError('Por favor ingresa una ciudad');
          return;
        }

        setLoading(true);
        setError(null);

        try {
          // Import services dynamically to avoid circular dependencies
          const { geocoding } = await import('@/services/geocodingService');
          const { getCurrentWeather } = await import('@/services/currentWeatherService');
          const { getForecast } = await import('@/services/forecastService');

          // Step 1: Get location data
          const location = await geocoding(city);
          
          // Step 2: Get current weather and forecast in parallel
          const [currentWeather, forecast] = await Promise.all([
            getCurrentWeather(location.latitude, location.longitude),
            getForecast(location.latitude, location.longitude),
          ]);

          // Update state
          setLocation(location);
          setCurrentWeather(currentWeather);
          setForecast(forecast);
          setLastSearchedCity(city);
          addToSearchHistory(city);

        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
          setError(errorMessage);
          setLocation(null);
          setCurrentWeather(null);
          setForecast(null);
        } finally {
          setLoading(false);
        }
      },

      searchWeatherByLocation: async () => {
        const { setLoading, setError, setLocation, setCurrentWeather, setForecast } = get();

        setLoading(true);
        setError(null);

        try {
          // Import services dynamically to avoid circular dependencies
          const { getCurrentPosition, getWeatherByCoordinates } = await import('@/services/geolocationService');

          // Step 1: Get current position
          const position = await getCurrentPosition();
          
          // Step 2: Get weather data by coordinates
          const { location, currentWeather, forecast } = await getWeatherByCoordinates(
            position.latitude,
            position.longitude
          );

          // Update state
          setLocation(location);
          setCurrentWeather(currentWeather);
          setForecast(forecast);

        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
          setError(errorMessage);
          setLocation(null);
          setCurrentWeather(null);
          setForecast(null);
        } finally {
          setLoading(false);
        }
      },
    }),
    {
      name: 'weather-storage',
      partialize: (state) => ({
        lastSearchedCity: state.lastSearchedCity,
        searchHistory: state.searchHistory,
      }),
    }
  )
); 