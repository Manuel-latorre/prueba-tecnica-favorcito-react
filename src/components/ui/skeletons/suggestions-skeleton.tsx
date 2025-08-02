import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function SuggestionsSkeleton() {
  return (
    <Card className="suggestions-dropdown">
      <CardContent className="p-0">
        <div>
          <div className="dropdown-section-header">
            Resultados de búsqueda
          </div>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="suggestion-button"
            >
              <Skeleton className="h-4 w-32 mb-1" />
              <div className="flex-center-gap-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 