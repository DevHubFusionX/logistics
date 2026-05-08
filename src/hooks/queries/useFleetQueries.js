import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import fleetService from '../../services/fleetService'

/**
 * Hook for fetching all trucks
 */
export function useTrucksQuery(params = {}) {
  return useQuery({
    queryKey: ['fleet', 'trucks-list', params],
    queryFn: async () => {
      const response = await fleetService.getTrucks(params)
      return response.data
    },
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Hook for Truck Mutations
 */
export function useTruckMutations() {
  const queryClient = useQueryClient()

  const createTruck = useMutation({
    mutationFn: (formData) => fleetService.createTruck(formData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['fleet', 'trucks-list'] })
  })

  const updateTruck = useMutation({
    mutationFn: ({ id, data }) => fleetService.updateTruck(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['fleet', 'trucks-list'] })
  })

  const deleteTruck = useMutation({
    mutationFn: (id) => fleetService.deleteTruck(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['fleet', 'trucks-list'] })
  })

  return { createTruck, updateTruck, deleteTruck }
}
