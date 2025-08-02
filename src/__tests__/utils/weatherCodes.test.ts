import { describe, it, expect } from 'vitest'
import { getWeatherInfo, weatherCodes } from '@/utils/weatherCodes'

describe('weatherCodes', () => {
  describe('getWeatherInfo', () => {
    it('should return correct weather info for known codes', () => {
      expect(getWeatherInfo(0)).toEqual({ description: 'Despejado', icon: '☀️' })
      expect(getWeatherInfo(1)).toEqual({ description: 'Mayormente despejado', icon: '🌤️' })
      expect(getWeatherInfo(3)).toEqual({ description: 'Nublado', icon: '☁️' })
      expect(getWeatherInfo(95)).toEqual({ description: 'Tormenta', icon: '⛈️' })
    })

    it('should return default info for unknown codes', () => {
      expect(getWeatherInfo(999)).toEqual({ description: 'Desconocido', icon: '❓' })
      expect(getWeatherInfo(-1)).toEqual({ description: 'Desconocido', icon: '❓' })
    })

    it('should handle edge cases', () => {
      expect(getWeatherInfo(45)).toEqual({ description: 'Niebla', icon: '🌫️' })
      expect(getWeatherInfo(99)).toEqual({ description: 'Tormenta con granizo intenso', icon: '⛈️' })
    })
  })

  describe('weatherCodes object', () => {
    it('should contain all expected weather codes', () => {
      expect(weatherCodes).toHaveProperty('0')
      expect(weatherCodes).toHaveProperty('1')
      expect(weatherCodes).toHaveProperty('3')
      expect(weatherCodes).toHaveProperty('95')
      expect(weatherCodes).toHaveProperty('99')
    })

    it('should have correct structure for each code', () => {
      Object.values(weatherCodes).forEach(weatherInfo => {
        expect(weatherInfo).toHaveProperty('description')
        expect(weatherInfo).toHaveProperty('icon')
        expect(typeof weatherInfo.description).toBe('string')
        expect(typeof weatherInfo.icon).toBe('string')
      })
    })
  })
}) 