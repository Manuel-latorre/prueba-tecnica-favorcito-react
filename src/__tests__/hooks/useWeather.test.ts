import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useWeatherInitialization } from '@/hooks/useWeather'
import { useWeatherStore } from '@/store/weatherStore'

// Mock del store
vi.mock('@/store/weatherStore', () => ({
  useWeatherStore: vi.fn()
}))

describe('useWeatherInitialization', () => {
  const mockUseWeatherStore = vi.mocked(useWeatherStore)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should initialize when data already exists', async () => {
    const mockStore = {
      location: { name: 'Madrid' },
      currentWeather: { current: { temperature_2m: 25 } },
      forecast: { daily: { temperature_2m_max: [25, 26, 27] } },
      loading: false,
      error: null,
      lastSearchedCity: 'Madrid',
      searchWeather: vi.fn(),
      searchWeatherByLocation: vi.fn(),
    }

    mockUseWeatherStore.mockReturnValue(mockStore as any)

    const { result } = renderHook(() => useWeatherInitialization())

    await waitFor(() => {
      expect(result.current.hasData).toBeTruthy()
    })
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(null)
  })

  it('should restore last searched city when no data exists', async () => {
    const mockSearchWeather = vi.fn()
    const mockStore = {
      location: null,
      currentWeather: null,
      forecast: null,
      loading: false,
      error: null,
      lastSearchedCity: 'Barcelona',
      searchWeather: mockSearchWeather,
      searchWeatherByLocation: vi.fn(),
    }

    mockUseWeatherStore.mockReturnValue(mockStore as any)

    renderHook(() => useWeatherInitialization())

    await waitFor(() => {
      expect(mockSearchWeather).toHaveBeenCalledWith('Barcelona')
    })
  })

  it('should try to get current location when no data and no last city', async () => {
    const mockSearchWeatherByLocation = vi.fn()
    const mockStore = {
      location: null,
      currentWeather: null,
      forecast: null,
      loading: false,
      error: null,
      lastSearchedCity: null,
      searchWeather: vi.fn(),
      searchWeatherByLocation: mockSearchWeatherByLocation,
    }

    mockUseWeatherStore.mockReturnValue(mockStore as any)

    renderHook(() => useWeatherInitialization())

    await waitFor(() => {
      expect(mockSearchWeatherByLocation).toHaveBeenCalled()
    })
  })

  it('should handle errors gracefully', async () => {
    const mockSearchWeather = vi.fn().mockRejectedValue(new Error('API Error'))
    const mockStore = {
      location: null,
      currentWeather: null,
      forecast: null,
      loading: false,
      error: null,
      lastSearchedCity: 'InvalidCity',
      searchWeather: mockSearchWeather,
      searchWeatherByLocation: vi.fn(),
    }

    mockUseWeatherStore.mockReturnValue(mockStore as any)

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    renderHook(() => useWeatherInitialization())

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('No se pudo restaurar el clima de la última ciudad')
    })

    consoleSpy.mockRestore()
  })

  it('should not initialize multiple times', async () => {
    const mockSearchWeather = vi.fn()
    const mockStore = {
      location: null,
      currentWeather: null,
      forecast: null,
      loading: false,
      error: null,
      lastSearchedCity: 'Madrid',
      searchWeather: mockSearchWeather,
      searchWeatherByLocation: vi.fn(),
    }

    mockUseWeatherStore.mockReturnValue(mockStore as any)

    const { rerender } = renderHook(() => useWeatherInitialization())

    // Re-render multiple times
    rerender()
    rerender()
    rerender()

    await waitFor(() => {
      // Should only be called once despite multiple re-renders
      expect(mockSearchWeather).toHaveBeenCalledTimes(1)
    })
  })
}) 