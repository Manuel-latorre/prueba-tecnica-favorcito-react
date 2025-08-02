import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getCurrentWeather, getForecast, getWeatherData } from '@/services/weatherService'

// Mock de fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('weatherService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('getCurrentWeather', () => {
    it('should fetch current weather data successfully', async () => {
      const mockResponse = {
        current: {
          temperature_2m: 25,
          wind_speed_10m: 15,
          weather_code: 0
        }
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      })

      const result = await getCurrentWeather(40.7128, -74.0060)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('forecast?latitude=40.7128&longitude=-74.006'),
        expect.any(Object)
      )
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('current=temperature_2m,wind_speed_10m,weather_code'),
        expect.any(Object)
      )
      expect(result).toEqual(mockResponse)
    })

    it('should throw error when API returns error status', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      })

      await expect(getCurrentWeather(40.7128, -74.0060)).rejects.toThrow('Error HTTP: 500')
    })

    it('should throw error when fetch fails', async () => {
      const error = new Error('Network error')
      mockFetch.mockRejectedValueOnce(error)

      await expect(getCurrentWeather(40.7128, -74.0060)).rejects.toThrow('Network error')
    })
  })

  describe('getForecast', () => {
    it('should fetch forecast data successfully', async () => {
      const mockResponse = {
        daily: {
          weather_code: [0, 1, 2],
          temperature_2m_max: [25, 26, 27],
          temperature_2m_min: [15, 16, 17]
        }
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      })

      const result = await getForecast(40.7128, -74.0060)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('daily=weather_code,temperature_2m_max,temperature_2m_min'),
        expect.any(Object)
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getWeatherData', () => {
    it('should fetch both current and forecast data successfully', async () => {
      const mockResponse = {
        current: {
          temperature_2m: 25,
          wind_speed_10m: 15,
          weather_code: 0
        },
        daily: {
          weather_code: [0, 1, 2],
          temperature_2m_max: [25, 26, 27],
          temperature_2m_min: [15, 16, 17]
        }
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      })

      const result = await getWeatherData(40.7128, -74.0060)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('current=temperature_2m,wind_speed_10m,weather_code&weather_code,temperature_2m_max,temperature_2m_min'),
        expect.any(Object)
      )
      expect(result).toEqual(mockResponse)
    })
  })
}) 