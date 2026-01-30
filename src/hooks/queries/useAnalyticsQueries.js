import { useQuery } from '@tanstack/react-query'
import reportService from '../../services/reportService'

export const analyticsKeys = {
    all: ['analytics'],
    userSummary: (filters) => [...analyticsKeys.all, 'user-summary', filters],
    shipmentStats: (period) => [...analyticsKeys.all, 'shipment-stats', period],
}

export function useUserAnalyticsSummaryQuery(filters = {}) {
    return useQuery({
        queryKey: analyticsKeys.userSummary(filters),
        queryFn: async () => {
            const response = await reportService.getDashboardAnalytics(filters)
            return response.data || response
        },
        staleTime: 5 * 60 * 1000,
    })
}

export function useUserShipmentStatsQuery(period = 'month') {
    return useQuery({
        queryKey: analyticsKeys.shipmentStats(period),
        queryFn: async () => {
            const response = await reportService.getBookingReport({ period })
            return response.data || response
        },
        staleTime: 10 * 60 * 1000,
    })
}
