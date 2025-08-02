import { useState, useCallback } from 'react';
import { geocoding } from '@/services/geocodingService';
import { getCurrentWeather } from '@/services/currentWeatherService';
import { getForecast } from '@/services/forecastService';
import type { WeatherLocation, OpenMeteoCurrentResponse, OpenMeteoForecastResponse } from '@/types/weather.types';

interface WeatherData {
  location: WeatherLocation | null;
  currentWeather: OpenMeteoCurrentResponse | null;
  forecast: OpenMeteoForecastResponse | null;
}

interface UseWeatherReturn {
  data: WeatherData;
  loading: boolean;
  error: string | null;
  searchWeather: (city: string) => Promise<void>;
  reset: () => void;
}

export function useWeather(): UseWeatherReturn {
  const [data, setData] = useState<WeatherData>({
    location: null,
    currentWeather: null,
    forecast: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchWeather = useCallback(async (city: string) => {
    if (!city.trim()) {
      setError('Por favor ingresa una ciudad');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Get location data
      const location = await geocoding(city);
      
      // Step 2: Get current weather and forecast in parallel
      const [currentWeather, forecast] = await Promise.all([
        getCurrentWeather(location.latitude, location.longitude),
        getForecast(location.latitude, location.longitude),
      ]);

      setData({
        location,
        currentWeather,
        forecast,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      setData({
        location: null,
        currentWeather: null,
        forecast: null,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData({
      location: null,
      currentWeather: null,
      forecast: null,
    });
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    searchWeather,
    reset,
  };
} 