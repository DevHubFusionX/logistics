import httpClient from './httpClient'

export default {
  // GET /admin/drivers/ — fetch all drivers (admin)
  getDrivers: (params = {}) => httpClient.request('/admin/drivers/', {}, params),

  // GET /admin/drivers/:id — fetch single driver (admin)
  getDriver: (driverId) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/admin/drivers/${encodeURIComponent(driverId)}`)
  },

  // GET /admin/drivers/unverified — fetch unverified drivers
  getUnverifiedDrivers: (params = {}) =>
    httpClient.request('/admin/drivers/unverified', {}, params),

  // POST /admin/drivers/ — create a new driver (admin)
  createDriver: (formData) => httpClient.request('/admin/drivers/', {
    method: 'POST',
    body: formData,
    headers: {
      // Content-Type is handled automatically by httpClient for FormData
    }
  }),

  // PATCH /admin/drivers/:id — update a driver (admin)
  updateDriver: (driverId, driverData) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/admin/drivers/${encodeURIComponent(driverId)}`, {
      method: 'PATCH',
      body: driverData // Can be FormData or stringified JSON
    })
  },

  // PATCH /admin/drivers/verify/:id — verify a driver
  verifyDriver: (driverId) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/admin/drivers/verify/${encodeURIComponent(driverId)}`, {
      method: 'PATCH'
    })
  },

  // PATCH /admin/drivers/reject/:id — reject a driver with reason
  rejectDriver: (driverId, reason) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/admin/drivers/reject/${encodeURIComponent(driverId)}`, {
      method: 'PATCH',
      body: JSON.stringify({ reason })
    })
  },

  // GET /drivers/:id/performance — driver performance
  getDriverPerformance: (driverId, params = {}) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/drivers/${encodeURIComponent(driverId)}/performance/`, {}, params)
  },

  // GET /drivers/:id/trips — driver trips
  getDriverTrips: (driverId, params = {}) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/drivers/${encodeURIComponent(driverId)}/trips/`, {}, params)
  },

  // POST /drivers/:id/assign — assign driver
  assignDriver: (driverId, assignmentData) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/drivers/${encodeURIComponent(driverId)}/assign/`, {
      method: 'POST',
      body: JSON.stringify(assignmentData)
    })
  },

  // POST /drivers/:id/leave — mark driver on leave
  markDriverOnLeave: (driverId, leaveData) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/drivers/${encodeURIComponent(driverId)}/leave/`, {
      method: 'POST',
      body: JSON.stringify(leaveData)
    })
  },

  // POST /drivers/:id/documents — upload driver document
  uploadDriverDocument: (driverId, formData) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/drivers/${encodeURIComponent(driverId)}/documents/`, {
      method: 'POST',
      body: formData
    })
  },

  // GET /drivers/:id/documents — get driver documents
  getDriverDocuments: (driverId) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/drivers/${encodeURIComponent(driverId)}/documents/`)
  }
}
