import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/queryClient'
import paymentService from '@/services/paymentService'

export function usePaymentHistoryQuery(filters = {}) {
    return useQuery({
        queryKey: queryKeys.payments.history,
        queryFn: async () => {
            const response = await paymentService.getPaymentHistory(filters)
            return response.data || []
        },
        staleTime: 2 * 60 * 1000,
    })
}
