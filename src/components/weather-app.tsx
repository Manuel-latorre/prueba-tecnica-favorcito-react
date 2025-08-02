import { useWeatherStore } from '@/store/weatherStore';
import { CitySearch, CurrentWeather, WeatherForecast, ErrorMessage } from '@/components/index';
import { useEffect } from 'react';



export function WeatherApp() {
  
  const {
    location,
    currentWeather,
    forecast,
    loading,
    error,
    searchWeatherByLocation,
  } = useWeatherStore();

  // Computed values
  const hasData = location && currentWeather && forecast;
  const isEmpty = !location && !loading && !error && !hasData;

  // Cargar ubicación actual al montar el componente
  useEffect(() => {
    // Solo cargar si no hay datos, no está cargando y no hay error
    if (isEmpty && !loading && !error) {
      searchWeatherByLocation().catch(() => {
        // Si falla la geolocalización, no mostrar error, solo dejar que el usuario busque manualmente
        console.log('No se pudo obtener la ubicación actual');
      });
    }
  }, [isEmpty, loading, error, searchWeatherByLocation]); // Dependencias para evitar re-ejecuciones innecesarias

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center max-md:p-4 py-10">
      <div className="max-w-4xl mx-auto space-y-6 w-full">
        <div className="flex justify-center">
          <CitySearch />
        </div>

        {error && (
          <div className="max-w-md mx-auto flex justify-center">
            <ErrorMessage message={error} />
          </div>
        )}

        {hasData && !loading && (
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