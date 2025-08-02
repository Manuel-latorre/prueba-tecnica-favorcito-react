import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock de fetch global
global.fetch = vi.fn()

// Mock de localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
} as Storage
global.localStorage = localStorageMock

// Mock de geolocation
Object.defineProperty(navigator, 'geolocation', {
  value: {
    getCurrentPosition: vi.fn(),
  },
  writable: true,
}) 