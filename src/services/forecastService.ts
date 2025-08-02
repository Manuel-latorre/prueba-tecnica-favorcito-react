import {
  type OpenMeteoForecastResponse,
} from "@/types/weather.types";
import { API_CONFIG } from "@/config/api.config";
import { fetchWithTimeout } from "@/utils/fetchUtils";

export async function getForecast(
  lat: number,
  lon: number
): Promise<OpenMeteoForecastResponse> {
  try {
    const response = await fetchWithTimeout(
      `${API_CONFIG.BASE_URL}/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error obteniendo pronóstico:", error);
    throw error;
  }
} 