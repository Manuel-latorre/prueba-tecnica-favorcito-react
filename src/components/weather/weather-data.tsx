import type { OpenMeteoCurrentResponse, OpenMeteoForecastResponse } from "@/types/weather.types";
import { CurrentWeather } from "./current-weather";
import { WeatherForecast } from "./weather-forecast";

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