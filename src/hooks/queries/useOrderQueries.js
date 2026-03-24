import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import adminOrderService from '../../services/adminOrderService'



/**
 * Hook for fetching a single dispatch order by ID
 */
export function useOrderQuery(orderId) {
  return useQuery({
    queryKey: ['admin', 'order', orderId],
    queryFn: async () => {
      const response = await adminOrderService.getOrder(orderId)
      return response.data
    },
    enabled: !!orderId,
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Hook for fetching dispatch orders
 */
export function useOrdersTableQuery(params = {}) {
    return useQuery({
        queryKey: ['admin', 'orders-list', params],
        queryFn: async () => {
            const response = await adminOrderService.getOrders(params)
            return response.data
        },
        staleTime: 5 * 60 * 1000,
    })
}

/**
 * Hook for Order Mutations (Create, Update, Delete)
 */
export function useOrderMutations() {
    const queryClient = useQueryClient()

    const addOrder = useMutation({
        mutationFn: async (newOrder) => {
            const response = await adminOrderService.createOrder(newOrder)
            return response.data
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'orders-list'] })
    })

    const updateOrder = useMutation({
        mutationFn: async (updatedOrder) => {
            const response = await adminOrderService.updateOrder(updatedOrder.id, updatedOrder)
            return response.data
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'orders-list'] })
    })

    const deleteOrder = useMutation({
        mutationFn: async (id) => {
            await adminOrderService.deleteOrder(id)
            return id
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'orders-list'] })
    })

    return { addOrder, updateOrder, deleteOrder }
}
