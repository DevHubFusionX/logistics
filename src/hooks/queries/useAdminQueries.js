import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../lib/queryClient'
import clientService from '../../services/clientService'
import driverService from '../../services/driverService'
import fleetService from '../../services/fleetService'
import reportService from '../../services/reportService'
import dashboardService from '../../services/dashboardService'
import pricingService from '../../services/pricingService'
import adminService from '../../services/adminService'
import toast from 'react-hot-toast'

/**
 * Hook for fetching all clients/customers
 */
export function useCustomersQuery(params = {}) {
    return useQuery({
        queryKey: queryKeys.admin.customers(params),
        queryFn: async () => {
            const response = await clientService.getClients(params)
            // getClients now returns { data: { records, pagination }, status }
            const rawUsers = response.data?.records || []

            return rawUsers.map(user => ({
                ...user,
                id: user._id || user.id,
                name: user.fullNameOrBusiness || user.companyName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unnamed Client',
                contactName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.fullNameOrBusiness || 'No Name',
                industry: user.clientCategory || user.customerType || 'Individual',
                accountOfficer: 'Standard Account',
                totalTrips: user.stats?.shipments || 0,
                revenue: user.stats?.volume || 0,
                paymentStatus: 'current',
                lastActive: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Never',
                joinedDate: user.createdAt,
                customPricing: {
                    baseRate: 2500,
                    discount: 0
                },
                address: user.address || 'No address provided',
                avatar: user.avatar || null
            }))
        },
        staleTime: 5 * 60 * 1000,
    })
}

/**
 * Hook for fetching a specific client's shipments (User Bookings)
 */
export function useClientShipmentsQuery(clientId, params = {}) {
    return useQuery({
        queryKey: ['admin', 'clients', clientId, 'shipments', params],
        queryFn: async () => {
            const response = await clientService.getClientShipments(clientId, params)
            // Handle new API structure { error, message, data: { records, pagination } }
            const apiBody = response.data
            const apiData = apiBody?.data || apiBody
            const records = apiData?.records || []
            const pagination = apiData?.pagination || {}

            // Normalize for the UI components
            const mappedRecords = records.map(booking => ({
                ...booking,
                id: booking._id || booking.id,
                trackingNumber: booking.tracking_number || booking._id,
                origin: booking.pickupLocation?.city || booking.pickupLocation?.address || 'N/A',
                destination: booking.dropoffLocation?.city || booking.dropoffLocation?.address || 'N/A',
                cost: booking.price || booking.shipping_fee || 0,
                status: booking.status
            }))

            return {
                records: mappedRecords,
                pagination
            }
        },
        enabled: !!clientId,
        staleTime: 2 * 60 * 1000,
    })
}

/**
 * Normalizes driver data from the API to match the frontend expectations
 */
const normalizeDriver = (driver) => ({
    ...driver,
    id: driver._id,
    name: `${driver.firstName || ''} ${driver.lastName || ''}`.trim() || 'Unnamed Driver',
    email: driver.email || '',
    phone: driver.phoneNumber || '',
    address: driver.residentialAddress || 'Not specified',
    emergencyContact: driver.nextOfKin || 'Not specified',
    joinDate: driver.createdAt ? new Date(driver.createdAt).toLocaleDateString() : 'N/A',

    // Document URLs
    ninSlipUrl: driver.ninSlip?.url,
    driversLicenseUrl: driver.driversLicense?.url,
    passportPhotoUrl: driver.passportPhoto?.url,
    medicalCertUrl: driver.medicalFitnessCertificate?.url,

    // UI Fallbacks for missing fields in API
    performanceScore: driver.performanceScore || 90, // Default to 90
    rating: driver.rating || 4.5,
    totalDeliveries: driver.totalDeliveries || 0,
    onTimeRate: driver.onTimeRate || 95,
    assignedTruck: driver.assignedTruck || 'None',
    licenseNumber: driver.licenseNumber || 'N/A',
    licenseExpiry: driver.licenseExpiry || 'N/A',

    status: driver.isActive ? 'active' : 'inactive'
})

/**
 * Hook for fetching all drivers/staff
 */
export function useDriversQuery(params = {}) {
    return useQuery({
        queryKey: queryKeys.admin.drivers(params),
        queryFn: async () => {
            const response = await driverService.getDrivers(params)
            // httpClient returns { data: { error, message, data: { records } }, status }
            const apiBody = response.data
            const rawDrivers = apiBody?.data?.records || []
            return rawDrivers.map(normalizeDriver)
        },
        staleTime: 5 * 60 * 1000,
    })
}

/**
 * Hook for fetching all managers
 */
export function useManagersQuery(params = {}) {
    return useQuery({
        queryKey: ['admin', 'managers', params],
        queryFn: async () => {
            const response = await adminService.getManagers(params)
            const apiBody = response.data?.data || response.data
            const records = apiBody?.records || apiBody || []
            
            return records.map(manager => ({
                ...manager,
                id: manager._id || manager.id,
                name: `${manager.firstName || ''} ${manager.lastName || ''}`.trim() || 'Unnamed Manager',
                status: manager.status || 'active',
                joinedDate: manager.createdAt
            }))
        },
        staleTime: 5 * 60 * 1000,
    })
}

