import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/queryClient'
import clientService from '@/features/admin/services/clientService'
import toast from 'react-hot-toast'

export function useCustomersQuery(params = {}) {
    return useQuery({
        queryKey: queryKeys.admin.customers(params),
        queryFn: async () => {
            const response = await clientService.getClients(params)
            const rawUsers = response.data?.records || []
            return rawUsers.map(user => ({
                ...user,
                id: user._id || user.id,
                name: user.fullNameOrBusiness || user.companyName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unnamed Client',
                contactName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.fullNameOrBusiness || 'No Name',
                industry: user.clientCategory || user.customerType || 'Individual',
                accountOfficer: 'Standard Account',
                totalTrips: user.stats?.shipments || 0,
                revenue: user.stats?.volume || 0,
                paymentStatus: 'current',
                lastActive: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Never',
                joinedDate: user.createdAt,
                customPricing: { baseRate: 2500, discount: 0 },
                address: user.address || 'No address provided',
                avatar: user.avatar || null
            }))
        },
        staleTime: 5 * 60 * 1000,
    })
}

export function useClientShipmentsQuery(clientId, params = {}) {
    return useQuery({
        queryKey: ['admin', 'clients', clientId, 'shipments', params],
        queryFn: async () => {
            const response = await clientService.getClientShipments(clientId, params)
            const apiData = response.data?.data || response.data
            const records = (apiData?.records || []).map(booking => ({
                ...booking,
                id: booking._id || booking.id,
                trackingNumber: booking.tracking_number || booking._id,
                origin: booking.pickupLocation?.city || booking.pickupLocation?.address || 'N/A',
                destination: booking.dropoffLocation?.city || booking.dropoffLocation?.address || 'N/A',
                cost: booking.price || booking.shipping_fee || 0,
                status: booking.status
            }))
            return { records, pagination: apiData?.pagination || {} }
        },
        enabled: !!clientId,
        staleTime: 2 * 60 * 1000,
    })
}

export function useClientMutations() {
    const queryClient = useQueryClient()

    const updateClient = useMutation({
        mutationFn: ({ id, data }) => clientService.updateClient(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.admin.customers() })
            queryClient.invalidateQueries({ queryKey: ['admin', 'clients', id] })
            toast.success('Client updated successfully')
        }
    })

    return { updateClient }
}
