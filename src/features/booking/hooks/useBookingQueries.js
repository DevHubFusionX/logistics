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

/**
 * Hook for fetching current user's bookings
 */
export function useBookingsQuery(params = {}) {
  return useQuery({
    queryKey: ['bookings', 'user-list', params],
    queryFn: async () => {
      const response = await bookingService.getBookings(params)
      const { records } = httpClient.extractList(response)
      try {
        const tripsResponse = await httpClient.request('/tripsV2/', {}, { limit: 100 })
        const tripsData = tripsResponse.data?.data || tripsResponse.data || {}
        const trips = tripsData.records || (Array.isArray(tripsData) ? tripsData : [])
        
        return records.map(b => mergeTripIntoBooking(b, trips))
      } catch (e) {
        console.warn('[useBookingsQuery] failed to merge trips:', e)
        return records
      }
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
      const response = await bookingService.getAdminBookings(params)
      const { records, pagination } = httpClient.extractList(response)
      try {
        const tripsResponse = await httpClient.request('/tripsV2/admins', {}, { limit: 100 })
        const tripsData = tripsResponse.data?.data || tripsResponse.data || {}
        const trips = tripsData.records || (Array.isArray(tripsData) ? tripsData : [])
        
        const mergedRecords = records.map(b => mergeTripIntoBooking(b, trips))
        return { records: mergedRecords, pagination }
      } catch (e) {
        console.warn('[useAllBookingsQuery] failed to merge trips:', e)
        return { records, pagination }
      }
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
