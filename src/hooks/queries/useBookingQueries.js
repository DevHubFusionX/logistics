import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../lib/queryClient'
import bookingService from '../../services/bookingService'
import toast from 'react-hot-toast'

/**
 * Fetch all user bookings
 * 
 * Replaces: useBookings hook
 */
export function useBookingsQuery(filters = { limit: 10, page: 1 }) {
    return useQuery({
        queryKey: queryKeys.bookings.list(filters),
        queryFn: async () => {
            const response = await bookingService.getBookings(filters)
            // API returns { data: { error, message, data: { records, pagination } } }
            const apiBody = response.data
            if (apiBody?.error) {
                throw new Error(apiBody.message || 'Failed to fetch bookings')
            }
            return apiBody.data?.records || []
        },
        staleTime: 2 * 60 * 1000,
        retry: 2,
    })
}

/**
 * Fetch all shipments (Admin View)
 */
export function useAllBookingsQuery(filters = { limit: 10, page: 1 }) {
    return useQuery({
        queryKey: ['bookings', 'all', filters],
        queryFn: async () => {
            const response = await bookingService.getAdminBookings(filters)
            // API returns { data: { error, message, data: { records, pagination } } }
            const apiBody = response.data
            if (apiBody?.error) throw new Error(apiBody.message || 'Failed to fetch all bookings')

            // Return full data object to allow access to pagination in UI
            return apiBody.data || { records: [], pagination: {} }
        },
        staleTime: 5 * 60 * 1000,
    })
}

export function useAdminUserBookingsQuery(userId, filters = { limit: 10, page: 1 }) {
    return useQuery({
        queryKey: ['bookings', 'user', userId, filters],
        queryFn: async () => {
            if (!userId) return { records: [], pagination: {} }
            const response = await bookingService.getUserBookingsForAdmin(userId, filters)
            const apiBody = response.data
            if (apiBody?.error) throw new Error(apiBody.message || 'Failed to fetch user bookings')
            return apiBody.data || { records: [], pagination: {} }
        },
        enabled: !!userId,
        staleTime: 1 * 60 * 1000,
    })
}

/**
 * Fetch single booking details
 */
export function useBookingQuery(bookingId, options = {}) {
    return useQuery({
        queryKey: queryKeys.bookings.detail(bookingId),
        queryFn: async () => {
            const response = await bookingService.getBookingById(bookingId)
            return response.data || response
        },
        enabled: !!bookingId,
        staleTime: 5 * 60 * 1000,
        ...options,
    })
}

/**
 * Fetch a specific booking's details (Admin View)
 */
export function useAdminBookingQuery(bookingId, options = {}) {
    return useQuery({
        queryKey: ['admin', 'bookings', bookingId],
        queryFn: async () => {
            const response = await bookingService.getAdminBookingById(bookingId)
            // api returns { error, message, data: { ...booking } }
            const apiBody = response.data
            if (apiBody?.error) throw new Error(apiBody.message || 'Failed to fetch booking details')
            return apiBody.data || apiBody
        },
        enabled: !!bookingId,
        staleTime: 5 * 60 * 1000,
        ...options
    })
}

/**
 * Fetch booking statistics
 */
export function useBookingStatsQuery() {
    return useQuery({
        queryKey: queryKeys.bookings.stats,
        queryFn: async () => {
            const response = await bookingService.getBookingStats()
            return response.data
        },
        staleTime: 5 * 60 * 1000,
    })
}

/**
 * Fetch dynamic price estimation
 */
export function useBookingPriceQuery(params, options = {}) {
    return useQuery({
        queryKey: ['bookings', 'price', params],
        queryFn: async () => {
            const response = await bookingService.getPrices(params?.destination, params?.weight)
            // httpClient returns { data: { error, message, data: { price } } }
            const apiBody = response.data
            if (apiBody?.error) throw new Error(apiBody.message || 'Failed to calculate price')
            return apiBody.data || apiBody
        },
        enabled: !!params?.weight && !!params?.destination,
        staleTime: 1 * 60 * 1000, // 1 minute
        ...options,
    })
}

/**
 * Update booking mutation
 * 
 * Automatically invalidates cache and shows toast notifications
 */
export function useUpdateBookingMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ bookingId, data, isAdmin = false }) => {
            if (isAdmin) {
                return await bookingService.updateAdminBooking(bookingId, data)
            }
            return await bookingService.updateBooking(bookingId, data)
        },

        onSuccess: (response, variables) => {
            toast.success('Booking updated successfully!')

            // API returns { data: { error, message, data: { ...updatedBooking } } }
            const apiBody = response.data
            const updatedBooking = apiBody?.data || apiBody

            // Update the specific booking in cache
            if (updatedBooking) {
                queryClient.setQueryData(
                    queryKeys.bookings.detail(variables.bookingId),
                    updatedBooking
                )
            }

            // Invalidate lists to refresh
            queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all })
        },

        onError: (error) => {
            const message = error.response?.data?.message || error.message || 'Failed to update booking'
            toast.error(message)
        },
    })
}

/**
 * Cancel booking mutation
 */
export function useCancelBookingMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (bookingId) => {
            return await bookingService.cancelBooking(bookingId)
        },

        onSuccess: (response, bookingId) => {
            toast.success('Booking cancelled successfully')

            // API returns { data: { error, message, data: { ...booking } } }
            const apiBody = response.data
            const updatedBooking = apiBody?.data || apiBody

            // Update cache
            if (updatedBooking) {
                queryClient.setQueryData(
                    queryKeys.bookings.detail(bookingId),
                    updatedBooking
                )
            }

            queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all })
        },

        onError: (error) => {
            const message = error.response?.data?.message || error.message || 'Failed to cancel booking'
            toast.error(message)
        },
    })
}

/**
 * Create new booking mutation
 */
export function useCreateBookingMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (bookingData) => {
            return await bookingService.createBooking(bookingData)
        },

        onSuccess: (response) => {
            // API returns { data: { error, message, data: { booking fields } } }
            // Toast is handled by the booking flow
            queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all })
            return response
        },

        onError: (error) => {
            const message = error.response?.data?.message || error.message || 'Failed to create booking'
            toast.error(message)
        },
    })
}

