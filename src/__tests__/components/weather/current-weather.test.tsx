import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CurrentWeather } from '@/components/weather/current-weather'

describe('CurrentWeather', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render weather data correctly', () => {
    const mockWeather = {
      current: {
        temperature_2m: 25.5,
        wind_speed_10m: 15.2,
        weather_code: 0,
        time: '2024-01-15T10:30:00'
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
      current: {
        temperature_2m: 20,
        wind_speed_10m: 10,
        weather_code: 999, // Invalid code
        time: '2024-01-15T10:30:00'
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
      current: {
        temperature_2m: 15,
        wind_speed_10m: 25,
        weather_code: 95, // Tormenta
        time: '2024-01-15T10:30:00'
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