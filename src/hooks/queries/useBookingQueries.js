import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../lib/queryClient'
import bookingService from '../../services/bookingService'
import toast from 'react-hot-toast'

/**
 * Fetch all user bookings
 * 
 * Replaces: useBookings hook
 */
export function useBookingsQuery(filters = {}) {
    return useQuery({
        queryKey: queryKeys.bookings.list(filters),
        queryFn: async () => {
            const response = await bookingService.getBookings(filters)
            return response.data?.shipments || []
        },
        staleTime: 2 * 60 * 1000,
        retry: 2,
    })
}

/**
 * Fetch all shipments (Admin View)
 */
export function useAllBookingsQuery(filters = {}) {
    return useQuery({
        queryKey: ['bookings', 'all', filters],
        queryFn: async () => {
            const response = await bookingService.getAllBookings(filters)
            return response.data?.shipments || response.data || []
        },
        staleTime: 1 * 60 * 1000, // 1 minute
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
        enabled: !!bookingId, // Only run if bookingId exists
        staleTime: 5 * 60 * 1000, // 5 minutes
        ...options,
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
            const response = await bookingService.getPrices(params)
            if (response.error) throw new Error(response.message || 'Failed to calculate price')
            return response.data || response
        },
        enabled: !!params?.weight && !!params?.serviceType,
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
        mutationFn: async ({ bookingId, data }) => {
            return await bookingService.updateBooking(bookingId, data)
        },

        onSuccess: (updatedBooking, variables) => {
            toast.success('Booking updated successfully!')

            // Update the specific booking in cache
            if (updatedBooking?.data) {
                queryClient.setQueryData(
                    queryKeys.bookings.detail(variables.bookingId),
                    updatedBooking.data
                )
            }

            // Invalidate lists to refresh
            queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all })
        },

        onError: (error) => {
            const message = error.response?.data?.message || 'Failed to update booking'
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

        onSuccess: () => {
            toast.success('Booking cancelled successfully!')

            // Invalidate all booking queries to refresh
            queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all })
        },

        onError: (error) => {
            const message = error.response?.data?.message || 'Failed to cancel booking'
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

        onSuccess: (newBooking) => {
            toast.success('Booking created successfully!')

            // Invalidate bookings list
            queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all })

            return newBooking
        },

        onError: (error) => {
            const message = error.response?.data?.message || 'Failed to create booking'
            toast.error(message)
        },
    })
}

/**
 * Pay for booking mutation
 */
export function usePayBookingMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ bookingId, paymentData }) => {
            return await bookingService.payForBooking(bookingId, paymentData)
        },

        onSuccess: (response, variables) => {
            // Update booking status in cache
            queryClient.invalidateQueries({
                queryKey: queryKeys.bookings.detail(variables.bookingId)
            })
            queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all })
        },

        onError: (error) => {
            const message = error.response?.data?.message || 'Payment failed'
            toast.error(message)
        },
    })
}
