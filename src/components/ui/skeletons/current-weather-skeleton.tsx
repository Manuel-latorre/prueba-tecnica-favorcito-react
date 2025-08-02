import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin } from 'lucide-react';

export function CurrentWeatherSkeleton() {
  return (
    <Card className="card-max-width">
      <CardHeader className="">
        <CardTitle className="flex-center-gap-2 text-lg">
          <MapPin className="icon-muted-md" />
          <Skeleton className="h-6 w-32" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex-between">
          <div className="flex-center-gap-2">
            <Skeleton className="h-8 w-8" />
            <div>
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>

        <div className="flex-between">
          <div className="flex-center-gap-2">
            <Skeleton className="h-4 w-4" />
            <div>
              <Skeleton className="h-4 w-16 mb-1" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>

          <div className="flex-center-gap-2">
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 