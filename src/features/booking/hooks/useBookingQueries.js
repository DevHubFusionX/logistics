import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import bookingService from '../services/bookingService'
import httpClient from '@/services/httpClient'

/**
 * Helper to enrich a booking with corresponding Trip V2 data (status, driver, trackingLink)
 */
export function mergeTripIntoBooking(booking, trips = []) {
  if (!booking) return booking
  const bId = booking._id || booking.id
  const trip = trips.find(t => {
    const tBookingId = typeof t.booking === 'object' ? (t.booking?._id || t.booking?.id) : t.booking
    return tBookingId === bId
  })

  if (trip) {
    let status = booking.status
    if (trip.status === 'active' || trip.status === 'in_transit') {
      status = 'in_transit'
    } else if (trip.status === 'completed' || trip.status === 'delivered') {
      status = 'delivered'
    } else if (trip.status === 'cancelled') {
      status = 'cancelled'
    }
    return {
      ...booking,
      status,
      driver: trip.driver,
      trip,
      trackingLink: trip.trackingLink || booking.trackingLink
    }
  }
  return booking
}

const CACHE_KEY = 'dara_cached_user_bookings'

/**
 * Hook for fetching current user's bookings
 */
export function useBookingsQuery(params = {}) {
  return useQuery({
    queryKey: ['bookings', 'user-list', params],
    initialData: () => {
      // Use cached bookings for instant dashboard display on page reload
      if (Object.keys(params).length <= 1 && (!params.limit || params.limit === 100)) {
        try {
          const cached = sessionStorage.getItem(CACHE_KEY)
          if (cached) {
            const parsed = JSON.parse(cached)
            if (Array.isArray(parsed) && parsed.length > 0) return parsed
          }
        } catch {
          // ignore cache read failure
        }
      }
      return undefined
    },
    queryFn: async () => {
      // Execute bookings and trips fetch in parallel to eliminate waterfall delay
      const [bookingsResult, tripsResult] = await Promise.allSettled([
        bookingService.getBookings(params),
        httpClient.request('/tripsV2/', {}, { limit: 100 })
      ])

      const response = bookingsResult.status === 'fulfilled' ? bookingsResult.value : null
      if (!response) {
        throw bookingsResult.reason || new Error('Failed to load bookings')
      }

      const { records } = httpClient.extractList(response)

      let trips = []
      if (tripsResult.status === 'fulfilled') {
        const tripsData = tripsResult.value?.data?.data || tripsResult.value?.data || {}
        trips = tripsData.records || (Array.isArray(tripsData) ? tripsData : [])
      } else {
        console.warn('[useBookingsQuery] trips fetch failed or forbidden:', tripsResult.reason)
      }

      const merged = records.map(b => mergeTripIntoBooking(b, trips))

      // Persist to session storage so reloads render immediately
      if (Object.keys(params).length <= 1 && (!params.limit || params.limit === 100)) {
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(merged))
        } catch {
          // ignore storage quota errors
        }
      }

      return merged
    },
    staleTime: 30000,
  })
}

/**
 * Hook for fetching all bookings (Admin view)
 */
export function useAllBookingsQuery(params = {}) {
  return useQuery({
    queryKey: ['admin', 'all-bookings', params],
    queryFn: async () => {
      // Execute in parallel
      const [bookingsResult, tripsResult] = await Promise.allSettled([
        bookingService.getAdminBookings(params),
        httpClient.request('/tripsV2/admins', {}, { limit: 100 })
      ])

      const response = bookingsResult.status === 'fulfilled' ? bookingsResult.value : null
      if (!response) {
        throw bookingsResult.reason || new Error('Failed to load admin bookings')
      }

      const { records, pagination } = httpClient.extractList(response)

      let trips = []
      if (tripsResult.status === 'fulfilled') {
        const tripsData = tripsResult.value?.data?.data || tripsResult.value?.data || {}
        trips = tripsData.records || (Array.isArray(tripsData) ? tripsData : [])
      } else {
        console.warn('[useAllBookingsQuery] trips fetch failed:', tripsResult.reason)
      }

      const mergedRecords = records.map(b => mergeTripIntoBooking(b, trips))
      return { records: mergedRecords, pagination }
    },
    staleTime: 30000,
  })
}

