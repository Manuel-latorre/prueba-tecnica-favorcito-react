import type { WeatherLocation } from "./weather.types";

export interface GeolocationPosition {
    latitude: number;
    longitude: number;
}

export interface UseGeocodingReturn {
    location: WeatherLocation | null;
    loading: boolean;
    error: string | null;
    searchLocation: (city: string) => Promise<void>;
    reset: () => void;
  }