import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function WeatherForecastSkeleton() {
  return (
    <Card className="card-max-width h-full">
      <CardHeader>
        <CardTitle className="flex-center-gap-2">
          <Calendar className="h-5 w-5" />
          Pronóstico 7 días
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="rounded-md">
          <div className='flex flex-col gap-2 h-full max-h-[500px]'>
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="flex-between p-3 rounded-lg border bg-card"
              >
                <div className="flex-center-gap-3">
                  <Skeleton className="h-8 w-8" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                
                <div className="flex-center-gap-4">
                  <div className="flex-center-gap-1">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                  <div className="flex-center-gap-1">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
} 