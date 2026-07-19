import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import adminService from '@/features/admin/services/adminService'
import httpClient from '@/services/httpClient'
import toast from 'react-hot-toast'

/**
 * Pricing Queries
 *
 * NOTE: The backend has NO /pricing/ management endpoints.
 * Price calculation must use:
 *   GET /bookings/prices/:city/:truckSize        (user)
 *   GET /admin/bookings/prices/:city/:truckSize  (admin)
 *
 * These are called via pricingService.calculatePrice() or bookingService.getPrices().
 *
 * The hooks below (usePricingRulesQuery, useClientOverridesQuery, usePricingAuditQuery)
 * are STUBS — they return empty data so components render without crashing.
 * No real backend endpoint exists for pricing management.
 */

/** STUB — no backend /pricing endpoint */
export function usePricingRulesQuery() {
    if (import.meta.env.DEV) {
        console.warn('[usePricingRulesQuery] No backend pricing endpoint — returning empty data.')
    }
    return { data: null, isLoading: false, isError: false, refetch: () => {} }
}

/** STUB — no backend client overrides endpoint */
export function useClientOverridesQuery() {
    return { data: [], isLoading: false, isError: false }
}

/** STUB — no backend pricing audit endpoint */
export function usePricingAuditQuery() {
    return { data: [], isLoading: false, isError: false }
}

/** STUB — no backend update-pricing endpoint */
export function usePricingMutations() {
    return {
        updatePricingRules: { mutate: () => toast.error('Pricing management is not available on the backend.'), isPending: false },
        manageClientOverride: { mutate: () => toast.error('Client overrides are not available on the backend.'), isPending: false },
    }
}

/**
 * Fetch all managers.
 * Uses GET /admin/managers — real backend endpoint.
 */
export function useManagersQuery(params = {}) {
    return useQuery({
        queryKey: ['admin', 'managers', params],
        queryFn: async () => {
            const response = await adminService.getManagers(params)
            const data = httpClient.extractData(response)
            const records = data?.records || (Array.isArray(data) ? data : [])
            return records.map(m => ({
                ...m,
                id: m._id || m.id,
                name: `${m.firstName || ''} ${m.lastName || ''}`.trim() || m.email || 'Unnamed Manager',
                email: m.email || '',
                phone: m.phone || '',
                status: m.isActive !== false ? 'active' : 'inactive',
                joinedDate: m.createdAt,
            }))
        },
        staleTime: 5 * 60 * 1000,
    })
}

export function useManagerMutations() {
    const queryClient = useQueryClient()

    const createManager = useMutation({
        mutationFn: (data) => adminService.createManager(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'managers'] })
            toast.success('Manager created successfully')
        },
        onError: (error) => toast.error(error.message || 'Failed to create manager')
    })

    // deleteManager — backend has no DELETE /admin/managers/:id endpoint.
    // Stubbed as a mutation that notifies the user rather than 404-ing silently.
    const deleteManager = useMutation({
        mutationFn: async (_id) => {
            throw new Error('Delete manager is not supported by the backend.')
        },
        onError: () => toast.error('Deleting managers is not available — no backend endpoint exists.'),
    })

    return { createManager, deleteManager }
}
