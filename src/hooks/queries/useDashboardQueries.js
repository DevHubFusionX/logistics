import { useQuery } from '@tanstack/react-query'
import dashboardService from '../../services/dashboardService'

/**
 * Hook for fetching dashboard summary metrics
 */
export function useDashboardSummaryQuery(params = {}) {
  return useQuery({
    queryKey: ['dashboard', 'summary', params],
    queryFn: async () => {
      const response = await dashboardService.getSummary(params)
      return response.data
    },
    staleTime: 5 * 60 * 1000,
  })
}
