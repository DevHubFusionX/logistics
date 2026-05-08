import { useMemo } from 'react'
import { calculateBookingMetrics } from '../utils/bookingFilters'

export function useBookingMetrics(bookings) {
  return useMemo(() => calculateBookingMetrics(bookings), [bookings])
}
