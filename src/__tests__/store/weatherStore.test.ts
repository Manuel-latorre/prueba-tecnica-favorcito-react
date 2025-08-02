import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useWeatherStore } from '@/store/weatherStore'

// Mock de los servicios
vi.mock('@/services/geocodingService', () => ({
  geocoding: vi.fn()
}))

vi.mock('@/services/weatherService', () => ({
  getCurrentWeather: vi.fn(),
  getForecast: vi.fn()
}))

vi.mock('@/services/geolocationService', () => ({
  getCurrentPosition: vi.fn(),
  getWeatherByCoordinates: vi.fn()
}))

describe('weatherStore', () => {
  beforeEach(() => {
    // Reset store state
    useWeatherStore.setState({
      location: null,
      currentWeather: null,
      forecast: null,
      loading: false,
      error: null,
      lastSearchedCity: null,
      searchHistory: [],
    })
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('searchHistory actions', () => {
    it('should add city to search history', () => {
      const { addToSearchHistory } = useWeatherStore.getState()
      
      addToSearchHistory('Madrid')
      
      expect(useWeatherStore.getState().searchHistory).toContain('Madrid')
    })

    it('should not add duplicate cities', () => {
      const { addToSearchHistory } = useWeatherStore.getState()
      
      addToSearchHistory('Madrid')
      addToSearchHistory('Madrid')
      
      const history = useWeatherStore.getState().searchHistory
      expect(history.filter(city => city === 'Madrid')).toHaveLength(1)
    })

    it('should move existing city to top of history', () => {
      const { addToSearchHistory } = useWeatherStore.getState()
      
      addToSearchHistory('Barcelona')
      addToSearchHistory('Madrid')
      addToSearchHistory('Barcelona')
      
      const history = useWeatherStore.getState().searchHistory
      expect(history[0]).toBe('Barcelona')
    })

    it('should clear search history', () => {
      const { addToSearchHistory, clearSearchHistory } = useWeatherStore.getState()
      
      addToSearchHistory('Madrid')
      addToSearchHistory('Barcelona')
      clearSearchHistory()
      
      expect(useWeatherStore.getState().searchHistory).toHaveLength(0)
    })
  })

  describe('searchWeather', () => {
    it('should set error for empty city', async () => {
      const { searchWeather } = useWeatherStore.getState()
      
      await searchWeather('')
      
      expect(useWeatherStore.getState().error).toBe('Por favor ingresa una ciudad')
    })

    it('should set error for whitespace-only city', async () => {
      const { searchWeather } = useWeatherStore.getState()
      
      await searchWeather('   ')
      
      expect(useWeatherStore.getState().error).toBe('Por favor ingresa una ciudad')
    })

    it('should handle successful weather search', async () => {
      const mockGeocoding = vi.mocked(await import('@/services/geocodingService')).geocoding
      const mockGetCurrentWeather = vi.mocked(await import('@/services/weatherService')).getCurrentWeather
      const mockGetForecast = vi.mocked(await import('@/services/weatherService')).getForecast

      const mockLocation = { latitude: 40.4168, longitude: -3.7038, name: 'Madrid', id: 1, country: 'Spain' }
      const mockCurrentWeather = { current: { temperature_2m: 25, weather_code: 0 }, latitude: 40.4168, longitude: -3.7038 }
      const mockForecast = { daily: { temperature_2m_max: [25, 26, 27] }, latitude: 40.4168, longitude: -3.7038 }

      mockGeocoding.mockResolvedValue(mockLocation as any)
      mockGetCurrentWeather.mockResolvedValue(mockCurrentWeather as any)
      mockGetForecast.mockResolvedValue(mockForecast as any)

      const { searchWeather } = useWeatherStore.getState()
      
      await searchWeather('Madrid')
      
      const state = useWeatherStore.getState()
      expect(state.location).toEqual(mockLocation)
      expect(state.currentWeather).toEqual(mockCurrentWeather)
      expect(state.forecast).toEqual(mockForecast)
      expect(state.lastSearchedCity).toBe('Madrid')
      expect(state.loading).toBe(false)
      expect(state.error).toBe(null)
      expect(state.searchHistory).toContain('Madrid')
    })

    it('should handle API errors', async () => {
      const mockGeocoding = vi.mocked(await import('@/services/geocodingService')).geocoding
      mockGeocoding.mockRejectedValue(new Error('City not found'))

      const { searchWeather } = useWeatherStore.getState()
      
      await searchWeather('InvalidCity')
      
      const state = useWeatherStore.getState()
      expect(state.error).toBe('City not found')
      expect(state.loading).toBe(false)
      expect(state.location).toBe(null)
      expect(state.currentWeather).toBe(null)
      expect(state.forecast).toBe(null)
    })
  })

  describe('searchWeatherByLocation', () => {
    it('should handle successful location-based search', async () => {
      const mockGetCurrentPosition = vi.mocked(await import('@/services/geolocationService')).getCurrentPosition
      const mockGetWeatherByCoordinates = vi.mocked(await import('@/services/geolocationService')).getWeatherByCoordinates

      const mockPosition = { latitude: 40.4168, longitude: -3.7038 }
      const mockWeatherData = {
        location: { latitude: 40.4168, longitude: -3.7038, name: 'Madrid', id: 1, country: 'Spain' },
        currentWeather: { current: { temperature_2m: 25, weather_code: 0 }, latitude: 40.4168, longitude: -3.7038 },
        forecast: { daily: { temperature_2m_max: [25, 26, 27] }, latitude: 40.4168, longitude: -3.7038 }
      }

      mockGetCurrentPosition.mockResolvedValue(mockPosition)
      mockGetWeatherByCoordinates.mockResolvedValue(mockWeatherData as any)

      const { searchWeatherByLocation } = useWeatherStore.getState()
      
      await searchWeatherByLocation()
      
      const state = useWeatherStore.getState()
      expect(state.location).toEqual(mockWeatherData.location)
      expect(state.currentWeather).toEqual(mockWeatherData.currentWeather)
      expect(state.forecast).toEqual(mockWeatherData.forecast)
      expect(state.loading).toBe(false)
      expect(state.error).toBe(null)
    })

    it('should handle geolocation errors', async () => {
      const mockGetCurrentPosition = vi.mocked(await import('@/services/geolocationService')).getCurrentPosition
      mockGetCurrentPosition.mockRejectedValue(new Error('Geolocation not supported'))

      const { searchWeatherByLocation } = useWeatherStore.getState()
      
      await searchWeatherByLocation()
      
      const state = useWeatherStore.getState()
      expect(state.error).toBe('Geolocation not supported')
      expect(state.loading).toBe(false)
      expect(state.location).toBe(null)
      expect(state.currentWeather).toBe(null)
      expect(state.forecast).toBe(null)
    })
  })
}) 