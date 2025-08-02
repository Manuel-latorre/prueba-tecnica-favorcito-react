import { Skeleton } from '@/components/ui/skeleton';
import { Search } from 'lucide-react';

export function CitySearchSkeleton() {
  return (
    <div className="search-container">
      <div className="relative">
        <div className="search-input py-2 border bg-background flex items-center">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="icon-muted-sm" />
          </div>
          <Skeleton className="h-5 w-full" />
        </div>
      </div>
    </div>
  );
} 