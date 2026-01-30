import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import addressService from '../../services/addressService'
import toast from 'react-hot-toast'

export const addressKeys = {
    all: ['addresses'],
    list: () => [...addressKeys.all, 'list'],
    detail: (id) => [...addressKeys.all, 'detail', id],
}

export function useAddressesQuery() {
    return useQuery({
        queryKey: addressKeys.list(),
        queryFn: async () => {
            const response = await addressService.getAddresses()
            return response.data || response || []
        },
        staleTime: 5 * 60 * 1000,
    })
}

export function useAddressQuery(addressId) {
    return useQuery({
        queryKey: addressKeys.detail(addressId),
        queryFn: () => addressService.getAddress(addressId),
        enabled: !!addressId,
    })
}

export function useCreateAddressMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => addressService.createAddress(data),
        onSuccess: () => {
            toast.success('Address saved successfully!')
            queryClient.invalidateQueries({ queryKey: addressKeys.all })
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to save address')
        }
    })
}

export function useUpdateAddressMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }) => addressService.updateAddress(id, data),
        onSuccess: (_, variables) => {
            toast.success('Address updated!')
            queryClient.invalidateQueries({ queryKey: addressKeys.all })
            queryClient.invalidateQueries({ queryKey: addressKeys.detail(variables.id) })
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to update address')
        }
    })
}

export function useDeleteAddressMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id) => addressService.deleteAddress(id),
        onSuccess: () => {
            toast.success('Address deleted')
            queryClient.invalidateQueries({ queryKey: addressKeys.all })
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to delete address')
        }
    })
}

export function useSetDefaultAddressMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id) => addressService.setDefaultAddress(id),
        onSuccess: () => {
            toast.success('Default address updated')
            queryClient.invalidateQueries({ queryKey: addressKeys.list() })
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to set default address')
        }
    })
}
