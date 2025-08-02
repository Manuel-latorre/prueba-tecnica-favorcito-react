import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Thermometer, Wind, Cloud } from 'lucide-react';
import type { OpenMeteoCurrentResponse } from '@/types/weather.types';

interface CurrentWeatherProps {
  weather: OpenMeteoCurrentResponse;
  cityName: string;
}

// Weather code mapping to descriptions and icons
const weatherCodes: Record<number, { description: string; icon: string }> = {
  0: { description: 'Despejado', icon: '☀️' },
  1: { description: 'Mayormente despejado', icon: '🌤️' },
  2: { description: 'Parcialmente nublado', icon: '⛅' },
  3: { description: 'Nublado', icon: '☁️' },
  45: { description: 'Niebla', icon: '🌫️' },
  48: { description: 'Niebla con escarcha', icon: '🌫️' },
  51: { description: 'Llovizna ligera', icon: '🌦️' },
  53: { description: 'Llovizna moderada', icon: '🌧️' },
  55: { description: 'Llovizna intensa', icon: '🌧️' },
  61: { description: 'Lluvia ligera', icon: '🌧️' },
  63: { description: 'Lluvia moderada', icon: '🌧️' },
  65: { description: 'Lluvia intensa', icon: '🌧️' },
  71: { description: 'Nieve ligera', icon: '🌨️' },
  73: { description: 'Nieve moderada', icon: '🌨️' },
  75: { description: 'Nieve intensa', icon: '🌨️' },
  95: { description: 'Tormenta', icon: '⛈️' },
};

function getWeatherInfo(code: number) {
  return weatherCodes[code] || { description: 'Desconocido', icon: '❓' };
}

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