/**
 * Alias for useAllBookingsQuery
 */
export const useAdminBookingsQuery = useAllBookingsQuery

/**
 * Hook for fetching bookings of a specific user (Admin view)
 */
export function useAdminUserBookingsQuery(userId, params = {}) {
  return useQuery({
    queryKey: ['admin', 'user-bookings', userId, params],
    queryFn: async () => {
      const response = await bookingService.getUserBookingsForAdmin(userId, params)
      const { records, pagination } = httpClient.extractList(response)
      try {
        const tripsResponse = await httpClient.request('/tripsV2/admins', {}, { limit: 100 })
        const tripsData = tripsResponse.data?.data || tripsResponse.data || {}
        const trips = tripsData.records || (Array.isArray(tripsData) ? tripsData : [])
        
        const mergedRecords = records.map(b => mergeTripIntoBooking(b, trips))
        return { records: mergedRecords, pagination }
      } catch (e) {
        console.warn('[useAdminUserBookingsQuery] failed to merge trips:', e)
        return { records, pagination }
      }
    },
    enabled: !!userId,
    staleTime: 30000,
  })
}

/**
 * Hook for fetching a single booking by ID
 */
export function useBookingQuery(id, isAdmin = false) {
  return useQuery({
    queryKey: ['booking', id, isAdmin],
    queryFn: async () => {
      const response = isAdmin
        ? await bookingService.getAdminBookingById(id)
        : await bookingService.getBookingById(id)
      const booking = httpClient.extractData(response)
      if (booking) {
        try {
          const tripsResponse = isAdmin
            ? await httpClient.request('/tripsV2/admins', {}, { limit: 100 })
            : await httpClient.request('/tripsV2/', {}, { limit: 100 })
          const tripsData = tripsResponse.data?.data || tripsResponse.data || {}
          const trips = tripsData.records || (Array.isArray(tripsData) ? tripsData : [])
          
          return mergeTripIntoBooking(booking, trips)
        } catch (e) {
          console.warn('[useBookingQuery] failed to merge trip info:', e)
        }
      }
      return booking
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Hook for Booking Mutations
 */
export function useBookingMutations() {
  const queryClient = useQueryClient()

  const createBooking = useMutation({
    mutationFn: (bookingData) => bookingService.createBooking(bookingData),
    onSuccess: () => {
      // Only invalidate what actually changed
      queryClient.invalidateQueries({ queryKey: ['bookings', 'user-list'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'all-bookings'] })
    }
  })

  const updateBooking = useMutation({
    mutationFn: ({ id, data }) => bookingService.updateBooking(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['booking', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['bookings', 'user-list'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'all-bookings'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'user-bookings'] })
    }
  })

  const updateBookingStatus = useMutation({
    mutationFn: ({ id, status, data = {} }) =>
      bookingService.updateAdminBooking(id, { status, ...data }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['booking', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'all-bookings'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'user-bookings'] })
    }
  })

  const cancelBooking = useMutation({
    mutationFn: (id) => bookingService.cancelBooking(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['booking', id] })
      queryClient.invalidateQueries({ queryKey: ['bookings', 'user-list'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'all-bookings'] })
    }
  })

  const assignTruck = useMutation({
    mutationFn: ({ bookingId, truckId }) => bookingService.assignTruck(bookingId, truckId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['booking', variables.bookingId] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'all-bookings'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'user-bookings'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'trips'] })
    }
  })

  const removeTruck = useMutation({
    mutationFn: (bookingId) => bookingService.removeTruck(bookingId),
    onSuccess: (_, bookingId) => {
      queryClient.invalidateQueries({ queryKey: ['booking', bookingId] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'all-bookings'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'user-bookings'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'trips'] })
    }
  })

  return { createBooking, updateBooking, updateBookingStatus, cancelBooking, assignTruck, removeTruck }
}

/**
 * Individual mutation hook for specific usage (e.g. in useBookingFlow)
 */
export function useCreateBookingMutation() {
  const { createBooking } = useBookingMutations()
  return createBooking
}
