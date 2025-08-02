import { describe, it, expect } from 'vitest'
import { formatDate, formatDateTime } from '@/utils/functions'

describe('functions', () => {
  describe('formatDate', () => {
    it('should format date string correctly', () => {
      expect(formatDate('2024-01-15')).toBe('lun 15')
      expect(formatDate('2024-12-25')).toBe('mié 25')
      expect(formatDate('2024-06-01')).toBe('sáb 1')
    })

    it('should handle different date formats', () => {
      expect(formatDate('2024-02-29')).toBe('jue 29') // año bisiesto
      expect(formatDate('2024-03-31')).toBe('dom 31')
    })
  })

  describe('formatDateTime', () => {
    it('should format datetime string correctly', () => {
      expect(formatDateTime('2024-01-15T10:30:00')).toBe('lun 15')
      expect(formatDateTime('2024-12-25T23:59:59')).toBe('mié 25')
      expect(formatDateTime('2024-06-01T00:00:00')).toBe('sáb 1')
    })

    it('should extract only date part from datetime', () => {
      expect(formatDateTime('2024-02-29T15:45:30')).toBe('jue 29')
      expect(formatDateTime('2024-03-31T12:00:00')).toBe('dom 31')
    })
  })
}) 