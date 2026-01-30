import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../lib/queryClient'
import clientService from '../../services/clientService'
import driverService from '../../services/driverService'
import fleetService from '../../services/fleetService'
import reportService from '../../services/reportService'
import dashboardService from '../../services/dashboardService'
import pricingService from '../../services/pricingService'
import toast from 'react-hot-toast'

/**
 * Hook for fetching all clients/customers
 */
export function useCustomersQuery(params = {}) {
    return useQuery({
        queryKey: queryKeys.admin.customers(params),
        queryFn: async () => {
            const response = await clientService.getClients(params)
            const rawUsers = response.data?.users || []

            return rawUsers.map(user => ({
                ...user,
                name: user.companyName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unnamed Client',
                contactName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'No Name',
                industry: user.clientCategory || 'Individual',
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
 * Hook for fetching a specific client's shipments
 */
export function useClientShipmentsQuery(clientId, params = {}) {
    return useQuery({
        queryKey: ['admin', 'clients', clientId, 'shipments', params],
        queryFn: async () => {
            const response = await clientService.getClientShipments(clientId, params)
            return response.data?.shipments || response.data || []
        },
        enabled: !!clientId,
        staleTime: 2 * 60 * 1000,
    })
}

/**
 * Hook for fetching all drivers/staff
 */
export function useDriversQuery(params = {}) {
    return useQuery({
        queryKey: queryKeys.admin.drivers(params),
        queryFn: async () => {
            const response = await driverService.getDrivers(params)

            // Backend returns { drivers: [], total: ... }
            const rawDrivers = response.data?.drivers || []

            // Normalize data for the frontend components
            return rawDrivers.map(driver => ({
                ...driver,
                name: driver.name || `${driver.profile?.firstName || ''} ${driver.profile?.lastName || ''}`.trim() || 'Unnamed Driver',
                email: driver.profile?.email || '',
                phone: driver.profile?.phone || '',
                vehicleInfo: driver.vehicle ? `${driver.vehicle.make} ${driver.vehicle.model}` : 'Not Assigned',
                status: driver.status || 'active'
            }))
        },
        staleTime: 5 * 60 * 1000,
    })
}

/**
 * Hook for fetching fleet/vehicles
 */
export function useFleetQuery(params = {}) {
    return useQuery({
        queryKey: queryKeys.admin.fleet(params),
        queryFn: async () => {
            const response = await fleetService.getVehicles(params)
            return response.data || response
        },
        staleTime: 3 * 60 * 1000, // 3 minutes
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
 * Hook for fetching dashboard analytics summary
 */
export function useDashboardSummaryQuery(params = {}) {
    return useQuery({
        queryKey: queryKeys.admin.dashboardSummary(params),
        queryFn: async () => {
            const response = await dashboardService.getSummary(params)
            return response.data || response
        },
        staleTime: 2 * 60 * 1000, // 2 minutes
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
            queryClient.invalidateQueries({ queryKey: queryKeys.admin.customers() })
            toast.success('Client updated successfully')
        }
    })

    const updateDriverMutation = useMutation({
        mutationFn: ({ id, data }) => driverService.updateDriver(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.admin.drivers() })
            toast.success('Driver updated successfully')
        }
    })

    const updateVehicleMutation = useMutation({
        mutationFn: ({ id, data }) => fleetService.updateVehicle(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.admin.fleet() })
            toast.success('Vehicle updated successfully')
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
        }
    })

    return {
        updateClient: updateClientMutation,
        updateDriver: updateDriverMutation,
        updateVehicle: updateVehicleMutation,
        updatePricingRules: updatePricingRulesMutation,
        manageClientOverride: manageClientOverrideMutation
    }
}
