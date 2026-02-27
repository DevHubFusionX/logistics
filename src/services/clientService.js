import httpClient from './httpClient'

export default {
  getClients: (params = {}) => {
    console.log('Fetching clients with params:', params)
    return httpClient.request('/admin/bookings/users', { method: 'GET' }, { ...params, role: 'user' })
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
