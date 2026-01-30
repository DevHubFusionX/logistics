import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import supportService from '../../services/supportService'
import toast from 'react-hot-toast'

export const supportKeys = {
    all: ['support'],
    tickets: (filters) => [...supportKeys.all, 'tickets', filters],
    ticket: (id) => [...supportKeys.all, 'ticket', id],
}

export function useTicketsQuery(filters = {}) {
    return useQuery({
        queryKey: supportKeys.tickets(filters),
        queryFn: async () => {
            const response = await supportService.getTickets(filters)
            return response.data || response || []
        },
        staleTime: 1 * 60 * 1000, // 1 minute
    })
}

export function useTicketQuery(ticketId) {
    return useQuery({
        queryKey: supportKeys.ticket(ticketId),
        queryFn: async () => {
            const response = await supportService.getTicket(ticketId)
            return response.data || response
        },
        enabled: !!ticketId,
    })
}

export function useCreateTicketMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => supportService.createTicket(data),
        onSuccess: () => {
            toast.success('Support ticket created!')
            queryClient.invalidateQueries({ queryKey: supportKeys.all })
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to create ticket')
        }
    })
}

export function useAddTicketMessageMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ ticketId, message }) => supportService.addTicketMessage(ticketId, message),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: supportKeys.ticket(variables.ticketId) })
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to send message')
        }
    })
}

export function useResolveTicketMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (ticketId) => supportService.resolveTicket(ticketId),
        onSuccess: (_, ticketId) => {
            toast.success('Ticket marked as resolved')
            queryClient.invalidateQueries({ queryKey: supportKeys.ticket(ticketId) })
            queryClient.invalidateQueries({ queryKey: supportKeys.all })
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to resolve ticket')
        }
    })
}
