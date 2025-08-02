import { useWeatherStore } from '@/store/weatherStore';
import { SearchForm } from '@/components/ui/search-form';
import { CurrentWeather } from '@/components/ui/current-weather';
import { WeatherForecast } from '@/components/ui/weather-forecast';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ErrorMessage } from '@/components/ui/error-message';
import { SearchHistory } from '@/components/ui/search-history';
import { Cloud, MapPin } from 'lucide-react';

export function WeatherApp() {
  const {
    location,
    currentWeather,
    forecast,
    loading,
    error,
    searchHistory,
    searchWeather,
    reset,
    clearSearchHistory,
  } = useWeatherStore();

  // Computed values
  const hasData = location && currentWeather && forecast;
  const isEmpty = !location && !loading && !error;

  const handleSearch = async (city: string) => {
    await searchWeather(city);
  };

  const handleRetry = () => {
    if (location) {
      searchWeather(location.name);
    }
  };

  const handleReset = () => {
    reset();
  };

  const handleClearHistory = () => {
    clearSearchHistory();
  };

  return (
    <div className="h-dvh flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto space-y-6 w-full">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Cloud className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Clima App</h1>
          </div>
          <p className="text-gray-600">Busca el clima de cualquier ciudad del mundo</p>
        </div>

        {/* Search Form */}
        <div className="flex justify-center">
          <SearchForm 
            onSearch={handleSearch} 
            loading={loading}
            placeholder="Ej: Madrid, Barcelona, Londres..."
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center">
            <LoadingSpinner 
              size="lg" 
              text="Obteniendo información del clima..." 
            />
          </div>
        )}

        {/* Search History */}
        {!loading && !error && searchHistory.length > 0 && (
          <div className="flex justify-center">
            <SearchHistory
              history={searchHistory}
              onSelectCity={handleSearch}
              onClearHistory={handleClearHistory}
              loading={loading}
            />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-md mx-auto">
            <ErrorMessage 
              message={error} 
              onRetry={handleRetry}
            />
          </div>
        )}

        {/* Weather Data */}
        {hasData && !loading && (
          <div className="space-y-6">
            {/* Current Weather */}
            <div className="flex justify-center">
              <CurrentWeather 
                weather={currentWeather!}
                cityName={location!.name}
              />
            </div>

            {/* Forecast */}
            <div className="max-w-2xl mx-auto">
              <WeatherForecast forecast={forecast!} />
            </div>

            {/* Reset Button */}
            <div className="flex justify-center">
              <button
                onClick={handleReset}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Buscar otra ciudad
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {isEmpty && (
          <div className="text-center space-y-4 py-12">
            <MapPin className="h-16 w-16 text-gray-300 mx-auto" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Busca una ciudad
              </h3>
              <p className="text-gray-500 mt-1">
                Ingresa el nombre de una ciudad para ver el clima actual y el pronóstico
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 