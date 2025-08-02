import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, X, Search } from 'lucide-react';

interface SearchHistoryProps {
  history: string[];
  onSelectCity: (city: string) => void;
  onClearHistory: () => void;
  loading?: boolean;
}

export function SearchHistory({ history, onSelectCity, onClearHistory, loading = false }: SearchHistoryProps) {
  if (history.length === 0) {
    return null;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            Búsquedas recientes
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearHistory}
            disabled={loading}
            className="h-6 px-2"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {history.map((city, index) => (
            <div
              key={`${city}-${index}`}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
              onClick={() => onSelectCity(city)}
            >
              <div className="flex items-center gap-2">
                <Search className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm">{city}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {index + 1}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 