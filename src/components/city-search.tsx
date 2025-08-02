import { useCitySearch } from '../hooks/useCitySearch';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { LoadingSpinner } from './ui/loading-spinner';
import { useWeatherStore } from '../store/weatherStore';
import { History, Search } from 'lucide-react';
import { CitySearchSkeleton } from './ui/skeletons/city-search-skeleton';
import { SuggestionsSkeleton } from './ui/skeletons/suggestions-skeleton';

export const CitySearch = () => {
    const {
        query,
        suggestions,
        showSuggestions,
        isSearching,
        searchHistory,
        handleInputChange,
        handleInputFocus,
        handleCitySelect,
        handleHistorySelect,
        searchRef,
        searchError,
    } = useCitySearch();

    const { loading: globalLocationLoading } = useWeatherStore();


    if (globalLocationLoading) {
        return <CitySearchSkeleton />;
    }

    return (
        <div className="w-full max-w-md mx-auto" ref={searchRef}>
            <div className="relative">
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onFocus={handleInputFocus}
                    placeholder="Buscar ciudad..."
                    className="w-full max-w-lg pl-10 pr-4 rounded-full focus:border-0"
                    disabled={isSearching || globalLocationLoading}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {isSearching ? (
                        <LoadingSpinner size="sm" color="blue" />
                    ) : (
                        <Search className="w-4 h-4" />
                    )}
                </div>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
                <>
                    {isSearching && query.trim().length >= 2 ? (
                        <SuggestionsSkeleton />
                    ) : (suggestions.length > 0 || searchHistory.length > 0 || searchError) && (
                        <Card className="absolute z-10 w-full max-w-md mt-1 shadow-lg max-h-60 overflow-y-auto py-0">
                            <CardContent className="p-0">
                                {suggestions.length > 0 && (
                                    <div>
                                        <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border-b flex items-center gap-2">
                                            Resultados de búsqueda
                                        </div>
                                        {suggestions.map((city) => (
                                            <button
                                                key={city.id}
                                                onClick={() => handleCitySelect(city)}
                                                className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors duration-150"
                                            >
                                                <div className="font-medium text-gray-900">{city.name}</div>
                                                <div className="text-sm text-gray-500 flex items-center gap-2">
                                                    {city.admin1 && <Badge variant="secondary" className="text-xs">{city.admin1}</Badge>}
                                                    <span>{city.country}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Mostrar error si no hay sugerencias y hay error */}
                                {suggestions.length === 0 && searchError && (
                                    <div className="px-3 py-4 text-center text-red-600 text-sm">
                                        {searchError}
                                    </div>
                                )}

                                {searchHistory.length > 0 && suggestions.length === 0 && !searchError && (
                                    <div>
                                        <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border-b flex items-center gap-2">
                                            Búsquedas recientes
                                        </div>
                                        {searchHistory.map((cityName, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 transition-colors duration-150"
                                            >
                                                <button
                                                    onClick={() => handleHistorySelect(cityName)}
                                                    className="flex-1 text-left focus:outline-none"
                                                >
                                                    <div className="font-medium text-gray-900">{cityName}</div>
                                                </button>
                                                <button
                                                    onClick={() => handleHistorySelect(cityName)}
                                                    className="ml-2 p-1 text-gray-400 hover:text-blue-600 transition-colors duration-150"
                                                    title="Buscar esta ciudad"
                                                >
                                                    <History className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </>
            )}
        </div>
    );
}; 