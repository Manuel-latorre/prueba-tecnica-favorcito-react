import { CitySearchSuggestions, CitySearchSkeleton, LoadingSpinner, SuggestionsSkeleton } from '@/components';
import { useCitySearch } from '@/hooks/useCitySearch';
import { useWeatherStore } from '@/store/weatherStore';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';



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
                        <CitySearchSuggestions
                            suggestions={suggestions}
                            searchError={searchError}
                            searchHistory={searchHistory}
                            onCitySelect={handleCitySelect}
                            onHistorySelect={handleHistorySelect}
                        />
                    )}
                </>
            )}
        </div>
    );
}; 