import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import bookingService from '../../services/bookingService'

/**
 * Hook for fetching bookings (Admin view)
 */
export function useAdminBookingsQuery(params = {}) {
  return useQuery({
    queryKey: ['admin', 'bookings-list', params],
    queryFn: async () => {
      const response = await bookingService.getAdminBookings(params)
      return response.data
    },
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Hook for Booking Mutations
 */
export function useBookingMutations() {
  const queryClient = useQueryClient()

  const updateBookingStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      const response = await bookingService.updateAdminBooking(id, { status })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'bookings-list'] })
    }
  })

  return { updateBookingStatus }
}
