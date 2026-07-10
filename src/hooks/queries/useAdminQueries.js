import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../lib/queryClient'
import clientService from '../../services/clientService'
import driverService from '../../services/driverService'
import fleetService from '../../services/fleetService'
import reportService from '../../services/reportService'
import { dashboardService } from '@/features/dashboard'
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

const safeFormatDate = (dateVal) => {
    if (!dateVal) return 'N/A'
    const date = new Date(dateVal)
    return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString()
}

/**
 * Normalizes driver data from the API to match the frontend expectations
 */
const normalizeDriver = (driver) => {
    if (!driver) return null
    const isRejected = driver.status === 'rejected' || driver.isRejected || driver.rejectionReason || driver.reason
    const status = driver.status || (isRejected ? 'rejected' : driver.isActive ? 'active' : 'inactive')
    const verificationStatus = driver.verificationStatus || (isRejected ? 'rejected' : driver.isVerified ? 'verified' : 'unverified')

    const displayName = driver.name || `${driver.firstName || ''} ${driver.lastName || ''}`.trim() || driver.email || 'Unnamed Driver'
    const licenseNumber = driver.licenseNumber || driver.nin || 'N/A'
    const phoneNumber = driver.phone || driver.phoneNumber || driver.profile?.phone || ''

    return {
        ...driver,
        id: driver._id || driver.id,
        name: displayName,
        email: driver.email || driver.profile?.email || '',
        phone: phoneNumber,
        address: driver.address || driver.residentialAddress || 'Not specified',
        emergencyContact: driver.emergencyContact || driver.nextOfKin || 'Not specified',
        joinDate: safeFormatDate(driver.createdAt),

        // Document URLs
        ninSlipUrl: driver.ninSlip?.url,
        driversLicenseUrl: driver.driversLicense?.url,
        passportPhotoUrl: driver.passportPhoto?.url,
        medicalCertUrl: driver.medicalFitnessCertificate?.url,
        truckDrivingCertUrl: driver.truckDrivingCertification?.url,
        drugTestReportUrl: driver.drugTestReport?.url,

        // UI Fallbacks for missing fields in API
        performanceScore: driver.performanceScore || 90,
        rating: driver.rating || 4.5,
        totalDeliveries: driver.totalDeliveries || 0,
        onTimeRate: driver.onTimeRate || 95,
        assignedTruck: driver.assignedTruck || 'None',
        licenseNumber,
        licenseExpiry: driver.licenseExpiry || 'N/A',
        emailVerified: driver.emailVerified || false,

        // Verification status
        isVerified: driver.isVerified || false,
        isRejected: !!isRejected,
        rejectionReason: driver.rejectionReason || driver.reason || '',
        verificationStatus,
        status
    }
}

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
            if (import.meta.env.DEV) {
            }
            const normalized = rawDrivers.filter(Boolean).map(normalizeDriver).filter(Boolean)
            if (import.meta.env.DEV) {
            }
            return normalized
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
const normalizeTruck = (truck) => {
    if (!truck) return null

    // Derive status from multiple possible backend fields
    const rejectionReason = truck.rejectionReason || truck.reason || ''
    const isRejected = !!(truck.isRejected || rejectionReason)

    let status = 'pending'
    if (isRejected) status = 'rejected'
    else if (truck.isApproved) status = 'approved'
    // Also check if the backend sends a status string directly
    if (truck.status && typeof truck.status === 'string') status = truck.status

    if (import.meta.env.DEV) {
        console.debug('[normalizeTruck]', { _id: truck._id, isApproved: truck.isApproved, isRejected: truck.isRejected, rawStatus: truck.status, derivedStatus: status })
    }

    return {
        ...truck,
        id: truck._id,
        plateNumber: String(truck.plateNumber || '').trim(),
        make: String(truck.make || '').trim(),
        model: String(truck.model || '').trim(),
        vehicleType: String(truck.vehicleType || '').trim(),
        chassisNumber: String(truck.chassisNumber || '').trim(),
        engineNumber: String(truck.engineNumber || '').trim(),
        truckCapacity: String(truck.truckCapacity || '').trim(),
        yearOfManufacture: truck.yearOfManufacture || 'N/A',
        insuranceType: truck.insuranceType || 'N/A',
        temperatureRange: String(truck.temperatureRange || '').trim(),
        reeferUnitBrand: String(truck.reeferUnitBrand || '').trim(),
        reeferUnitModel: String(truck.reeferUnitModel || '').trim(),
        lastMaintenanceDate: safeFormatDate(truck.lastMaintenanceDate),
        telematicsProvider: String(truck.telematicsProvider || '').trim(),
        trackerSimNumber: truck.trackerSimNumber || '',
        status,
        rejectionReason: truck.rejectionReason || truck.reason || '',
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
    }
}

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
                records: rawTrucks.filter(Boolean).map(normalizeTruck).filter(Boolean),
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
        staleTime: 2 * 60 * 1000,
        refetchOnMount: 'always',
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
        staleTime: 2 * 60 * 1000,
        refetchOnMount: 'always',
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
        staleTime: 2 * 60 * 1000,
        refetchOnMount: 'always',
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
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.admin.customers() })
            queryClient.invalidateQueries({ queryKey: ['admin', 'clients', id] })
            toast.success('Client updated successfully')
        }
    })

    const updateDriverMutation = useMutation({
        mutationFn: ({ id, data }) => driverService.updateDriver(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.admin.drivers() })
            queryClient.invalidateQueries({ queryKey: ['admin', 'driver', id] })
            toast.success('Driver updated successfully')
        }
    })

    const createVehicleMutation = useMutation({
        mutationFn: (data) => fleetService.createTruck(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.admin.fleet() })
            toast.success('Vehicle added successfully')
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to add vehicle')
        }
    })

    const updateVehicleMutation = useMutation({
        mutationFn: ({ id, data }) => fleetService.updateTruck(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.admin.fleet() })
            toast.success('Vehicle updated successfully')
        }
    })

    const approveTruckMutation = useMutation({
        mutationFn: (id) => fleetService.approveTruck(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.admin.fleet() })
            toast.success('Truck approved successfully')
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to approve truck')
        }
    })

    const rejectTruckMutation = useMutation({
        mutationFn: ({ id, reason }) => {
            return fleetService.rejectTruck(id, reason)
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.admin.fleet() })
            toast.success('Truck rejected successfully')
        },
        onError: (error) => {
            console.error('[rejectTruck] Error:', error)
            toast.error(error.message || 'Failed to reject truck')
        }
    })

    const verifyDriverMutation = useMutation({
        mutationFn: (id) => driverService.verifyDriver(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'drivers'], exact: false })
            toast.success('Driver verified successfully')
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to verify driver')
        }
    })

    const rejectDriverMutation = useMutation({
        mutationFn: ({ id, reason }) => driverService.rejectDriver(id, reason),
        onSuccess: (_, { id, reason }) => {
            queryClient.setQueriesData({ queryKey: ['admin', 'drivers'], exact: false }, (old) => {
                if (!Array.isArray(old)) return old
                return old.map(d =>
                    (d._id === id || d.id === id)
                        ? { ...d, isRejected: true, rejectionReason: reason, status: 'rejected', verificationStatus: 'rejected' }
                        : d
                )
            })
            queryClient.invalidateQueries({ queryKey: ['admin', 'drivers'], exact: false })
            toast.success('Driver rejected successfully')
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to reject driver')
        }
    })

    const updatePricingRulesMutation = useMutation({
        mutationFn: ({ rules, user }) => pricingService.updateGlobalRules(rules, user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.admin.pricing('global') })
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
            queryClient.invalidateQueries({ queryKey: queryKeys.admin.pricing('clients') })
            queryClient.invalidateQueries({ queryKey: queryKeys.admin.pricing('audit') })
        }
    })

    const createManagerMutation = useMutation({
        mutationFn: (data) => adminService.createManager(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'managers'] })
            toast.success('Manager created successfully')
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to create manager')
        }
    })

    const updateManagerMutation = useMutation({
        mutationFn: ({ id, data }) => adminService.updateManager(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'managers'] })
            toast.success('Manager updated successfully')
        }
    })

    const deleteManagerMutation = useMutation({
        mutationFn: (id) => adminService.deleteManager(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'managers'] })
            toast.success('Manager deleted successfully')
        }
    })

    return {
        updateClient: updateClientMutation,
        updateDriver: updateDriverMutation,
        createVehicle: createVehicleMutation,
        updateVehicle: updateVehicleMutation,
        approveTruck: approveTruckMutation,
        rejectTruck: rejectTruckMutation,
        verifyDriver: verifyDriverMutation,
        rejectDriver: rejectDriverMutation,
        updatePricingRules: updatePricingRulesMutation,
        manageClientOverride: manageClientOverrideMutation,
        createManager: createManagerMutation,
        updateManager: updateManagerMutation,
        deleteManager: deleteManagerMutation
    }
}
