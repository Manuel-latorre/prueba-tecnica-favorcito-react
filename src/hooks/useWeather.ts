import { useWeatherStore } from "@/store/weatherStore";
import { useCallback, useEffect, useState } from "react";

export function useWeatherInitialization() {
    const [isInitialized, setIsInitialized] = useState(false);
  
    const {
      location,
      currentWeather,
      forecast,
      loading,
      error,
      lastSearchedCity,
      searchWeatherByLocation,
      searchWeather,
    } = useWeatherStore();
  
    const hasData = location && currentWeather && forecast;
    const shouldAutoLoad = !hasData && !loading && !error;
  
    const initializeWeather = useCallback(async () => {
      if (isInitialized) return;
  
      // Case 1: Data already exists
      if (hasData) {
        setIsInitialized(true);
        return;
      }
  
      // Case 2: Restore last searched city
      if (lastSearchedCity && shouldAutoLoad) {
        try {
          await searchWeather(lastSearchedCity);
        } catch {
          console.log('No se pudo restaurar el clima de la última ciudad');
        }
        setIsInitialized(true);
        return;
      }
  
      // Case 3: Error exists, just initialize
      if (error) {
        setIsInitialized(true);
        return;
      }
  
      // Case 4: Try to get current location
      if (shouldAutoLoad) {
        try {
          await searchWeatherByLocation();
        } catch {
          console.log('No se pudo obtener la ubicación actual');
        }
      }
  
      setIsInitialized(true);
    }, [
      isInitialized,
      hasData,
      lastSearchedCity,
      loading,
      error,
      shouldAutoLoad,
      searchWeather,
      searchWeatherByLocation
    ]);
  
    useEffect(() => {
      initializeWeather();
    }, [initializeWeather]);
  
    return { hasData, loading, error };
  }