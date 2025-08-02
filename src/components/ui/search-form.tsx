import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';

interface SearchFormProps {
  onSearch: (city: string) => void;
  loading?: boolean;
  placeholder?: string;
}

export function SearchForm({ onSearch, loading = false, placeholder = "Buscar ciudad..." }: SearchFormProps) {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="pl-10"
          disabled={loading}
        />
      </div>
      <Button type="submit" disabled={loading || !city.trim()}>
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          'Buscar'
        )}
      </Button>
    </form>
  );
} 