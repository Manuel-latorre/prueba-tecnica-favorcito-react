import { Skeleton } from '@/components/ui/skeleton';
import { Search } from 'lucide-react';

export function CitySearchSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        <div className="w-full max-w-lg pl-10 pr-4 py-2 rounded-full border bg-background flex items-center">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-muted-foreground" />
          </div>
          <Skeleton className="h-5 w-full" />
        </div>
      </div>
    </div>
  );
} 