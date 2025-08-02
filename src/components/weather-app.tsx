import { useWeatherStore } from '@/store/weatherStore';
import { 
  CitySearch, 
  CurrentWeather, 
  WeatherForecast, 
  ErrorMessage,
  CurrentWeatherSkeleton,
  WeatherForecastSkeleton,
  CitySearchSkeleton
} from '@/components/index';
import { useEffect, useState } from 'react';

export function WeatherApp() {
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

  // Computed values
  const hasData = location && currentWeather && forecast;
  const isEmpty = !location && !loading && !error && !hasData;

  // Cargar datos al montar el componente
  useEffect(() => {
    if (isInitialized) return;
    
    // Si hay datos persistidos, no hacer nada (ya están cargados)
    if (hasData) {
      setIsInitialized(true);
      return;
    }

    // Si hay una última ciudad buscada pero no hay datos, restaurarla
    // Solo intentar restaurar si no hay error persistido
    if (lastSearchedCity && !hasData && !loading && !error) {
      searchWeather(lastSearchedCity).catch(() => {
        console.log('No se pudo restaurar el clima de la última ciudad');
      });
      setIsInitialized(true);
      return;
    }

    // Si hay un error persistido, solo inicializar sin hacer nada más
    if (error) {
      setIsInitialized(true);
      return;
    }

    // Solo cargar ubicación automática si no hay datos persistidos, no está cargando y no hay error
    if (isEmpty && !loading && !error) {
      searchWeatherByLocation().catch(() => {
        // Si falla la geolocalización, no mostrar error, solo dejar que el usuario busque manualmente
        console.log('No se pudo obtener la ubicación actual');
      });
    }
    
    setIsInitialized(true);
  }, [isInitialized, hasData, lastSearchedCity, loading, error, isEmpty, searchWeather, searchWeatherByLocation]);

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center max-md:p-4 py-10">
      <div className="max-w-4xl mx-auto space-y-6 w-full">
        <div className="flex justify-center">
          {loading ? <CitySearchSkeleton /> : <CitySearch />}
        </div>

        {error && (
          <div className="max-w-md mx-auto flex justify-center mb-4">
            <ErrorMessage message={error} />
          </div>
        )}

        {loading ? (
          <div className='flex flex-col gap-4 w-full justify-center items-center'>
            <CurrentWeatherSkeleton />
            <WeatherForecastSkeleton />
          </div>
        ) : hasData && (
          <div className='flex flex-col gap-4 w-full justify-center items-center'>
            <CurrentWeather
              weather={currentWeather!}
              cityName={location!.name}
            />
            <WeatherForecast forecast={forecast!} />
          </div>
        )}
      </div>
    </div>
  );
} 