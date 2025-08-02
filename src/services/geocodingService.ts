import {
  type WeatherLocation,
  type OpenMeteoGeocodingResponse,
} from "@/types/weather.types";
import { API_CONFIG } from "@/config/api.config";
import { fetchWithTimeout } from "@/utils/fetchUtils";


export async function geocoding(city: string): Promise<WeatherLocation> {
  try {
    const response = await fetchWithTimeout(
      `${API_CONFIG.GEOCODING_URL}/search?name=${encodeURIComponent(
        city
      )}&count=1&language=es&format=json`
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data: OpenMeteoGeocodingResponse = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error("Ciudad no encontrada");
    }

    return data.results[0];
  } catch (error) {
    console.error("Error en geocoding:", error);
    throw error;
  }
} 