import { useState, useCallback } from 'react';
import { getCurrentWeather } from '@/services/currentWeatherService';
import type { OpenMeteoCurrentResponse, UseCurrentWeatherReturn } from '@/types/weather.types';



export function useCurrentWeather(): UseCurrentWeatherReturn {
  const [weather, setWeather] = useState<OpenMeteoCurrentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentWeather = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getCurrentWeather(lat, lon);
      setWeather(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setWeather(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    weather,
    loading,
    error,
    fetchCurrentWeather,
    reset,
  };
} 