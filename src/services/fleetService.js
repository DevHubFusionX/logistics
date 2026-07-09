import httpClient from './httpClient'

export default {
  // GET /admin/trucks/ — fetch all trucks
  getTrucks: (params = {}) => httpClient.request('/admin/trucks/', {}, params),

  // GET /admin/trucks/:id — fetch single truck
  getTruck: (truckId) => {
    if (!truckId) throw new Error('truckId is required')
    return httpClient.request(`/admin/trucks/${encodeURIComponent(truckId)}`)
  },

  // GET /admin/trucks/unapproved-trucks — fetch unapproved trucks
  getUnapprovedTrucks: (params = {}) =>
    httpClient.request('/admin/trucks/unapproved-trucks', {}, params),

  // POST /admin/trucks/ — create a new truck (admin)
  createTruck: (formData) => {
    const isFormData = formData instanceof FormData
    return httpClient.request('/admin/trucks/', {
      method: 'POST',
      body: isFormData ? formData : JSON.stringify(formData),
      ...(isFormData ? { headers: {} } : {})
    })
  },

  // PATCH /admin/trucks/:id — update a truck (admin)
  updateTruck: (truckId, data) => {
    if (!truckId) throw new Error('truckId is required')
    const isFormData = data instanceof FormData
    return httpClient.request(`/admin/trucks/${encodeURIComponent(truckId)}`, {
      method: 'PATCH',
      body: isFormData ? data : JSON.stringify(data),
      ...(isFormData ? { headers: {} } : {})
    })
  },

  // PATCH /admin/trucks/approve/:id — approve a truck
  approveTruck: (truckId) => {
    if (!truckId) throw new Error('truckId is required')
    return httpClient.request(`/admin/trucks/approve/${encodeURIComponent(truckId)}`, {
      method: 'PATCH'
    })
  },

  // PATCH /admin/trucks/reject/:id — reject a truck with reason
  rejectTruck: (truckId, reason) => {
    if (!truckId) throw new Error('truckId is required')
    return httpClient.request(`/admin/trucks/reject/${encodeURIComponent(truckId)}`, {
      method: 'PATCH',
      body: JSON.stringify({ reason })
    })
  },

  // DELETE /trucks/:id — delete a truck
  deleteTruck: (truckId) => {
    if (!truckId) throw new Error('truckId is required')
    return httpClient.request(`/trucks/${encodeURIComponent(truckId)}`, {
      method: 'DELETE'
    })
  }
}