/**
 * Hook for fetching a single driver's details
 */
export function useDriverQuery(driverId) {
    return useQuery({
        queryKey: ['admin', 'driver', driverId],
        queryFn: async () => {
            const response = await driverService.getDriver(driverId)
            // httpClient returns { data: { error, message, data: { records } }, status }
            const apiBody = response.data
            const driver = apiBody?.data?.records?.[0] || apiBody?.data
            return driver ? normalizeDriver(driver) : null
        },
        enabled: !!driverId,
        staleTime: 5 * 60 * 1000,
    })
}

/**
 * Hook for fetching a driver's assigned trips
 */
export function useDriverTripsQuery(driverId, params = {}) {
    return useQuery({
        queryKey: ['admin', 'driver', driverId, 'trips', params],
        queryFn: async () => {
            const response = await driverService.getDriverTrips(driverId, params)
            const apiBody = response.data
            // Backend usually returns { error, message, data: { records, pagination } }
            const apiData = apiBody?.data || apiBody
            return {
                records: apiData?.records || apiData?.trips || (Array.isArray(apiData) ? apiData : []),
                pagination: apiData?.pagination || {}
            }
        },
        enabled: !!driverId,
        staleTime: 5 * 60 * 1000,
    })
}

/**
 * Normalizes truck data from the API to match the frontend expectations
 */
const normalizeTruck = (truck) => ({
    ...truck,
    id: truck._id,
    plateNumber: (truck.plateNumber || '').trim(),
    make: (truck.make || '').trim(),
    model: (truck.model || '').trim(),
    vehicleType: (truck.vehicleType || '').trim(),
    chassisNumber: (truck.chassisNumber || '').trim(),
    engineNumber: (truck.engineNumber || '').trim(),
    truckCapacity: (truck.truckCapacity || '').trim(),
    yearOfManufacture: truck.yearOfManufacture || 'N/A',
    insuranceType: truck.insuranceType || 'N/A',
    temperatureRange: (truck.temperatureRange || '').trim(),
    reeferUnitBrand: (truck.reeferUnitBrand || '').trim(),
    reeferUnitModel: (truck.reeferUnitModel || '').trim(),
    lastMaintenanceDate: truck.lastMaintenanceDate ? new Date(truck.lastMaintenanceDate).toLocaleDateString() : 'N/A',
    telematicsProvider: (truck.telematicsProvider || '').trim(),
    trackerSimNumber: truck.trackerSimNumber || '',
    status: truck.isApproved ? 'approved' : 'pending',
    createdAt: truck.createdAt,
    driverId: truck.driver || null,

    // Document URLs
    vehicleRegistrationUrl: truck.vehicleRegistration?.url,
    proofOfOwnershipUrl: truck.proofOfOwnership?.url,
    insuranceDocumentUrl: truck.insuranceDocument?.url,
    temperatureCalibrationCertificateUrl: truck.temperatureCalibrationCertificate?.url,

    // Photo URLs
    frontPhotoUrl: truck.front?.url,
    backPhotoUrl: truck.back?.url,
    interiorPhotoUrl: truck.interior?.url,
    tiresPhotoUrl: truck.tires?.url,

    // Safety
    fireExtinguisherAvailable: truck.fireExtinguisherAvailable || false,
    reflectiveSafetyGear: truck.reflectiveSafetyGear || false,
    emergencyKit: truck.emergencyKit || false,
    spareTire: truck.spareTire || false,

    // Tracking
    gpsTrackingInstalled: truck.gpsTrackingInstalled || false,
    realTimeTrackingEnabled: truck.realTimeTrackingEnabled || false,
    coldChainComplianceStatus: truck.coldChainComplianceStatus || false,
})

/**
 * Hook for fetching fleet/trucks
 */
export function useFleetQuery(params = {}) {
    return useQuery({
        queryKey: queryKeys.admin.fleet(params),
        queryFn: async () => {
            const response = await fleetService.getTrucks(params)
            // httpClient returns { data: { error, message, data: { records, pagination } }, status }
            const apiBody = response.data
            const rawTrucks = apiBody?.data?.records || []
            const pagination = apiBody?.data?.pagination || {}
            
            return {
                records: rawTrucks.map(normalizeTruck),
                total: pagination.totalRecords || 0,
                pagination
            }
        },
        staleTime: 3 * 60 * 1000,
    })
}

/**
 * Hook for fetching global pricing rules
 */
export function usePricingRulesQuery() {
    return useQuery({
        queryKey: queryKeys.admin.pricing('global'),
        queryFn: async () => {
            const response = await pricingService.getGlobalRules()
            return response.data || response
        },
        staleTime: 10 * 60 * 1000,
    })
}

/**
 * Hook for fetching client-specific pricing overrides
 */
