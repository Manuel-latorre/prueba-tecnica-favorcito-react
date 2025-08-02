import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Wind } from 'lucide-react';
import type { CurrentWeatherProps } from '@/types/weather.types';
import { getWeatherInfo } from '@/utils/weatherCodes';
import { formatDate } from '@/utils/functions';



export function CurrentWeather({ weather, cityName }: CurrentWeatherProps) {
  const { current } = weather;
  const weatherInfo = getWeatherInfo(current.weather_code);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          {cityName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{weatherInfo.icon}</span>
            <div>
              <p className="text-2xl font-bold">{current.temperature_2m}°C</p>
              <p className="text-sm text-muted-foreground">{weatherInfo.description}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{current.wind_speed_10m} km/h</p>
              <p className="text-xs text-muted-foreground">Viento</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">{formatDate(current.time)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 