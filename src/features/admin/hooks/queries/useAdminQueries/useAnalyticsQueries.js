import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '@/features/dashboard'

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
 * STUB — all /reports/* endpoints do not exist on the backend.
 * Returns empty data so components render without crashing.
 * Real analytics must use money/order/truck analytics endpoints via dashboardService.
 */
export function useReportsQuery(_type, _params = {}) {
    if (import.meta.env.DEV) {
        console.warn(`[useReportsQuery] No backend /reports endpoint — returning empty data for type: ${_type}`)
    }
    return { data: null, isLoading: false, isError: false, refetch: () => {} }
}
