import { useWeatherStore } from '@/store/weatherStore';
import { CitySearch, CurrentWeather, WeatherForecast, LoadingSpinner, ErrorMessage } from '@/components/index';
import { MapPin } from 'lucide-react';
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
    <div className="min-h-dvh flex flex-col items-center justify-center max-md:p-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6 w-full">
        <div className="flex justify-center">
          <CitySearch />
        </div>

        {loading && (
          <div className="flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        )}

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

        {isEmpty && (
          <div className="text-center space-y-4 py-12">
            <MapPin className="h-16 w-16 text-gray-300 mx-auto" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Obteniendo tu ubicación actual...
              </h3>
              <p className="text-gray-500 mt-1">
                Si no se puede obtener tu ubicación, busca una ciudad para ver el clima
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 