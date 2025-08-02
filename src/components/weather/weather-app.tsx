import { useWeatherStore } from '@/store/weatherStore';
import {
  CitySearch,
  ErrorMessage,
  CurrentWeatherSkeleton,
  WeatherForecastSkeleton,
  CitySearchSkeleton
} from '@/components/index';
import WeatherDataDisplay from '@/components/weather/weather-data';
import { useWeatherInitialization } from '@/hooks/useWeather';


export function WeatherApp() {
  const { hasData, loading, error } = useWeatherInitialization();

  const {
    location,
    currentWeather,
    forecast,
  } = useWeatherStore();

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center max-md:p-4 py-10">
      <div className="max-w-md w-full flex flex-col gap-4">
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