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

      // Complex actions
      searchWeather: async (city) => {
        if (!city.trim()) {
          set({ error: 'Por favor ingresa una ciudad' });
          return;
        }

        set({ loading: true, error: null });

        try {
          
          const { geocoding } = await import('@/services/geocodingService');
          const { getCurrentWeather, getForecast } = await import('@/services/weatherService');

          
          const location = await geocoding(city);
          
          
          const [currentWeather, forecast] = await Promise.all([
            getCurrentWeather(location.latitude, location.longitude),
            getForecast(location.latitude, location.longitude),
          ]);

          // Update state
          set({
            location,
            currentWeather,
            forecast,
            lastSearchedCity: city,
            loading: false,
            error: null,
          });

          
          get().addToSearchHistory(city);

        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
          set({
            error: errorMessage,
            location: null,
            currentWeather: null,
            forecast: null,
            loading: false,
          });
        }
      },

      searchWeatherByLocation: async () => {
        set({ loading: true, error: null });

        try {
         
          const { getCurrentPosition, getWeatherByCoordinates } = await import('@/services/geolocationService');

          
          const position = await getCurrentPosition();
          
          
          const { location, currentWeather, forecast } = await getWeatherByCoordinates(
            position.latitude,
            position.longitude
          );

          // Update state
          set({
            location,
            currentWeather,
            forecast,
            loading: false,
            error: null,
          });

        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
          set({
            error: errorMessage,
            location: null,
            currentWeather: null,
            forecast: null,
            loading: false,
          });
        }
      },
    }),
    {
      name: 'weather-storage',
      partialize: (state) => ({
        lastSearchedCity: state.lastSearchedCity,
        searchHistory: state.searchHistory,
        location: state.location,
        currentWeather: state.currentWeather,
        forecast: state.forecast,
        error: state.error,
      }),
    }
  )
); 