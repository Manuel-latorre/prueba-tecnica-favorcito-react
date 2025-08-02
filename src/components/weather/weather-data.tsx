import type { OpenMeteoCurrentResponse, OpenMeteoForecastResponse } from "@/types/weather.types";
import { CurrentWeather } from "@/components/weather/current-weather";
import { WeatherForecast } from "@/components/weather/weather-forecast";

export default function WeatherDataDisplay({
    currentWeather,
    forecast,
    cityName
  }: {
    currentWeather: OpenMeteoCurrentResponse;
    forecast: OpenMeteoForecastResponse;
    cityName: string;
  }) {
    return (
      <div className='flex flex-col gap-4 w-full justify-center items-center'>
        <CurrentWeather
          weather={currentWeather}
          cityName={cityName}
        />
        <WeatherForecast forecast={forecast} />
      </div>
    );
  }