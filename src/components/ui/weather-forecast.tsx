import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ThermometerSun, ThermometerSnowflake } from 'lucide-react';
import type { OpenMeteoForecastResponse } from '@/types/weather.types';

interface WeatherForecastProps {
  forecast: OpenMeteoForecastResponse;
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

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export function WeatherForecast({ forecast }: WeatherForecastProps) {
  const { daily } = forecast;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Pronóstico 7 días
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {daily.time.map((date, index) => {
            const weatherInfo = getWeatherInfo(daily.weather_code[index]);
            const maxTemp = daily.temperature_2m_max[index];
            const minTemp = daily.temperature_2m_min[index];

            return (
              <div
                key={date}
                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{weatherInfo.icon}</span>
                  <div>
                    <p className="font-medium">{formatDate(date)}</p>
                    <p className="text-sm text-muted-foreground">{weatherInfo.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <ThermometerSun className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">{maxTemp}°</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThermometerSnowflake className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">{minTemp}°</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
} 