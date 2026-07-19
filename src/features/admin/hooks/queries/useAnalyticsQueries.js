import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '@/features/dashboard'

export const analyticsKeys = {
    all: ['analytics'],
    userSummary: (filters) => [...analyticsKeys.all, 'user-summary', filters],
    shipmentStats: (period) => [...analyticsKeys.all, 'shipment-stats', period],
}

/**
 * Fetch admin analytics summary.
 * Uses GET /admin/analytics/order-analytics — the closest real backend endpoint.
 */
export function useUserAnalyticsSummaryQuery(filters = {}) {
    return useQuery({
        queryKey: analyticsKeys.userSummary(filters),
        queryFn: async () => {
            const response = await dashboardService.getOrderAnalytics(filters)
            return response.data?.data || response.data || {}
        },
        staleTime: 5 * 60 * 1000,
    })
}

/**
 * Fetch shipment stats.
 * Uses GET /admin/analytics/money-analytics — the real money metrics endpoint.
 */
export function useUserShipmentStatsQuery(period = 'month') {
    return useQuery({
        queryKey: analyticsKeys.shipmentStats(period),
        queryFn: async () => {
            const response = await dashboardService.getMoneyAnalytics({ period })
            return response.data?.data || response.data || {}
        },
        staleTime: 10 * 60 * 1000,
    })
}
