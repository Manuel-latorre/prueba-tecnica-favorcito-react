import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History } from "lucide-react";
import type { CitySearchSuggestionsProps } from "@/types/weather.types";
import { ErrorMessage } from "../errors/error-message";


export function CitySearchSuggestions({
    suggestions,
    searchError,
    searchHistory,
    onCitySelect,
    onHistorySelect
}: CitySearchSuggestionsProps) {
    return (
        <Card className="suggestions-dropdown">
            <CardContent className="p-0">
                {suggestions.length > 0 && (
                    <div>
                        <div className="dropdown-section-header">
                            Resultados de búsqueda
                        </div>
                        {suggestions.map((city) => (
                            <button
                                key={city.id}
                                onClick={() => onCitySelect(city)}
                                className="suggestion-button"
                            >
                                <div className="font-medium text-gray-900">{city.name}</div>
                                <div className="text-sm text-gray-500 flex-center-gap-2">
                                    {city.admin1 && <Badge variant="secondary" className="text-xs">{city.admin1}</Badge>}
                                    <span>{city.country}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {/* Mostrar error si no hay sugerencias y hay error */}
                {suggestions.length === 0 && searchError && (
                    <ErrorMessage message={searchError} />
                )}

                {searchHistory.length > 0 && suggestions.length === 0 && !searchError && (
                    <div>
                        <div className="dropdown-section-header">
                            Búsquedas recientes
                        </div>
                        {searchHistory.map((cityName, index) => (
                            <div
                                key={index}
                                className="flex-between px-3 py-2 hover:bg-gray-100 transition-colors duration-150"
                            >
                                <button
                                    onClick={() => onHistorySelect(cityName)}
                                    className="flex-1 text-left focus:outline-none"
                                >
                                    <div className="font-medium text-gray-900">{cityName}</div>
                                </button>
                                <button
                                    onClick={() => onHistorySelect(cityName)}
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
    );
} 