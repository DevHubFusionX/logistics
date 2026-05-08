import httpClient from './httpClient'

export default {
  getDrivers: (params = {}) => httpClient.request('/driver/', {}, params),
  getDriver: (driverId) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/driver/${encodeURIComponent(driverId)}`)
  },
  createDriver: (formData) => httpClient.request('/driver/', {
    method: 'POST',
    body: formData,
    headers: {
      // Content-Type is handled automatically by httpClient for FormData
    }
  }),
  updateDriver: (driverId, driverData) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/driver/${encodeURIComponent(driverId)}`, {
      method: 'PATCH',
      body: driverData // Can be FormData or stringified JSON
    })
  },
  getDriverPerformance: (driverId, params = {}) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/driver/${encodeURIComponent(driverId)}/performance/`, {}, params)
  },
  getDriverTrips: (driverId, params = {}) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/driver/${encodeURIComponent(driverId)}/trips/`, {}, params)
  },
  assignDriver: (driverId, assignmentData) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/driver/${encodeURIComponent(driverId)}/assign/`, {
      method: 'POST',
      body: JSON.stringify(assignmentData)
    })
  },
  markDriverOnLeave: (driverId, leaveData) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/driver/${encodeURIComponent(driverId)}/leave/`, {
      method: 'POST',
      body: JSON.stringify(leaveData)
    })
  },
  uploadDriverDocument: (driverId, formData) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/driver/${encodeURIComponent(driverId)}/documents/`, {
      method: 'POST',
      body: formData
    })
  },
  getDriverDocuments: (driverId) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/driver/${encodeURIComponent(driverId)}/documents/`)
  }
}
