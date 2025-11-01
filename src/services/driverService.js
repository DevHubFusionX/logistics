import httpClient from './httpClient'

export default {
  getDrivers: (params = {}) => httpClient.request('/drivers', {}, params),
  getDriver: (driverId) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/drivers/${encodeURIComponent(driverId)}`)
  },
  createDriver: (driverData) => httpClient.request('/drivers', {
    method: 'POST',
    body: JSON.stringify(driverData)
  }),
  updateDriver: (driverId, driverData) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/drivers/${encodeURIComponent(driverId)}`, {
      method: 'PUT',
      body: JSON.stringify(driverData)
    })
  },
  getDriverPerformance: (driverId, params = {}) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/drivers/${encodeURIComponent(driverId)}/performance`, {}, params)
  },
  getDriverTrips: (driverId, params = {}) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/drivers/${encodeURIComponent(driverId)}/trips`, {}, params)
  },
  assignDriver: (driverId, assignmentData) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/drivers/${encodeURIComponent(driverId)}/assign`, {
      method: 'POST',
      body: JSON.stringify(assignmentData)
    })
  },
  markDriverOnLeave: (driverId, leaveData) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/drivers/${encodeURIComponent(driverId)}/leave`, {
      method: 'POST',
      body: JSON.stringify(leaveData)
    })
  },
  uploadDriverDocument: (driverId, formData) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/drivers/${encodeURIComponent(driverId)}/documents`, {
      method: 'POST',
      body: formData,
      headers: {}
    })
  },
  getDriverDocuments: (driverId) => {
    if (!driverId) throw new Error('driverId is required')
    return httpClient.request(`/drivers/${encodeURIComponent(driverId)}/documents`)
  }
}
