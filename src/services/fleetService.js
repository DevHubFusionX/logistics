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

  // NOTE: There is no PATCH /admin/trucks/:id (general update) endpoint on the backend.
  // NOTE: There is no DELETE truck endpoint on the admin backend.
  //       The driver-scoped DELETE /trucks/:truckId requires DRIVER JWT.
}
