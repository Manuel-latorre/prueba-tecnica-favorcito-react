import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ThermometerSun, ThermometerSnowflake } from 'lucide-react';
import { getWeatherInfo } from '@/utils/weatherCodes';
import { formatDate } from '@/utils/functions';
import type { WeatherForecastProps } from '@/types/weather.types';


export function WeatherForecast({ forecast }: WeatherForecastProps) {
  const { daily } = forecast;

  return (
    <Card className="w-full max-w-md h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Pronóstico 7 días
        </CardTitle>
      </CardHeader>
      <CardContent>
          <div className='flex flex-col gap-2 h-full'>
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