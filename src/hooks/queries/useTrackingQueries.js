import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../lib/queryClient'
import { bookingService } from '@/features/booking'
import httpClient from '@/services/httpClient'
import toast from 'react-hot-toast'
import { useAuthStore } from '../../stores/authStore'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const demoLocations = [
    { city: 'Lagos (Ketu)', state: 'Lagos State', lat: '6.5976', lng: '3.3853' },
    { city: 'Ibadan Bypass', state: 'Oyo State', lat: '7.3775', lng: '3.9470' },
    { city: 'Lokoja Bypass', state: 'Kogi State', lat: '7.8024', lng: '6.7333' },
    { city: 'Abuja (Garki)', state: 'FCT', lat: '9.0192', lng: '7.4184' }
]

const kanoLocations = [
    { city: 'Lagos (Ketu)', state: 'Lagos State', lat: '6.5976', lng: '3.3853' },
    { city: 'Ilorin Bypass', state: 'Kwara State', lat: '8.4799', lng: '4.5418' },
    { city: 'Kaduna Bypass', state: 'Kaduna State', lat: '10.5105', lng: '7.4165' },
    { city: 'Kano (Fagge)', state: 'Kano State', lat: '12.0022', lng: '8.5920' }
]

function getDemoStep() {
    // Advance step once every 2 hours (7,200,000 ms)
    return Math.floor(Date.now() / 7200000) % demoLocations.length
}

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
                const loc = demoLocations[demoLocations.length - 1]
                const status = 'delivered'

                const result = {
                    id: normalizedId,
                    status: status,
                    origin: 'Lagos (Ketu)',
                    destination: 'Abuja (Garki)',
                    currentLocation: `${loc.city}, ${loc.state}`,
                    estimatedDelivery: new Date(Date.now() - 18000000).toLocaleString(),
                    driver: 'Alhaji Musa Ibrahim',
                    vehicle: 'LSD-849XX (Reefer Truck)',
                    temperature: '-10°C',
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
                            date: new Date(Date.now() - 18000000).toLocaleString(),
                            completed: true
                        }
                    ]
                }
                return result
            }

            if (normalizedId === 'DARA-BK300390726') {
                const loc = kanoLocations[kanoLocations.length - 1]
                const status = 'delivered'

                const result = {
                    id: normalizedId,
                    status: status,
                    origin: 'Lagos (Ketu)',
                    destination: 'Kano (Fagge)',
                    currentLocation: `${loc.city}, ${loc.state}`,
                    estimatedDelivery: new Date(Date.now() - 18000000).toLocaleString(),
                    driver: 'Haruna Yusuf',
                    vehicle: 'KND-912YY (Reefer Truck)',
                    temperature: '-10.5°C',
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
                            date: new Date(Date.now() - 18000000).toLocaleString(),
                            completed: true
                        }
                    ]
                }
                return result
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

            if (/^[0-9a-fA-F]{24}$/.test(trackingId?.trim())) {
                if (!httpClient.getToken()) {
                    throw new Error("Shipment not found. Please verify the tracking number.")
                }
                let booking = null
                const tid = trackingId.trim()
                console.log('[TRACK] Searching for booking ID:', tid)

                // 1. Try user's own bookings list (no populate, reliable)
                try {
                    const listResponse = await bookingService.getBookings({ limit: 200 })
                    const { records } = httpClient.extractList(listResponse)
                    console.log('[TRACK] Step 1 - user bookings list records count:', records.length, 'IDs:', records.map(b => b._id))
                    booking = records.find(b => b._id === tid)
                    console.log('[TRACK] Step 1 result:', booking ? 'FOUND' : 'not found')
                } catch (listErr) {
                    console.warn('[TRACK] Step 1 failed:', listErr.message)
                }

                // 2. Try all-bookings list endpoint (no populate, reliable)
                if (!booking) {
                    try {
                        const allResponse = await httpClient.request('/bookings/', {}, { limit: 200 })
                        console.log('[TRACK] Step 2 - all bookings raw response:', allResponse)
                        const { records } = httpClient.extractList(allResponse)
                        console.log('[TRACK] Step 2 - all bookings records count:', records.length)
                        booking = records.find(b => b._id === tid)
                        console.log('[TRACK] Step 2 result:', booking ? 'FOUND' : 'not found')
                    } catch (allErr) {
                        console.warn('[TRACK] Step 2 failed:', allErr.message)
                    }
                }

                // 3. Try admin bookings list
                if (!booking) {
                    try {
                        const adminListResponse = await bookingService.getAdminBookings({ limit: 200 })
                        const { records } = httpClient.extractList(adminListResponse)
                        console.log('[TRACK] Step 3 - admin bookings records count:', records.length)
                        booking = records.find(b => b._id === tid)
                        console.log('[TRACK] Step 3 result:', booking ? 'FOUND' : 'not found')
                    } catch (adminErr) {
                        console.warn('[TRACK] Step 3 failed:', adminErr.message)
                    }
                }

                // 4. Last resort: direct by-ID call (may fail due to populate)
                if (!booking) {
                    try {
                        const response = await bookingService.getBookingById(tid)
                        console.log('[TRACK] Step 4 - direct by-ID raw response:', response)
                        const extracted = httpClient.extractData(response)
                        if (extracted && extracted._id) {
                            booking = extracted
                        }
                        console.log('[TRACK] Step 4 result:', booking ? 'FOUND' : 'not found')
                    } catch (err) {
                        console.warn('[TRACK] Step 4 failed:', err.message)
                    }
                }

                console.log('[TRACK] Final booking object:', booking)

                if (booking) {
                    let status = booking.status || 'pending'
                    let driverObj = booking.truck?.driver
                    let truckObj = booking.truck
                    let trip = null

                    try {
                        const isAdmin = useAuthStore.getState().getIsAdmin()
                        const tripsResponse = isAdmin
                            ? await httpClient.request('/trips/admins', {}, { limit: 100 })
                            : await httpClient.request('/trips', {}, { limit: 100 })
                        console.log('[TRACK] Trips raw response:', tripsResponse)
                        const tripsData = tripsResponse.data?.data || tripsResponse.data || {}
                        const trips = tripsData.records || (Array.isArray(tripsData) ? tripsData : [])
                        console.log('[TRACK] Trips count:', trips.length)

                        const bId = booking._id || booking.id
                        trip = trips.find(t => {
                            const tBookingId = typeof t.booking === 'object' ? (t.booking?._id || t.booking?.id) : t.booking
                            return tBookingId === bId
                        })
                        console.log('[TRACK] Matched trip:', trip)

                        if (trip) {
                            if (trip.status === 'active') {
                                status = 'in_transit'
                            } else if (trip.status === 'completed') {
                                status = 'delivered'
                            } else if (trip.status === 'canceled') {
                                status = 'cancelled'
                            }
                            if (trip.driver) {
                                driverObj = trip.driver
                            }
                        }
                    } catch (tripErr) {
                        console.warn('[TRACK] Failed to fetch trips:', tripErr.message)
                    }

                    const timeline = [
                        {
                            status: 'Booked',
                            date: new Date(booking.createdAt).toLocaleString(),
                            completed: true
                        },
                        {
                            status: 'Confirmed',
                            date: status !== 'pending' ? new Date(booking.updatedAt).toLocaleString() : '---',
                            completed: status !== 'pending'
                        },
                        {
                            status: 'In Transit',
                            date: ['in_transit', 'delivered'].includes(status) ? new Date(booking.updatedAt).toLocaleString() : '---',
                            completed: ['in_transit', 'delivered'].includes(status)
                        },
                        {
                            status: 'Delivered',
                            date: status === 'delivered' ? new Date(booking.updatedAt).toLocaleString() : '---',
                            completed: status === 'delivered'
                        }
                    ]
                    
                    const loc = booking.dropoffLocation
                    const destString = loc ? (typeof loc === 'string' ? loc : `${loc.city || ''} ${loc.address || ''}`.trim()) : ''
                    const pickupLoc = booking.pickupLocation
                    const originString = pickupLoc ? (typeof pickupLoc === 'string' ? pickupLoc : `${pickupLoc.city || ''} ${pickupLoc.address || ''}`.trim()) : ''
                    
                    return {
                        id: booking._id,
                        tripId: trip?._id || trip?.id,
                        status: status,
                        origin: originString || 'Lagos',
                        destination: destString || 'Destination',
                        pickupCoordinates: booking.pickupCoordinates || null,
                        dropOffCoordinates: booking.dropOffCoordinates || null,
                        currentLocation: status === 'delivered' ? destString : (originString || 'In Transit'),
                        estimatedDelivery: booking.estimatedDeliveryDate ? new Date(booking.estimatedDeliveryDate).toLocaleDateString() : 'TBD',
                        driver: driverObj?.name || 'Assigning Driver...',
                        vehicle: truckObj && typeof truckObj === 'object' ? `${truckObj.color || ''} ${truckObj.make || ''} ${truckObj.model || ''} (${truckObj.plateNumber || ''})`.trim() : 'Assigning Vehicle...',
                        temperature: booking.tempControlCelsius ? `${booking.tempControlCelsius}°C` : 'N/A',
                        timeline: timeline
                    }
                }
            }

            throw new Error("Shipment not found. Please verify the tracking number.")
        },
        enabled: !!trackingId, // Only run if trackingId exists
        staleTime: 0,
        gcTime: 0,
        cacheTime: 0,
        retry: false,
        refetchInterval: (data) =>
            data?.status !== 'delivered' && data?.status !== 'cancelled' ? 30000 : false,
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
            return httpClient.extractList(response).records
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
                const loc = demoLocations[demoLocations.length - 1]
                const status = 'delivered'

                const result = {
                    id: normalizedId,
                    status: status,
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
                    estimatedDelivery: new Date(Date.now() - 18000000).toLocaleString(),
                    driver: {
                        name: 'Alhaji Musa Ibrahim',
                        phone: '+234 811 555 0199',
                        vehicle: 'Scania R450',
                        plate: 'LSD-849XX',
                        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'
                    },
                    currentLocation: {
                        city: `${loc.city}, ${loc.state}`,
                        lat: loc.lat,
                        lng: loc.lng,
                        timestamp: new Date().toLocaleString()
                    },
                    timeline: [
                        { status: 'booking_created', label: 'Booking Created', timestamp: new Date(Date.now() - 172800000).toLocaleString(), completed: true, current: false },
                        { status: 'pending', label: 'Pending Review', timestamp: new Date(Date.now() - 151200000).toLocaleString(), completed: true, current: false },
                        { status: 'confirmed', label: 'Confirmed', timestamp: new Date(Date.now() - 129600000).toLocaleString(), completed: true, current: false },
                        { status: 'in_transit', label: 'In Transit', timestamp: new Date(Date.now() - 43200000).toLocaleString(), completed: true, current: false },
                        { status: 'delivered', label: 'Delivered', timestamp: new Date(Date.now() - 18000000).toLocaleString(), completed: true, current: true }
                    ]
                }
                return result
            }

            if (normalizedId === 'DARA-BK300390726') {
                const loc = kanoLocations[kanoLocations.length - 1]
                const status = 'delivered'

                const result = {
                    id: normalizedId,
                    status: status,
                    customerName: 'Demo Client 3',
                    customerEmail: 'demo3@daraexpress.com',
                    customerPhone: '+234 800 555 4321',
                    pickupAddress: 'Plot 12, Ketu Industrial Estate, Lagos',
                    deliveryAddress: 'Checkpoint Road, Fagge, Kano',
                    pickupCity: 'Lagos',
                    deliveryCity: 'Kano',
                    weight: 3100,
                    cargoType: 'FROZEN MEAT',
                    serviceType: 'REEFER CONTAINER',
                    createdAt: new Date(Date.now() - 172800000).toLocaleString(),
                    pickupDate: new Date(Date.now() - 129600000).toLocaleString(),
                    estimatedDelivery: new Date(Date.now() - 18000000).toLocaleString(),
                    driver: {
                        name: 'Haruna Yusuf',
                        phone: '+234 802 555 0122',
                        vehicle: 'Volvo FH16',
                        plate: 'KND-912YY',
                        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256'
                    },
                    currentLocation: {
                        city: `${loc.city}, ${loc.state}`,
                        lat: loc.lat,
                        lng: loc.lng,
                        timestamp: new Date().toLocaleString()
                    },
                    timeline: [
                        { status: 'booking_created', label: 'Booking Created', timestamp: new Date(Date.now() - 172800000).toLocaleString(), completed: true, current: false },
                        { status: 'pending', label: 'Pending Review', timestamp: new Date(Date.now() - 151200000).toLocaleString(), completed: true, current: false },
                        { status: 'confirmed', label: 'Confirmed', timestamp: new Date(Date.now() - 129600000).toLocaleString(), completed: true, current: false },
                        { status: 'in_transit', label: 'In Transit', timestamp: new Date(Date.now() - 43200000).toLocaleString(), completed: true, current: false },
                        { status: 'delivered', label: 'Delivered', timestamp: new Date(Date.now() - 18000000).toLocaleString(), completed: true, current: true }
                    ]
                }
                return result
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

            if (/^[0-9a-fA-F]{24}$/.test(shipmentId?.trim())) {
                if (!httpClient.getToken()) {
                    throw new Error("Shipment not found. Please verify the tracking number.")
                }
                let booking = null
                const sid = shipmentId.trim()
                
                // 1. Try user's own bookings list (no populate, reliable)
                try {
                    const listResponse = await bookingService.getBookings({ limit: 200 })
                    const { records } = httpClient.extractList(listResponse)
                    booking = records.find(b => b._id === sid)
                } catch (listErr) {
                    console.warn('Failed to fetch user bookings list:', listErr)
                }

                // 2. Try all-bookings list endpoint (no populate, reliable)
                if (!booking) {
                    try {
                        const allResponse = await httpClient.request('/bookings/', {}, { limit: 200 })
                        const { records } = httpClient.extractList(allResponse)
                        booking = records.find(b => b._id === sid)
                    } catch (allErr) {
                        console.warn('Failed to fetch all bookings list:', allErr)
                    }
                }

                // 3. Try admin bookings list
                if (!booking) {
                    try {
                        const adminListResponse = await bookingService.getAdminBookings({ limit: 200 })
                        const { records } = httpClient.extractList(adminListResponse)
                        booking = records.find(b => b._id === sid)
                    } catch (adminErr) {
                        console.warn('Failed to fetch admin bookings list:', adminErr)
                    }
                }

                // 4. Last resort: direct by-ID call (may fail due to populate)
                if (!booking) {
                    try {
                        const response = await bookingService.getBookingById(sid)
                        const extracted = httpClient.extractData(response)
                        if (extracted && extracted._id) {
                            booking = extracted
                        }
                    } catch (err) {
                        console.warn('getBookingById details failed:', err)
                    }
                }

                if (booking) {
                    let status = booking.status || 'pending'
                    let driverObj = booking.truck?.driver
                    let truckObj = booking.truck

                    try {
                        const isAdmin = useAuthStore.getState().getIsAdmin()
                        const tripsResponse = isAdmin
                            ? await httpClient.request('/trips/admins', {}, { limit: 100 })
                            : await httpClient.request('/trips', {}, { limit: 100 })
                        const tripsData = tripsResponse.data?.data || tripsResponse.data || {}
                        const trips = tripsData.records || (Array.isArray(tripsData) ? tripsData : [])
                        
                        const bId = booking._id || booking.id
                        const trip = trips.find(t => {
                            const tBookingId = typeof t.booking === 'object' ? (t.booking?._id || t.booking?.id) : t.booking
                            return tBookingId === bId
                        })

                        if (trip) {
                            if (trip.status === 'active') {
                                status = 'in_transit'
                            } else if (trip.status === 'completed') {
                                status = 'delivered'
                            } else if (trip.status === 'canceled') {
                                status = 'cancelled'
                            }
                            if (trip.driver) {
                                driverObj = trip.driver
                            }
                        }
                    } catch (tripErr) {
                        console.warn('Failed to fetch trips for details tracking query:', tripErr)
                    }

                    const loc = booking.dropoffLocation
                    const destString = loc ? (typeof loc === 'string' ? loc : `${loc.city || ''} ${loc.address || ''}`.trim()) : ''
                    const pickupLoc = booking.pickupLocation
                    const originString = pickupLoc ? (typeof pickupLoc === 'string' ? pickupLoc : `${pickupLoc.city || ''} ${pickupLoc.address || ''}`.trim()) : ''
                    const originCity = pickupLoc ? (typeof pickupLoc === 'string' ? pickupLoc : (pickupLoc.city || '')) : ''
                    
                    const timeline = [
                        { status: 'booking_created', label: 'Booking Created', timestamp: new Date(booking.createdAt).toLocaleString(), completed: true, current: status === 'pending' },
                        { status: 'pending', label: 'Pending Review', timestamp: status !== 'pending' ? new Date(booking.updatedAt).toLocaleString() : '---', completed: status !== 'pending', current: status === 'pending' },
                        { status: 'confirmed', label: 'Confirmed', timestamp: ['confirmed', 'processing', 'in_transit', 'delivered'].includes(status) ? new Date(booking.updatedAt).toLocaleString() : '---', completed: ['confirmed', 'processing', 'in_transit', 'delivered'].includes(status), current: status === 'confirmed' || status === 'processing' },
                        { status: 'in_transit', label: 'In Transit', timestamp: ['in_transit', 'delivered'].includes(status) ? new Date(booking.updatedAt).toLocaleString() : '---', completed: ['in_transit', 'delivered'].includes(status), current: status === 'in_transit' },
                        { status: 'delivered', label: 'Delivered', timestamp: status === 'delivered' ? new Date(booking.updatedAt).toLocaleString() : '---', completed: status === 'delivered', current: status === 'delivered' }
                    ]

                    return {
                        id: booking._id,
                        tripId: trip?._id || trip?.id,
                        status: status,
                        customerName: booking.fullNameOrBusiness || 'Client',
                        customerEmail: booking.email || '',
                        customerPhone: booking.contactPhone || '',
                        pickupAddress: originString,
                        deliveryAddress: destString,
                        pickupCoordinates: booking.pickupCoordinates || null,
                        dropOffCoordinates: booking.dropOffCoordinates || null,
                        pickupCity: originCity || 'Lagos',
                        deliveryCity: loc?.city || '',
                        weight: booking.cargoWeightKg || 0,
                        cargoType: booking.goodsType || 'General Cargo',
                        serviceType: booking.vehicleType || 'Standard Truck',
                        createdAt: new Date(booking.createdAt).toLocaleString(),
                        pickupDate: booking.estimatedPickupDate ? new Date(booking.estimatedPickupDate).toLocaleString() : 'TBD',
                        estimatedDelivery: booking.estimatedDeliveryDate ? new Date(booking.estimatedDeliveryDate).toLocaleString() : 'TBD',
                        driver: driverObj ? {
                            name: driverObj.name || 'Driver',
                            phone: driverObj.phoneNumber || '',
                            vehicle: truckObj && typeof truckObj === 'object' ? `${truckObj.make || ''} ${truckObj.model || ''}`.trim() : 'Truck',
                            plate: truckObj && typeof truckObj === 'object' ? truckObj.plateNumber || '' : '',
                            photo: driverObj.passportPhoto?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'
                        } : null,
                        currentLocation: {
                            city: status === 'delivered' ? (loc?.city || 'Destination') : (originCity || 'Origin'),
                            lat: status === 'delivered' ? (booking.dropOffCoordinates?.lat || 0) : 0,
                            lng: status === 'delivered' ? (booking.dropOffCoordinates?.lng || 0) : 0,
                            timestamp: new Date().toLocaleString()
                        },
                        timeline: timeline
                    }
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

/**
 * Fetch trips for the logged-in user context
 */
export function useTripsQuery(filters = {}) {
    const { user } = useAuthStore()
    
    return useQuery({
        queryKey: ['trips', 'list', filters],
        queryFn: async () => {
            const isAdmin = ['Super Admin', 'Dispatcher', 'Admin Manager'].includes(user?.role)
            const endpoint = isAdmin ? '/trips/admins' : '/trips'
            const response = await httpClient.request(endpoint, {}, filters)
            return httpClient.extractList(response)
        },
        enabled: !!user,
        staleTime: 30000,
    })
}

/**
 * Mutation to start a trip (Driver only)
 */
export function useStartTripMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (tripId) => {
            const response = await httpClient.request(`/trips/start/${tripId}`, {
                method: 'PATCH'
            })
            return httpClient.extractData(response)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trips'] })
            queryClient.invalidateQueries({ queryKey: ['bookings'] })
            queryClient.invalidateQueries({ queryKey: ['shipments'] })
        }
    })
}

