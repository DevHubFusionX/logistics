import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../lib/queryClient'
import bookingService from '../../services/bookingService'
import toast from 'react-hot-toast'

/**
 * Track a shipment by ID or tracking number
 */
export function useTrackingQuery(trackingId, options = {}) {
    return useQuery({
        queryKey: queryKeys.shipments.tracking(trackingId),
        queryFn: async () => {
            const response = await bookingService.trackShipment(trackingId)
            const booking = response.data || response

            if (!booking) {
                throw new Error('No booking data received')
            }

            // Transform booking data to shipment tracking format
            return {
                id: booking.bookingId || booking._id,
                status: booking.status,
                origin: `${booking.pickupLocation?.city || 'N/A'}`,
                destination: `${booking.dropoffLocation?.city || 'N/A'}`,
                currentLocation: booking.currentLocation?.city || 'Tracking will be available once driver is assigned',
                estimatedDelivery: booking.estimatedDeliveryDate
                    ? new Date(booking.estimatedDeliveryDate).toLocaleDateString()
                    : 'TBD',
                driver: booking.driver?.name || 'Not assigned',
                vehicle: booking.vehicle?.registrationNumber || 'Not assigned',
                timeline: [
                    {
                        status: 'Booked',
                        date: new Date(booking.createdAt).toLocaleString(),
                        completed: true
                    },
                    {
                        status: 'Confirmed',
                        date: booking.confirmedAt ? new Date(booking.confirmedAt).toLocaleString() : 'Pending',
                        completed: ['confirmed', 'in_transit', 'delivered'].includes(booking.status)
                    },
                    {
                        status: 'In Transit',
                        date: booking.inTransitAt ? new Date(booking.inTransitAt).toLocaleString() : 'Pending',
                        completed: ['in_transit', 'delivered'].includes(booking.status)
                    },
                    {
                        status: 'Delivered',
                        date: booking.deliveredAt ? new Date(booking.deliveredAt).toLocaleString() : 'Pending',
                        completed: booking.status === 'delivered'
                    }
                ]
            }
        },
        enabled: !!trackingId, // Only run if trackingId exists
        staleTime: 30 * 1000, // 30 seconds - tracking data should refresh frequently
        retry: 3,
        ...options,
    })
}

/**
 * Fetch all shipments (admin view)
 */
export function useShipmentsQuery(filters = {}) {
    return useQuery({
        queryKey: queryKeys.shipments.list(filters),
        queryFn: async () => {
            const response = await bookingService.getBookings(filters)
            return response.data?.shipments || []
        },
        staleTime: 2 * 60 * 1000, // 2 minutes
    })
}

/**
 * Fetch detailed shipment info
 */
export function useShipmentDetailsQuery(shipmentId) {
    return useQuery({
        queryKey: queryKeys.shipments.detail(shipmentId),
        queryFn: async () => {
            const response = await bookingService.trackShipment(shipmentId)
            const booking = response.data || response

            if (!booking) throw new Error('Shipment not found')

            // Detailed mapping (same as old ShipmentTracking fetchShipment)
            return {
                id: booking.tracking_number || booking.bookingId || booking.id || booking._id,
                status: booking.status,
                customerName: booking.sender ? `${booking.sender.first_name} ${booking.sender.last_name}` : (booking.fullNameOrBusiness || 'Guest'),
                customerEmail: booking.sender?.email || booking.email,
                customerPhone: booking.sender?.phone || booking.contactPhone,
                pickupAddress: booking.origin || `${booking.pickupLocation?.address}, ${booking.pickupLocation?.city}`,
                deliveryAddress: booking.destination || `${booking.dropoffLocation?.address}, ${booking.dropoffLocation?.city}`,
                pickupCity: booking.origin?.split(',').pop()?.trim() || booking.pickupLocation?.city || 'Origin',
                deliveryCity: booking.destination?.split(',').pop()?.trim() || booking.dropoffLocation?.city || 'Destination',
                weight: booking.weight || booking.cargoWeightKg || 0,
                cargoType: (booking.package_type || booking.goodsType || 'Package').toUpperCase(),
                serviceType: (booking.service_type || booking.vehicleType || 'Standard').toUpperCase(),
                createdAt: new Date(booking.created_at || booking.createdAt).toLocaleString(),
                pickupDate: new Date(booking.created_at || booking.createdAt).toLocaleString(),
                estimatedDelivery: new Date(booking.estimated_delivery || booking.estimatedDeliveryDate).toLocaleString(),
                driver: booking.driver ? {
                    name: `${booking.driver.profile?.first_name || ''} ${booking.driver.profile?.last_name || ''}`.trim(),
                    phone: booking.driver.profile?.phone,
                    vehicle: `${booking.driver.vehicle?.make || ''} ${booking.driver.vehicle?.model || ''}`.trim(),
                    plate: booking.driver.vehicle?.plate_number,
                    photo: booking.driver.profile?.avatar_url
                } : null,
                currentLocation: booking.currentLocation || {},
                timeline: booking.events?.map(event => ({
                    status: event.status,
                    label: event.description,
                    timestamp: new Date(event.created_at).toLocaleString(),
                    completed: true
                })) || [
                        { status: 'booking_created', label: 'Booking Created', timestamp: new Date(booking.created_at || booking.createdAt).toLocaleString(), completed: true },
                        { status: 'pending', label: 'Pending Review', timestamp: null, completed: booking.status !== 'pending', current: booking.status === 'pending' },
                        { status: 'confirmed', label: 'Confirmed', timestamp: null, completed: ['confirmed', 'in_transit', 'delivered'].includes(booking.status), current: booking.status === 'confirmed' },
                        { status: 'in_transit', label: 'In Transit', timestamp: null, completed: ['in_transit', 'delivered'].includes(booking.status), current: booking.status === 'in_transit' },
                        { status: 'delivered', label: 'Delivered', timestamp: null, completed: booking.status === 'delivered', current: booking.status === 'delivered' }
                    ]
            }
        },
        enabled: !!shipmentId,
        staleTime: 30 * 1000,
        refetchInterval: (data) =>
            data?.status !== 'delivered' && data?.status !== 'cancelled' ? 30000 : false
    })
}

