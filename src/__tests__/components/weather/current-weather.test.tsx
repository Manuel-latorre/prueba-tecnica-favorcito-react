import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CurrentWeather } from '@/components/weather/current-weather'

describe('CurrentWeather', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render weather data correctly', () => {
    const mockWeather = {
      latitude: 40.4168,
      longitude: -3.7038,
      generationtime_ms: 0.123456,
      utc_offset_seconds: 3600,
      timezone: 'Europe/Madrid',
      timezone_abbreviation: 'CET',
      elevation: 667,
      current_units: {
        time: 'iso8601',
        interval: 'seconds',
        temperature_2m: '°C',
        wind_speed_10m: 'km/h',
        weather_code: 'wmo code'
      },
      current: {
        time: '2024-01-15T10:30:00',
        interval: 900,
        temperature_2m: 25.5,
        wind_speed_10m: 15.2,
        weather_code: 0
      }
    }

    render(<CurrentWeather weather={mockWeather} cityName="Madrid" />)
    
    expect(screen.getByText('Madrid')).toBeInTheDocument()
    expect(screen.getByText('25.5°C')).toBeInTheDocument()
    expect(screen.getByText('15.2 km/h')).toBeInTheDocument()
    expect(screen.getByText('Despejado')).toBeInTheDocument()
    expect(screen.getByText('☀️')).toBeInTheDocument()
  })

  it('should render unknown weather for invalid weather code', () => {
    const mockWeather = {
      latitude: 41.3851,
      longitude: 2.1734,
      generationtime_ms: 0.123456,
      utc_offset_seconds: 3600,
      timezone: 'Europe/Madrid',
      timezone_abbreviation: 'CET',
      elevation: 12,
      current_units: {
        time: 'iso8601',
        interval: 'seconds',
        temperature_2m: '°C',
        wind_speed_10m: 'km/h',
        weather_code: 'wmo code'
      },
      current: {
        time: '2024-01-15T10:30:00',
        interval: 900,
        temperature_2m: 20,
        wind_speed_10m: 10,
        weather_code: 999 // Invalid code
      }
    }

    render(<CurrentWeather weather={mockWeather} cityName="Barcelona" />)
    
    expect(screen.getByText('Barcelona')).toBeInTheDocument()
    expect(screen.getByText('20°C')).toBeInTheDocument()
    expect(screen.getByText('10 km/h')).toBeInTheDocument()
    expect(screen.getByText('Desconocido')).toBeInTheDocument()
    expect(screen.getByText('❓')).toBeInTheDocument()
  })

  it('should render different weather conditions', () => {
    const mockWeather = {
      latitude: 39.4699,
      longitude: -0.3763,
      generationtime_ms: 0.123456,
      utc_offset_seconds: 3600,
      timezone: 'Europe/Madrid',
      timezone_abbreviation: 'CET',
      elevation: 15,
      current_units: {
        time: 'iso8601',
        interval: 'seconds',
        temperature_2m: '°C',
        wind_speed_10m: 'km/h',
        weather_code: 'wmo code'
      },
      current: {
        time: '2024-01-15T10:30:00',
        interval: 900,
        temperature_2m: 15,
        wind_speed_10m: 25,
        weather_code: 95 // Tormenta
      }
    }

    render(<CurrentWeather weather={mockWeather} cityName="Valencia" />)
    
    expect(screen.getByText('Valencia')).toBeInTheDocument()
    expect(screen.getByText('15°C')).toBeInTheDocument()
    expect(screen.getByText('25 km/h')).toBeInTheDocument()
    expect(screen.getByText('Tormenta')).toBeInTheDocument()
    expect(screen.getByText('⛈️')).toBeInTheDocument()
  })
}) 