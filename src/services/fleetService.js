import httpClient from './httpClient'

export default {
  getTrucks: (params = {}) => httpClient.request('/truck/', {}, params),

  getTruck: (truckId) => {
    if (!truckId) throw new Error('truckId is required')
    return httpClient.request(`/truck/${encodeURIComponent(truckId)}`)
  },

  createTruck: (formData) => {
    const isFormData = formData instanceof FormData
    return httpClient.request('/truck/', {
      method: 'POST',
      body: isFormData ? formData : JSON.stringify(formData),
      ...(isFormData ? { headers: {} } : {})
    })
  },

  updateTruck: (truckId, data) => {
    if (!truckId) throw new Error('truckId is required')
    const isFormData = data instanceof FormData
    return httpClient.request(`/truck/${encodeURIComponent(truckId)}`, {
      method: 'PATCH',
      body: isFormData ? data : JSON.stringify(data),
      ...(isFormData ? { headers: {} } : {})
    })
  },

  deleteTruck: (truckId) => {
    if (!truckId) throw new Error('truckId is required')
    return httpClient.request(`/truck/${encodeURIComponent(truckId)}`, {
      method: 'DELETE'
    })
  }
}
