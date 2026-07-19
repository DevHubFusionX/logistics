import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import tripService from '@/features/admin/services/tripService'
import bookingService from '@/features/booking/services/bookingService'
import toast from 'react-hot-toast'

// Maps trip status → booking status
const TRIP_TO_BOOKING_STATUS = {
  assigned:   'processing',
  started:    'in_transit',
  in_transit: 'in_transit',
  completed:  'delivered',
  cancelled:  'cancelled',
}

async function syncBookingStatus(trip, status) {
  const bookingId = typeof trip?.booking === 'object'
    ? (trip.booking?._id || trip.booking?.id)
    : trip?.booking
  if (!bookingId) return
  try {
    await bookingService.updateAdminBooking(bookingId, { status })
    console.log(`[syncBookingStatus] booking ${bookingId} → ${status}`)
  } catch (e) {
    console.warn('[syncBookingStatus] failed:', e.message)
  }
}

export function useTripsQuery(params = {}) {
    return useQuery({
        queryKey: ['admin', 'trips', params],
        queryFn: async () => {
            // Fetch all pages (API max limit=100) to get accurate stats
            let allRecords = []
            let page = 1
            let totalRecords = 0
            let pagination = {}

            while (true) {
                const response = await tripService.getTrips({ limit: 100, page, ...params })
                const apiData = response.data?.data || response.data
                const records = apiData?.records || apiData?.trips || (Array.isArray(apiData) ? apiData : [])
                pagination = apiData?.pagination || {}
                totalRecords = pagination.totalRecords ?? records.length

                allRecords = allRecords.concat(records)

                const hasNext = pagination.hasNext ?? (allRecords.length < totalRecords)
                if (!hasNext || records.length === 0) break
                page++
            }

            console.log('[useTripsQuery] total fetched:', allRecords.length, '| totalRecords:', totalRecords)
            return { records: allRecords, pagination: { ...pagination, totalRecords } }
        },
        staleTime: 2 * 60 * 1000,
        retry: 1,
    })
}

export function useTripMutations() {
    const queryClient = useQueryClient()

    const createTrip = useMutation({
        mutationFn: (data) => tripService.createTrip(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'trips'] })
            toast.success('Trip created successfully')
        },
        onError: (error) => toast.error(error.message || 'Failed to create trip')
    })

    const assignTripDriver = useMutation({
        mutationFn: ({ tripId, driverId, origin }) =>
            tripService.assignDriver(tripId, { driverId, ...(origin && { origin }) }),
        onSuccess: async (response) => {
            console.log('[assignTripDriver] success response:', response)
            const trip = response.data?.data || response.data
            await syncBookingStatus(trip, TRIP_TO_BOOKING_STATUS.assigned)
            queryClient.invalidateQueries({ queryKey: ['admin', 'trips'] })
            queryClient.invalidateQueries({ queryKey: ['admin', 'all-bookings'] })
            queryClient.invalidateQueries({ queryKey: ['admin', 'user-bookings'] })
            queryClient.invalidateQueries({ queryKey: ['bookings', 'user-list'] })
            toast.success('Driver assigned to trip')
        },
        onError: (error) => {
            console.error('[assignTripDriver] error:', error)
            toast.error(error.message || 'Failed to assign driver to trip')
        }
    })

    const startTripMutation = useMutation({
        mutationFn: async ({ tripId }) => {
            const response = await tripService.getTrip(tripId)
            const trip = response.data?.data || response.data
            if (trip) {
                await syncBookingStatus(trip, 'in_transit')
            }
            toast.success('Trip started (Simulated)')
            return { id: tripId, status: 'in_transit' }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'trips'] })
            queryClient.invalidateQueries({ queryKey: ['admin', 'all-bookings'] })
            queryClient.invalidateQueries({ queryKey: ['admin', 'user-bookings'] })
            queryClient.invalidateQueries({ queryKey: ['bookings', 'user-list'] })
        }
    })

    const completeTripMutation = useMutation({
        mutationFn: async ({ tripId }) => {
            const response = await tripService.getTrip(tripId)
            const trip = response.data?.data || response.data
            if (trip) {
                await syncBookingStatus(trip, 'delivered')
            }
            toast.success('Trip completed (Simulated)')
            return { id: tripId, status: 'completed' }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'trips'] })
            queryClient.invalidateQueries({ queryKey: ['admin', 'all-bookings'] })
            queryClient.invalidateQueries({ queryKey: ['admin', 'user-bookings'] })
            queryClient.invalidateQueries({ queryKey: ['bookings', 'user-list'] })
        }
    })

    const cancelTripMutation = useMutation({
        mutationFn: async ({ tripId }) => {
            const response = await tripService.getTrip(tripId)
            const trip = response.data?.data || response.data
            if (trip) {
                await syncBookingStatus(trip, 'cancelled')
            }
            toast.success('Trip cancelled (Simulated)')
            return { id: tripId, status: 'cancelled' }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'trips'] })
            queryClient.invalidateQueries({ queryKey: ['admin', 'all-bookings'] })
            queryClient.invalidateQueries({ queryKey: ['admin', 'user-bookings'] })
            queryClient.invalidateQueries({ queryKey: ['bookings', 'user-list'] })
        }
    })

    return { createTrip, assignTripDriver, startTripMutation, completeTripMutation, cancelTripMutation }
}
