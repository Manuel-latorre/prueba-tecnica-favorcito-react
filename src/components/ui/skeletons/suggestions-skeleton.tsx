import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function SuggestionsSkeleton() {
  return (
    <Card className="absolute z-10 w-full max-w-md mt-1 shadow-lg max-h-60 overflow-y-auto py-0">
      <CardContent className="p-0">
        <div>
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border-b flex items-center gap-2">
            Resultados de búsqueda
          </div>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors duration-150"
            >
              <Skeleton className="h-4 w-32 mb-1" />
              <div className="flex items-center gap-2">
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