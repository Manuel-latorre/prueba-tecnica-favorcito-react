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

export async function geocodingSuggestions(city: string): Promise<WeatherLocation[]> {
  try {
    const response = await fetchWithTimeout(
      `${API_CONFIG.GEOCODING_URL}/search?name=${encodeURIComponent(
        city
      )}&count=5&language=es&format=json`
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data: OpenMeteoGeocodingResponse = await response.json();

    if (!data.results || data.results.length === 0) {
      return [];
    }

    return data.results;
  } catch (error) {
    console.error("Error en geocoding suggestions:", error);
    return [];
  }
}

export async function reverseGeocoding(latitude: number, longitude: number): Promise<WeatherLocation> {
  try {
    const response = await fetchWithTimeout(
      `${API_CONFIG.GEOCODING_URL}/reverse?latitude=${latitude}&longitude=${longitude}&language=es&format=json`
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data: OpenMeteoGeocodingResponse = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error("No se pudo obtener información de la ubicación");
    }

    return data.results[0];
  } catch (error) {
    console.error("Error en reverse geocoding:", error);
    throw error;
  }
}

// Función alternativa usando Nominatim (OpenStreetMap) que permite CORS
export async function reverseGeocodingNominatim(latitude: number, longitude: number): Promise<WeatherLocation> {
  try {
    const response = await fetchWithTimeout(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=es&addressdetails=1`
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (!data) {
      throw new Error("No se pudo obtener información de la ubicación");
    }

    // Debug: mostrar la respuesta de Nominatim
    console.log("Nominatim response:", data);

    // Función para obtener el mejor nombre de la ubicación
    const getLocationName = (data: any): string => {
      const address = data.address || {};
      
      // Prioridad: city > town > village > suburb > name > display_name
      if (address.city) return address.city;
      if (address.town) return address.town;
      if (address.village) return address.village;
      if (address.suburb) return address.suburb;
      
      // Si name es un número o no es útil, usar display_name
      if (data.name) {
        const nameStr = String(data.name);
        // Verificar si es un número o un ID
        if (!isNaN(Number(nameStr)) || nameStr.length < 3) {
          // Usar display_name en su lugar
          const displayParts = data.display_name?.split(',') || [];
          // Buscar la primera parte que no sea un número
          for (const part of displayParts) {
            const trimmed = part.trim();
            if (trimmed && isNaN(Number(trimmed)) && trimmed.length > 2) {
              return trimmed;
            }
          }
        } else {
          return nameStr;
        }
      }
      
      // Fallback: usar la primera parte útil del display_name
      const displayParts = data.display_name?.split(',') || [];
      for (const part of displayParts) {
        const trimmed = part.trim();
        if (trimmed && isNaN(Number(trimmed)) && trimmed.length > 2) {
          return trimmed;
        }
      }
      
      return "Ubicación actual";
    };

    // Mapear la respuesta de Nominatim al formato WeatherLocation
    const location: WeatherLocation = {
      id: 0,
      name: getLocationName(data),
      latitude: parseFloat(data.lat),
      longitude: parseFloat(data.lon),
      country: data.address?.country || "",
      admin1: data.address?.state || data.address?.province || "",
      admin2: data.address?.city || data.address?.town || data.address?.village || "",
      admin3: data.address?.suburb || "",
    };

    return location;
  } catch (error) {
    console.error("Error en reverse geocoding Nominatim:", error);
    throw error;
  }
} 