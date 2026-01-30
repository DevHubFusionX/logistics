import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../lib/queryClient'
import paymentService from '../../services/paymentService'
import toast from 'react-hot-toast'

/**
 * Fetch payment history
 */
export function usePaymentHistoryQuery(filters = {}) {
    return useQuery({
        queryKey: queryKeys.payments.history,
        queryFn: async () => {
            const response = await paymentService.getPaymentHistory(filters)
            return response.data || []
        },
        staleTime: 2 * 60 * 1000, // 2 minutes
    })
}

/**
 * Fetch all payments (admin view)
 */
export function usePaymentsQuery(filters = {}) {
    return useQuery({
        queryKey: queryKeys.payments.list(filters),
        queryFn: async () => {
            const response = await paymentService.getPayments(filters)
            return response.data || []
        },
        staleTime: 2 * 60 * 1000,
    })
}

/**
 * Fetch payment details
 */
export function usePaymentQuery(paymentId) {
    return useQuery({
        queryKey: queryKeys.payments.detail(paymentId),
        queryFn: async () => {
            const response = await paymentService.getPaymentById(paymentId)
            return response.data
        },
        enabled: !!paymentId,
        staleTime: 5 * 60 * 1000,
    })
}

/**
 * Initialize payment mutation
 */
export function useInitializePaymentMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (bookingId) => {
            return await paymentService.initializePayment(bookingId)
        },

        onSuccess: (response) => {
            // Return payment URL to caller
            return response
        },

        onError: (error) => {
            const message = error.response?.data?.message || error.message || 'Payment initialization failed'
            toast.error(message)
        },
    })
}

/**
 * Verify payment mutation
 */
export function useVerifyPaymentMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (reference) => {
            return await paymentService.verifyPayment(reference)
        },

        onSuccess: (response) => {
            toast.success('Payment verified successfully!')

            // Invalidate payment and booking queries
            queryClient.invalidateQueries({ queryKey: queryKeys.payments.all })
            queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all })
        },

        onError: (error) => {
            const message = error.response?.data?.message || 'Payment verification failed'
            toast.error(message)
        },
    })
}

/**
 * Record payment mutation
 */
export function useRecordPaymentMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ bookingId, paymentData }) => {
            return await paymentService.recordPayment(bookingId, paymentData)
        },

        onSuccess: (response, variables) => {
            toast.success('Payment recorded successfully!')

            // Update caches
            queryClient.invalidateQueries({
                queryKey: queryKeys.payments.all
            })
            queryClient.invalidateQueries({
                queryKey: queryKeys.bookings.detail(variables.bookingId)
            })
        },

        onError: (error) => {
            const message = error.response?.data?.message || 'Failed to record payment'
            toast.error(message)
        },
    })
}
