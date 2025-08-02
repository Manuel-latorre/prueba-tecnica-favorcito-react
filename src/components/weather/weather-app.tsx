import { useWeatherStore } from '@/store/weatherStore';
import {
  CitySearch,
  ErrorMessage,
  CurrentWeatherSkeleton,
  WeatherForecastSkeleton,
  CitySearchSkeleton
} from '@/components/index';
import WeatherDataDisplay from './weather-data';
import { useWeatherInitialization } from '@/hooks/useWeather';


export function WeatherApp() {
  const { hasData, loading, error } = useWeatherInitialization();

  const {
    location,
    currentWeather,
    forecast,
  } = useWeatherStore();

  return (
    <div className="app-layout">
      <div className="main-container">
        <div className="flex justify-center">
          {loading ? <CitySearchSkeleton /> : <CitySearch />}
        </div>

        {error && (
          <div className="max-w-md mx-auto flex justify-center mb-4">
            <ErrorMessage message={error} />
          </div>
        )}

        {loading ? (
          <div className='weather-data-layout'>
            <CurrentWeatherSkeleton />
            <WeatherForecastSkeleton />
          </div>
        ) : hasData && (
          <WeatherDataDisplay
            currentWeather={currentWeather!}
            forecast={forecast!}
            cityName={location!.name}
          />
        )}
      </div>
    </div>
  );
} 