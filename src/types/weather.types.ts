export interface WeatherLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
}

export interface OpenMeteoGeocodingResponse {
  results: WeatherLocation[];
  generationtime_ms: number;
}

export interface OpenMeteoCurrentResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
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

export interface OpenMeteoForecastResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
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

export interface CurrentWeatherProps {
  weather: OpenMeteoCurrentResponse;
  cityName: string;
}

export interface WeatherForecastProps {
  forecast: OpenMeteoForecastResponse;
}

export interface CitySuggestion {
  id: string;
  name: string;
  admin1?: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface WeatherData {
  location: WeatherLocation | null;
  currentWeather: OpenMeteoCurrentResponse | null;
  forecast: OpenMeteoForecastResponse | null;
}