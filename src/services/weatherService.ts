import {
  type OpenMeteoCurrentResponse,
  type OpenMeteoForecastResponse,
} from "@/types/weather.types";
import { API_CONFIG } from "@/config/api.config";
import { fetchWithTimeout } from "@/utils/fetchUtils";


async function fetchWeatherData(
  lat: number,
  lon: number,
  params: string
): Promise<any> {
  try {
    const response = await fetchWithTimeout(
      `${API_CONFIG.BASE_URL}/forecast?latitude=${lat}&longitude=${lon}&${params}&timezone=auto`
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en petición a Open-Meteo:", error);
    throw error;
  }
}


export async function getCurrentWeather(
  lat: number,
  lon: number
): Promise<OpenMeteoCurrentResponse> {
  return fetchWeatherData(
    lat,
    lon,
    "current=temperature_2m,wind_speed_10m,weather_code"
  );
}


export async function getForecast(
  lat: number,
  lon: number
): Promise<OpenMeteoForecastResponse> {
  return fetchWeatherData(
    lat,
    lon,
    "daily=weather_code,temperature_2m_max,temperature_2m_min"
  );
}


export async function getWeatherData(
  lat: number,
  lon: number
): Promise<OpenMeteoCurrentResponse & OpenMeteoForecastResponse> {
  return fetchWeatherData(
    lat,
    lon,
    "current=temperature_2m,wind_speed_10m,weather_code&weather_code,temperature_2m_max,temperature_2m_min"
  );
} 