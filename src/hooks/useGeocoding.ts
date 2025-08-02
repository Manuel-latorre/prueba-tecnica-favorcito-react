import { useState, useCallback } from 'react';
import { geocoding } from '@/services/geocodingService';
import type { WeatherLocation } from '@/types/weather.types';

interface UseGeocodingReturn {
  location: WeatherLocation | null;
  loading: boolean;
  error: string | null;
  searchLocation: (city: string) => Promise<void>;
  reset: () => void;
}

export function useGeocoding(): UseGeocodingReturn {
  const [location, setLocation] = useState<WeatherLocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchLocation = useCallback(async (city: string) => {
    if (!city.trim()) {
      setError('Por favor ingresa una ciudad');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await geocoding(city);
      setLocation(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      setLocation(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLocation(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    location,
    loading,
    error,
    searchLocation,
    reset,
  };
} 