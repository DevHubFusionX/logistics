import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import bookingService from '../services/bookingService'
import toast from 'react-hot-toast'

export const useBookings = (filters = { limit: 10, page: 1 }) => {
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['bookings', filters],
    queryFn: () => bookingService.getBookings(filters),
    select: (response) => response.data?.shipments || [],
    staleTime: 2 * 60 * 1000, // 2 minutes
  })

  const updateBookingMutation = useMutation({
    mutationFn: ({ bookingId, data }) => bookingService.updateBooking(bookingId, data),
    onSuccess: () => {
      toast.success('Booking updated successfully!')
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
    onError: () => {
      toast.error('Failed to update booking')
    },
  })

  const cancelBookingMutation = useMutation({
    mutationFn: (bookingId) => bookingService.cancelBooking(bookingId),
    onSuccess: () => {
      toast.success('Booking cancelled successfully!')
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
    onError: () => {
      toast.error('Failed to cancel booking')
    },
  })

  const updateBooking = async (bookingId, data) => {
    return updateBookingMutation.mutateAsync({ bookingId, data })
  }

  const cancelBooking = async (bookingId, confirmed = false) => {
    if (!confirmed && !window.confirm('Are you sure you want to cancel this booking?')) return
    return cancelBookingMutation.mutateAsync(bookingId)
  }

  return {
    bookings: data || [],
    loading: isLoading,
    error,
    updateBooking,
    cancelBooking,
    refetch
  }
}
