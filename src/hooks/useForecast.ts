import { useState, useCallback } from 'react';
import { getForecast } from '@/services/forecastService';
import type { OpenMeteoForecastResponse } from '@/types/weather.types';

interface UseForecastReturn {
  forecast: OpenMeteoForecastResponse | null;
  loading: boolean;
  error: string | null;
  fetchForecast: (lat: number, lon: number) => Promise<void>;
  reset: () => void;
}

export function useForecast(): UseForecastReturn {
  const [forecast, setForecast] = useState<OpenMeteoForecastResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchForecast = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getForecast(lat, lon);
      setForecast(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setForecast(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    forecast,
    loading,
    error,
    fetchForecast,
    reset,
  };
} 