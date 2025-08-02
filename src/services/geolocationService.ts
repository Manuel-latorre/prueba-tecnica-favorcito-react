import { type WeatherLocation } from "@/types/weather.types";
import { getCurrentWeather } from "./currentWeatherService";
import { getForecast } from "./forecastService";
import { reverseGeocoding, reverseGeocodingNominatim } from "./geocodingService";
import type { GeolocationPosition } from "@/types/geolocation.types";


export async function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocalización no está soportada en este navegador"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error("Permiso de ubicación denegado"));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error("Información de ubicación no disponible"));
            break;
          case error.TIMEOUT:
            reject(new Error("Tiempo de espera agotado para obtener ubicación"));
            break;
          default:
            reject(new Error("Error desconocido al obtener ubicación"));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  });
}

export async function getWeatherByCoordinates(
  latitude: number,
  longitude: number
): Promise<{
  location: WeatherLocation;
  currentWeather: any;
  forecast: any;
}> {
  try {
    // Intentar obtener información de la ubicación usando reverse geocoding
    let location: WeatherLocation;
    
    try {
      // Primero intentar con Nominatim (permite CORS)
      location = await reverseGeocodingNominatim(latitude, longitude);
    } catch (nominatimError) {
      console.warn("Nominatim falló, intentando con Open-Meteo:", nominatimError);
      
      try {
        // Fallback a Open-Meteo
        location = await reverseGeocoding(latitude, longitude);
      } catch (reverseGeocodingError) {
        console.warn("No se pudo obtener el nombre de la ciudad, usando ubicación genérica:", reverseGeocodingError);
        
        // Fallback final: crear un objeto de ubicación genérico
        location = {
          id: 0,
          name: "Tu ubicación actual",
          latitude,
          longitude,
          country: "Local",
          admin1: "",
          admin2: "",
          admin3: "",
        };
      }
    }

    // Obtener clima actual y pronóstico en paralelo
    const [currentWeather, forecast] = await Promise.all([
      getCurrentWeather(latitude, longitude),
      getForecast(latitude, longitude),
    ]);

    return {
      location,
      currentWeather,
      forecast,
    };
  } catch (error) {
    console.error("Error obteniendo clima por coordenadas:", error);
    throw error;
  }
} 