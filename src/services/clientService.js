import httpClient from './httpClient'

export default {
  getClients: (params = {}) => httpClient.request('/clients', {}, params),
  getClient: (clientId) => {
    if (!clientId) throw new Error('clientId is required')
    return httpClient.request(`/clients/${encodeURIComponent(clientId)}`)
  },
  createClient: (clientData) => httpClient.request('/clients', {
    method: 'POST',
    body: JSON.stringify(clientData)
  }),
  updateClient: (clientId, clientData) => {
    if (!clientId) throw new Error('clientId is required')
    return httpClient.request(`/clients/${encodeURIComponent(clientId)}`, {
      method: 'PUT',
      body: JSON.stringify(clientData)
    })
  },
  getClientBookings: (clientId, params = {}) => {
    if (!clientId) throw new Error('clientId is required')
    return httpClient.request(`/clients/${encodeURIComponent(clientId)}/bookings`, {}, params)
  },
  getClientPayments: (clientId, params = {}) => {
    if (!clientId) throw new Error('clientId is required')
    return httpClient.request(`/clients/${encodeURIComponent(clientId)}/payments`, {}, params)
  },
  getClientAnalytics: (clientId, params = {}) => {
    if (!clientId) throw new Error('clientId is required')
    return httpClient.request(`/clients/${encodeURIComponent(clientId)}/analytics`, {}, params)
  },
  updateClientCreditLimit: (clientId, creditData) => {
    if (!clientId) throw new Error('clientId is required')
    return httpClient.request(`/clients/${encodeURIComponent(clientId)}/credit-limit`, {
      method: 'PATCH',
      body: JSON.stringify(creditData)
    })
  },
  suspendClient: (clientId, suspendData) => {
    if (!clientId) throw new Error('clientId is required')
    return httpClient.request(`/clients/${encodeURIComponent(clientId)}/suspend`, {
      method: 'POST',
      body: JSON.stringify(suspendData)
    })
  },
  getClientDocuments: (clientId) => {
    if (!clientId) throw new Error('clientId is required')
    return httpClient.request(`/clients/${encodeURIComponent(clientId)}/documents`)
  },
  uploadClientDocument: (clientId, formData) => {
    if (!clientId) throw new Error('clientId is required')
    return httpClient.request(`/clients/${encodeURIComponent(clientId)}/documents`, {
      method: 'POST',
      body: formData,
      headers: {}
    })
  }
}
