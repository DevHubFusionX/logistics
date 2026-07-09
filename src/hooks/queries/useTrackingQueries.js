import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../lib/queryClient'
import { bookingService } from '@/features/booking'
import toast from 'react-hot-toast'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Track a shipment by ID or tracking number
 */
export function useTrackingQuery(trackingId, options = {}) {
    return useQuery({
        queryKey: queryKeys.shipments.tracking(trackingId),
        queryFn: async () => {
            await delay(800)
            const normalizedId = trackingId?.trim().toUpperCase()
            if (normalizedId === 'DARA-BK100190726') {
                return {
                    id: normalizedId,
                    status: 'in_transit',
                    origin: 'Lagos (Ketu)',
                    destination: 'Abuja (Garki)',
                    currentLocation: 'Lokoja Bypass',
                    estimatedDelivery: new Date(Date.now() + 86400000).toLocaleDateString(),
                    driver: 'Alhaji Musa Ibrahim',
                    vehicle: 'LSD-849XX (Reefer Truck)',
                    temperature: '4.2°C',
                    timeline: [
                        {
                            status: 'Booked',
                            date: new Date(Date.now() - 172800000).toLocaleString(),
                            completed: true
                        },
                        {
                            status: 'Confirmed',
                            date: new Date(Date.now() - 129600000).toLocaleString(),
                            completed: true
                        },
                        {
                            status: 'In Transit',
                            date: new Date(Date.now() - 43200000).toLocaleString(),
                            completed: true
                        },
                        {
                            status: 'Delivered',
                            date: 'Pending',
                            completed: false
                        }
                    ]
                }
            }

            if (normalizedId === 'DARA-BK200290726') {
                return {
                    id: normalizedId,
                    status: 'delivered',
                    origin: 'Ibadan (Challenge)',
                    destination: 'Port Harcourt (GRA)',
                    currentLocation: 'Port Harcourt (GRA)',
                    estimatedDelivery: new Date(Date.now() - 18000000).toLocaleDateString(),
                    driver: 'Chinedu Okafor',
                    vehicle: 'KJA-732YY (Reefer Truck)',
                    temperature: '-18.2°C',
                    timeline: [
                        {
                            status: 'Booked',
                            date: new Date(Date.now() - 259200000).toLocaleString(),
                            completed: true
                        },
                        {
                            status: 'Confirmed',
                            date: new Date(Date.now() - 216000000).toLocaleString(),
                            completed: true
                        },
                        {
                            status: 'In Transit',
                            date: new Date(Date.now() - 129600000).toLocaleString(),
                            completed: true
                        },
                        {
                            status: 'Delivered',
                            date: new Date(Date.now() - 18000000).toLocaleString(),
                            completed: true
                        }
                    ]
                }
            }

            throw new Error("Shipment not found. Please verify the tracking number.")
        },
        enabled: !!trackingId, // Only run if trackingId exists
        staleTime: 0,
        gcTime: 0,
        cacheTime: 0,
        retry: false,
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
            await delay(800)
            const normalizedId = shipmentId?.trim().toUpperCase()
            if (normalizedId === 'DARA-BK100190726') {
                return {
                    id: normalizedId,
                    status: 'in_transit',
                    customerName: 'Demo Client',
                    customerEmail: 'demo@daraexpress.com',
                    customerPhone: '+234 800 123 4567',
                    pickupAddress: 'Plot 12, Ketu Industrial Estate, Lagos',
                    deliveryAddress: 'Block 5, Garki Shopping Complex, Abuja',
                    pickupCity: 'Lagos',
                    deliveryCity: 'Abuja',
                    weight: 1250,
                    cargoType: 'PHARMACEUTICALS',
                    serviceType: 'REEFER CONTAINER',
                    createdAt: new Date(Date.now() - 172800000).toLocaleString(),
                    pickupDate: new Date(Date.now() - 129600000).toLocaleString(),
                    estimatedDelivery: new Date(Date.now() + 86400000).toLocaleString(),
                    driver: {
                        name: 'Alhaji Musa Ibrahim',
                        phone: '+234 811 555 0199',
                        vehicle: 'Scania R450',
                        plate: 'LSD-849XX',
                        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'
                    },
                    currentLocation: {
                        city: 'Lokoja Bypass',
                        lat: '7.8024',
                        lng: '6.7333',
                        timestamp: new Date().toLocaleString()
                    },
                    timeline: [
                        { status: 'booking_created', label: 'Booking Created', timestamp: new Date(Date.now() - 172800000).toLocaleString(), completed: true, current: false },
                        { status: 'pending', label: 'Pending Review', timestamp: new Date(Date.now() - 151200000).toLocaleString(), completed: true, current: false },
                        { status: 'confirmed', label: 'Confirmed', timestamp: new Date(Date.now() - 129600000).toLocaleString(), completed: true, current: false },
                        { status: 'in_transit', label: 'In Transit', timestamp: new Date(Date.now() - 43200000).toLocaleString(), completed: true, current: true },
                        { status: 'delivered', label: 'Delivered', timestamp: null, completed: false, current: false }
                    ]
                }
            }

            if (normalizedId === 'DARA-BK200290726') {
                return {
                    id: normalizedId,
                    status: 'delivered',
                    customerName: 'Demo Client 2',
                    customerEmail: 'demo2@daraexpress.com',
                    customerPhone: '+234 800 987 6543',
                    pickupAddress: 'Block C, Challenge Auto Center, Ibadan',
                    deliveryAddress: 'Phase 2, GRA, Port Harcourt',
                    pickupCity: 'Ibadan',
                    deliveryCity: 'Port Harcourt',
                    weight: 2300,
                    cargoType: 'FROZEN SEAFOOD',
                    serviceType: 'REEFER CONTAINER',
                    createdAt: new Date(Date.now() - 259200000).toLocaleString(),
                    pickupDate: new Date(Date.now() - 216000000).toLocaleString(),
                    estimatedDelivery: new Date(Date.now() - 18000000).toLocaleString(),
                    driver: {
                        name: 'Chinedu Okafor',
                        phone: '+234 811 555 9988',
                        vehicle: 'Scania G410',
                        plate: 'KJA-732YY',
                        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256'
                    },
                    currentLocation: {
                        city: 'Port Harcourt (GRA)',
                        lat: '4.8156',
                        lng: '7.0498',
                        timestamp: new Date(Date.now() - 18000000).toLocaleString()
                    },
                    timeline: [
                        { status: 'booking_created', label: 'Booking Created', timestamp: new Date(Date.now() - 259200000).toLocaleString(), completed: true, current: false },
                        { status: 'pending', label: 'Pending Review', timestamp: new Date(Date.now() - 237600000).toLocaleString(), completed: true, current: false },
                        { status: 'confirmed', label: 'Confirmed', timestamp: new Date(Date.now() - 216000000).toLocaleString(), completed: true, current: false },
                        { status: 'in_transit', label: 'In Transit', timestamp: new Date(Date.now() - 129600000).toLocaleString(), completed: true, current: false },
                        { status: 'delivered', label: 'Delivered', timestamp: new Date(Date.now() - 18000000).toLocaleString(), completed: true, current: true }
                    ]
                }
            }

            throw new Error("Shipment not found. Please verify the tracking number.")
        },
        enabled: !!shipmentId,
        staleTime: 0,
        gcTime: 0,
        cacheTime: 0,
        retry: false,
        refetchInterval: (data) =>
            data?.status !== 'delivered' && data?.status !== 'cancelled' ? 30000 : false
    })
}

