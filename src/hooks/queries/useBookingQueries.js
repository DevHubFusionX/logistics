import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import bookingService from '../../services/bookingService'

/**
 * Hook for fetching current user's bookings
 */
export function useBookingsQuery(params = {}) {
  return useQuery({
    queryKey: ['bookings', 'user-list', params],
    queryFn: async () => {
      const response = await bookingService.getBookings(params)
      // Robust extraction of records from new and old API structures
      const apiData = response.data?.data || response.data
      return apiData?.records || apiData?.bookings || (Array.isArray(apiData) ? apiData : [])
    },
    staleTime: 5 * 60 * 1000,
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
      // Robust extraction of records from new and old API structures
      const apiBody = response.data
      const apiData = apiBody?.data || apiBody
      const pagination = apiData?.pagination || {}
      
      return {
        records: apiData?.records || apiData?.bookings || (Array.isArray(apiData) ? apiData : []),
        total: pagination.totalRecords || 0,
        pagination
      }
    },
    staleTime: 5 * 60 * 1000,
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
      const apiBody = response.data
      const apiData = apiBody?.data || apiBody
      const pagination = apiData?.pagination || {}
      
      return {
        records: apiData?.records || [],
        pagination
      }
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
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
      return response.data
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
    mutationFn: async (bookingData) => {
      const response = await bookingService.createBooking(bookingData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', 'user-list'] })
      queryClient.invalidateQueries({ queryKey: ['admin'] }) // Refreshes Bookings + Analytics
    }
  })

  const updateBooking = useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await bookingService.updateBooking(id, data)
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['booking', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['bookings', 'user-list'] })
      queryClient.invalidateQueries({ queryKey: ['admin'] })
    }
  })

  const updateBookingStatus = useMutation({
    mutationFn: async ({ id, status, data = {} }) => {
      // Merge status with other update data (e.g., driverId)
      const payload = { status, ...data }
      const response = await bookingService.updateAdminBooking(id, payload)
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['booking', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['admin'] })
    }
  })

  const cancelBooking = useMutation({
    mutationFn: async (id) => {
      const response = await bookingService.cancelBooking(id)
      return response.data
    },
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ['booking', id] })
      queryClient.invalidateQueries({ queryKey: ['bookings', 'user-list'] })
      queryClient.invalidateQueries({ queryKey: ['admin'] })
    }
  })

  return { createBooking, updateBooking, updateBookingStatus, cancelBooking }
}

/**
 * Individual mutation hooks for specific usage (like in useBookingFlow)
 */
export function useCreateBookingMutation() {
  const { createBooking } = useBookingMutations()
  return createBooking
}
