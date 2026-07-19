import httpClient from '@/services/httpClient'

/**
 * Client Service
 *
 * The backend has no dedicated /users or /clients management endpoints.
 * Client data is derived from the bookings endpoint.
 *
 * Real endpoints used:
 *   GET /admin/bookings/          — extract unique customers from bookings
 *   GET /admin/bookings/users/:id — get all bookings for a specific user
 *
 * Removed (no backend endpoint):
 *   createClient, updateClient, getClientPayments, getClientAnalytics,
 *   updateClientCreditLimit, suspendClient, getClientDocuments, uploadClientDocument
 */
export default {
  /**
   * Derive a unique client list from all bookings.
   * Extracts distinct customers by their createdBy ID or email.
   */
  getClients: async (params = {}) => {
    const requestParams = { limit: 50, page: 1, ...params }
    const response = await httpClient.request('/admin/bookings/', { method: 'GET' }, requestParams)
    const apiData = response.data?.data || response.data
    const records = apiData?.records || []

    const customerMap = new Map()
    records.forEach(booking => {
      const id = booking.createdBy || booking.email
      if (id && !customerMap.has(id)) {
        customerMap.set(id, {
          _id: booking.createdBy || booking._id,
          fullNameOrBusiness: booking.fullNameOrBusiness || 'Unknown Client',
          email: booking.email || '',
          contactPhone: booking.contactPhone || '',
          customerType: booking.customerType || 'individual',
          createdAt: booking.createdAt,
          stats: { shipments: 0, volume: 0 },
        })
      }
      if (id && customerMap.has(id)) {
        customerMap.get(id).stats.shipments += 1
      }
    })

    return {
      data: {
        records: Array.from(customerMap.values()),
        pagination: apiData?.pagination || {},
      },
      status: response.status,
    }
  },

  /**
   * GET /admin/bookings/users/:id
   * Returns all bookings for a specific user (not a client profile).
   */
  getClient: (clientId) => {
    if (!clientId) throw new Error('clientId is required')
    return httpClient.request(`/admin/bookings/users/${encodeURIComponent(clientId)}`)
  },

  /**
   * GET /admin/bookings/users/:id
   * Returns paginated booking records for a user — used as their "shipment history".
   */
  getClientShipments: (clientId, params = {}) => {
    if (!clientId) throw new Error('clientId is required')
    return httpClient.request(`/admin/bookings/users/${encodeURIComponent(clientId)}`, {}, params)
  },
}
