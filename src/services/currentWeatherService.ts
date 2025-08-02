import {
  type OpenMeteoCurrentResponse,
} from "@/types/weather.types";
import { API_CONFIG } from "@/config/api.config";
import { fetchWithTimeout } from "@/utils/fetchUtils";


export async function getCurrentWeather(
  lat: number,
  lon: number
): Promise<OpenMeteoCurrentResponse> {
  try {
    const response = await fetchWithTimeout(
      `${API_CONFIG.BASE_URL}/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto`
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error obteniendo clima actual:", error);
    throw error;
  }
} 