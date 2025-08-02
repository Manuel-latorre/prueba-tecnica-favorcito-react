import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Thermometer, Wind } from 'lucide-react';
import type { CurrentWeatherProps } from '@/types/weather.types';
import { getWeatherInfo } from '@/utils/weatherCodes';



export function CurrentWeather({ weather, cityName }: CurrentWeatherProps) {
  const { current } = weather;
  const weatherInfo = getWeatherInfo(current.weather_code);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
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
          <Badge variant="secondary" className="text-xs">
            {new Date(current.time).toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{current.wind_speed_10m} km/h</p>
              <p className="text-xs text-muted-foreground">Viento</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{current.temperature_2m}°C</p>
              <p className="text-xs text-muted-foreground">Temperatura</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 