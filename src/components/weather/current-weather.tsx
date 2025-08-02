import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Wind } from 'lucide-react';
import type { CurrentWeatherProps } from '@/types/weather.types';
import { getWeatherInfo } from '@/utils/weatherCodes';
import { formatDateTime } from '@/utils/functions';



export function CurrentWeather({ weather, cityName }: CurrentWeatherProps) {
  const { current } = weather;
  const weatherInfo = getWeatherInfo(current.weather_code);

  return (
    <Card className="card-max-width">
      <CardHeader className="">
        <CardTitle className="flex-center-gap-2 text-lg">
          <MapPin className="icon-muted-md" />
          {cityName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex-between">
          <div className="flex-center-gap-2">
            <span className="text-3xl">{weatherInfo.icon}</span>
            <div>
              <p className="text-2xl font-bold">{current.temperature_2m}°C</p>
              <p className="text-muted-sm">{weatherInfo.description}</p>
            </div>
          </div>
        </div>

        <div className="flex-between">
          <div className="flex-center-gap-2">
            <Wind className="icon-muted-sm" />
            <div>
              <p className="text-sm font-medium">{current.wind_speed_10m} km/h</p>
              <p className="text-muted-xs">Viento</p>
            </div>
          </div>

          <div className="flex-center-gap-2">
            <p className="text-sm font-medium">{formatDateTime(current.time)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 