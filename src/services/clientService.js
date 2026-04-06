import httpClient from './httpClient'

export default {
  getClients: async (params = {}) => {
    console.debug('[CLIENT_SERVICE] Fetching clients via admin bookings with params:', params)
    const requestParams = { ...params }
    if (!requestParams.limit) requestParams.limit = 50
    if (!requestParams.page) requestParams.page = 1
    console.debug('[CLIENT_SERVICE] Final request params:', requestParams)
    // Use /admin/bookings/ to get all bookings, then extract unique users
    const response = await httpClient.request('/admin/bookings/', { method: 'GET' }, requestParams)
    const apiData = response.data?.data || response.data
    const records = apiData?.records || []

    // Extract unique customers from booking records by createdBy or email
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
          stats: {
            shipments: 0,
            volume: 0,
          },
        })
      }
      // Increment stats for each booking by this customer
      if (id && customerMap.has(id)) {
        const customer = customerMap.get(id)
        customer.stats.shipments += 1
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
  getClient: (clientId) => {
    if (!clientId) throw new Error('clientId is required')
    return httpClient.request(`/admin/bookings/users/${encodeURIComponent(clientId)}`)
  },
  createClient: (clientData) => httpClient.request('/admin/bookings/users', {
    method: 'POST',
    body: JSON.stringify(clientData)
  }),
  updateClient: (clientId, clientData) => {
    if (!clientId) throw new Error('clientId is required')
    return httpClient.request(`/admin/bookings/users/${encodeURIComponent(clientId)}`, {
      method: 'PUT',
      body: JSON.stringify(clientData)
    })
  },
  getClientShipments: (clientId, params = {}) => {
    if (!clientId) throw new Error('clientId is required')
    return httpClient.request(`/admin/bookings/users/${encodeURIComponent(clientId)}`, {}, params)
  },
  getClientPayments: (clientId, params = {}) => {
    if (!clientId) throw new Error('clientId is required')
    return httpClient.request(`/admin/bookings/users/${encodeURIComponent(clientId)}/payments`, {}, params)
  },
  getClientAnalytics: (clientId, params = {}) => {
    if (!clientId) throw new Error('clientId is required')
    return httpClient.request(`/admin/bookings/users/${encodeURIComponent(clientId)}/analytics`, {}, params)
  },
  updateClientCreditLimit: (clientId, creditData) => {
    if (!clientId) throw new Error('clientId is required')
    return httpClient.request(`/admin/bookings/users/${encodeURIComponent(clientId)}/credit-limit`, {
      method: 'PATCH',
      body: JSON.stringify(creditData)
    })
  },
  suspendClient: (clientId, suspendData) => {
    if (!clientId) throw new Error('clientId is required')
    return httpClient.request(`/admin/bookings/users/${encodeURIComponent(clientId)}/suspend`, {
      method: 'POST',
      body: JSON.stringify(suspendData)
    })
  },
  getClientDocuments: (clientId) => {
    if (!clientId) throw new Error('clientId is required')
    return httpClient.request(`/admin/bookings/users/${encodeURIComponent(clientId)}/documents`)
  },
  uploadClientDocument: (clientId, formData) => {
    if (!clientId) throw new Error('clientId is required')
    return httpClient.request(`/admin/bookings/users/${encodeURIComponent(clientId)}/documents`, {
      method: 'POST',
      body: formData,
      headers: {}
    })
  }
}