export function useClientOverridesQuery() {
    return useQuery({
        queryKey: queryKeys.admin.pricing('clients'),
        queryFn: async () => {
            const response = await pricingService.getClientOverrides()
            return response.data || response
        },
        staleTime: 10 * 60 * 1000,
    })
}

/**
 * Hook for fetching pricing audit log
 */
export function usePricingAuditQuery() {
    return useQuery({
        queryKey: queryKeys.admin.pricing('audit'),
        queryFn: async () => {
            const response = await pricingService.getAuditLog()
            return response.data || response
        },
        staleTime: 5 * 60 * 1000,
    })
}

/**
 * Hook for fetching money/revenue analytics
 */
export function useMoneyAnalyticsQuery(params = {}) {
    return useQuery({
        queryKey: ['admin', 'analytics', 'money', params],
        queryFn: async () => {
            const response = await dashboardService.getMoneyAnalytics(params)
            return response.data?.data || response.data || {}
        },
        staleTime: 5 * 60 * 1000,
    })
}

/**
 * Hook for fetching order/trip analytics
 */
export function useOrderAnalyticsQuery(params = {}) {
    return useQuery({
        queryKey: ['admin', 'analytics', 'orders', params],
        queryFn: async () => {
            const response = await dashboardService.getOrderAnalytics(params)
            return response.data?.data || response.data || {}
        },
        staleTime: 5 * 60 * 1000,
    })
}

/**
 * Hook for fetching truck/fleet analytics
 */
export function useTruckAnalyticsQuery(params = {}) {
    return useQuery({
        queryKey: ['admin', 'analytics', 'trucks', params],
        queryFn: async () => {
            const response = await dashboardService.getTruckAnalytics(params)
            return response.data?.data || response.data || {}
        },
        staleTime: 5 * 60 * 1000,
    })
}

/**
 * Hook for fetching various reports
 */
export function useReportsQuery(type, params = {}) {
    return useQuery({
        queryKey: ['admin', 'reports', type, params],
        queryFn: async () => {
            let response
            switch (type) {
                case 'fleet': response = await reportService.getFleetReport(params); break
                case 'drivers': response = await reportService.getDriverReport(params); break
                case 'financial': response = await reportService.getFinancialReport(params); break
                case 'trips': response = await reportService.getTripReport(params); break
                case 'customers': response = await reportService.getCustomerReport(params); break
                case 'bookings': response = await reportService.getBookingReport(params); break
                case 'dashboard': response = await reportService.getDashboardAnalytics(params); break
                default: throw new Error(`Unknown report type: ${type}`)
            }
            return response.data || response
        },
        staleTime: 5 * 60 * 1000,
        enabled: !!type
    })
}

/**
 * Mutations for Admin Actions
 */
export function useAdminMutations() {
    const queryClient = useQueryClient()

    const updateClientMutation = useMutation({
        mutationFn: ({ id, data }) => clientService.updateClient(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin'] })
            toast.success('Client updated successfully')
        }
    })

    const updateDriverMutation = useMutation({
        mutationFn: ({ id, data }) => driverService.updateDriver(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin'] })
            toast.success('Driver updated successfully')
        }
    })

    const createVehicleMutation = useMutation({
        mutationFn: (data) => fleetService.createTruck(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin'] })
            toast.success('Vehicle added successfully')
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to add vehicle')
        }
    })

    const updateVehicleMutation = useMutation({
        mutationFn: ({ id, data }) => fleetService.updateVehicle(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin'] })
            toast.success('Vehicle updated successfully')
        }
    })

    const updatePricingRulesMutation = useMutation({
        mutationFn: ({ rules, user }) => pricingService.updateGlobalRules(rules, user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin'] })
            toast.success('Pricing rules updated successfully')
        }
    })

    const manageClientOverrideMutation = useMutation({
        mutationFn: ({ action, id, data }) => {
            switch (action) {
                case 'add': return pricingService.addClientOverride(data)
                case 'update': return pricingService.updateClientOverride(id, data)
                case 'delete': return pricingService.deleteClientOverride(id)
                default: throw new Error(`Unknown action: ${action}`)
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin'] })
        }
    })

    const createManagerMutation = useMutation({
        mutationFn: (data) => adminService.createManager(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin'] })
            toast.success('Manager created successfully')
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to create manager')
        }
    })

    const updateManagerMutation = useMutation({
        mutationFn: ({ id, data }) => adminService.updateManager(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin'] })
            toast.success('Manager updated successfully')
        }
    })

    const deleteManagerMutation = useMutation({
        mutationFn: (id) => adminService.deleteManager(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin'] })
            toast.success('Manager deleted successfully')
        }
    })

    return {
        updateClient: updateClientMutation,
        updateDriver: updateDriverMutation,
        createVehicle: createVehicleMutation,
        updateVehicle: updateVehicleMutation,
        updatePricingRules: updatePricingRulesMutation,
        manageClientOverride: manageClientOverrideMutation,
        createManager: createManagerMutation,
        updateManager: updateManagerMutation,
        deleteManager: deleteManagerMutation
    }
}
