/**
 * Example Query Hooks for TanStack Query
 * 
 * This file demonstrates how to migrate from useApi/useApiCache to TanStack Query.
 * Use these patterns for data fetching throughout the application.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../lib/queryClient'
import bookingService from '../services/bookingService'
import authService from '../services/authService'

// ==================== QUERIES (GET requests) ====================

/**
 * Example: Fetch user bookings
 * 
 * Replaces: const { data, loading, error } = useApi(bookingService.getMyBookings)
 */
export function useBookingsQuery(filters = {}) {
    return useQuery({
        queryKey: queryKeys.bookings.list(filters),
        queryFn: () => bookingService.getMyBookings(filters),
        staleTime: 2 * 60 * 1000, // 2 minutes
    })
}

/**
 * Example: Fetch single booking details
 */
export function useBookingQuery(bookingId) {
    return useQuery({
        queryKey: queryKeys.bookings.detail(bookingId),
        queryFn: () => bookingService.getBookingById(bookingId),
        enabled: !!bookingId, // Only run if bookingId exists
    })
}

/**
 * Example: Fetch user profile
 */
export function useProfileQuery() {
    return useQuery({
        queryKey: queryKeys.auth.profile,
        queryFn: () => authService.getProfile(),
        staleTime: 10 * 60 * 1000, // 10 minutes
    })
}

// ==================== MUTATIONS (POST/PUT/DELETE) ====================

/**
 * Example: Create a new booking
 * 
 * Replaces: const { mutate, loading, error } = useMutation(bookingService.createBooking)
 */
export function useCreateBookingMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (bookingData) => bookingService.createBooking(bookingData),

        // Optimistic updates or cache invalidation
        onSuccess: () => {
            // Invalidate and refetch bookings list
            queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all })
        },

        onError: (error) => {
            console.error('Failed to create booking:', error)
        },
    })
}

/**
 * Example: Update booking
 */
export function useUpdateBookingMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }) => bookingService.updateBooking(id, data),

        onSuccess: (updatedBooking) => {
            // Update the specific booking in cache
            queryClient.setQueryData(
                queryKeys.bookings.detail(updatedBooking.id),
                updatedBooking
            )

            // Invalidate lists to refresh
            queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all })
        },
    })
}

/**
 * Example: Delete booking
 */
export function useDeleteBookingMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (bookingId) => bookingService.deleteBooking(bookingId),

        onSuccess: (_, bookingId) => {
            // Remove from cache
            queryClient.removeQueries({ queryKey: queryKeys.bookings.detail(bookingId) })

            // Invalidate lists
            queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all })
        },
    })
}

// ==================== USAGE EXAMPLES ====================

/**
 * Usage in components:
 * 
 * // Before (with useApi):
 * const { data: bookings, loading, error } = useApi(bookingService.getMyBookings)
 * 
 * // After (with TanStack Query):
 * const { data: bookings, isLoading, error } = useBookingsQuery()
 * 
 * // For mutations:
 * const createBooking = useCreateBookingMutation()
 * 
 * const handleSubmit = async (bookingData) => {
 *   try {
 *     await createBooking.mutateAsync(bookingData)
 *     toast.success('Booking created!')
 *   } catch (error) {
 *     toast.error('Failed to create booking')
 *   }
 * }
 * 
 * // Check mutation status:
 * {createBooking.isPending && <Spinner />}
 */

// ==================== ADVANCED PATTERNS ====================

/**
 * Example: Prefetching for better UX
 */
export function usePrefetchBooking() {
    const queryClient = useQueryClient()

    return (bookingId) => {
        queryClient.prefetchQuery({
            queryKey: queryKeys.bookings.detail(bookingId),
            queryFn: () => bookingService.getBookingById(bookingId),
        })
    }
}

/**
 * Example: Dependent queries
 */
export function useBookingWithDriver(bookingId) {
    // First fetch booking
    const { data: booking } = useBookingQuery(bookingId)

    // Then fetch driver details if booking has driver
    const { data: driver } = useQuery({
        queryKey: ['driver', booking?.driverId],
        queryFn: () => bookingService.getDriver(booking.driverId),
        enabled: !!booking?.driverId, // Only run if we have a driverId
    })

    return { booking, driver }
}