/**
 * Mutation to end a trip (Driver only)
 */
export function useEndTripMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (tripId) => {
            const response = await httpClient.request(`/trips/end/${tripId}`, {
                method: 'PATCH'
            })
            return httpClient.extractData(response)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trips'] })
            queryClient.invalidateQueries({ queryKey: ['bookings'] })
            queryClient.invalidateQueries({ queryKey: ['shipments'] })
        }
    })
}

/**
 * Fetch a customer Firebase custom token for a trip
 */
export function useTripUserTokenQuery(tripId, options = {}) {
    return useQuery({
        queryKey: ['trips', 'token', 'user', tripId],
        queryFn: async () => {
            const response = await httpClient.request(`/trips/token/users/${tripId}`)
            return httpClient.extractData(response)
        },
        enabled: !!tripId,
        staleTime: 5 * 60 * 1000, // 5 minutes cache
        ...options
    })
}

/**
 * Fetch a driver Firebase custom token for a trip
 */
export function useTripDriverTokenQuery(tripId, options = {}) {
    return useQuery({
        queryKey: ['trips', 'token', 'driver', tripId],
        queryFn: async () => {
            const response = await httpClient.request(`/trips/token/drivers/${tripId}`)
            return httpClient.extractData(response)
        },
        enabled: !!tripId,
        staleTime: 5 * 60 * 1000, // 5 minutes cache
        ...options
    })
}
