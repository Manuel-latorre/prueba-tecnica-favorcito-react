// Base types for coordinates
export interface Coordinates {
  latitude: number;
  longitude: number;
}

// Base type for OpenMeteo API responses
export interface OpenMeteoBaseResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
}

// Location types
export interface WeatherLocation extends Coordinates {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
}

export interface CitySuggestion extends Coordinates {
  id: string;
  name: string;
  admin1?: string;
  country: string;
}

// API Response types
export interface OpenMeteoGeocodingResponse {
  results: WeatherLocation[];
  generationtime_ms: number;
}

export interface OpenMeteoCurrentResponse extends OpenMeteoBaseResponse {
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    wind_speed_10m: string;
    weather_code: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
}

export interface OpenMeteoForecastResponse extends OpenMeteoBaseResponse {
  daily_units: {
    time: string;
    weather_code: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

// Component Props
export interface CurrentWeatherProps {
  weather: OpenMeteoCurrentResponse;
  cityName: string;
}

export interface WeatherForecastProps {
  forecast: OpenMeteoForecastResponse;
}

// Data aggregation
export interface WeatherData {
  location: WeatherLocation | null;
  currentWeather: OpenMeteoCurrentResponse | null;
  forecast: OpenMeteoForecastResponse | null;
}