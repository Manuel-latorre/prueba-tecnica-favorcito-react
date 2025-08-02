import { useCitySearch } from '../../hooks/useCitySearch';
import { Input } from '../ui/input';
import { LoadingSpinner } from '../ui/loading-spinner';
import { useWeatherStore } from '../../store/weatherStore';
import { Search } from 'lucide-react';
import { CitySearchSkeleton } from '../ui/skeletons/city-search-skeleton';
import { SuggestionsSkeleton } from '../ui/skeletons/suggestions-skeleton';
import { CitySearchSuggestions } from './city-search-suggestions';

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
        <div className="search-container" ref={searchRef}>
            <div className="relative">
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onFocus={handleInputFocus}
                    placeholder="Buscar ciudad..."
                    className="search-input"
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