import httpClient from './httpClient'

const supportService = {
    getTickets: (params = {}) => {
        return httpClient.request('/support/tickets', {}, params)
    },

    getTicket: (ticketId) => {
        if (!ticketId) throw new Error('ticketId is required')
        return httpClient.request(`/support/tickets/${encodeURIComponent(ticketId)}`)
    },

    createTicket: (ticketData) => {
        return httpClient.request('/support/tickets', {
            method: 'POST',
            body: JSON.stringify(ticketData)
        })
    },

    addTicketMessage: (ticketId, message) => {
        if (!ticketId) throw new Error('ticketId is required')
        return httpClient.request(`/support/tickets/${encodeURIComponent(ticketId)}/messages`, {
            method: 'POST',
            body: JSON.stringify({ message })
        })
    },

    resolveTicket: (ticketId) => {
        if (!ticketId) throw new Error('ticketId is required')
        return httpClient.request(`/support/tickets/${encodeURIComponent(ticketId)}/resolve`, {
            method: 'POST'
        })
    }
}

export default supportService
