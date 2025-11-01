import httpClient from './httpClient'

export default {
  getTrips: (params = {}) => httpClient.request('/trips', {}, params),
  getTrip: (tripId) => {
    if (!tripId) throw new Error('tripId is required')
    return httpClient.request(`/trips/${encodeURIComponent(tripId)}`)
  },
  createTrip: (tripData) => httpClient.request('/trips', {
    method: 'POST',
    body: JSON.stringify(tripData)
  }),
  updateTrip: (tripId, tripData) => {
    if (!tripId) throw new Error('tripId is required')
    return httpClient.request(`/trips/${encodeURIComponent(tripId)}`, {
      method: 'PUT',
      body: JSON.stringify(tripData)
    })
  },
  startTrip: (tripId, startData) => {
    if (!tripId) throw new Error('tripId is required')
    return httpClient.request(`/trips/${encodeURIComponent(tripId)}/start`, {
      method: 'POST',
      body: JSON.stringify(startData)
    })
  },
  completeTrip: (tripId, completionData) => {
    if (!tripId) throw new Error('tripId is required')
    return httpClient.request(`/trips/${encodeURIComponent(tripId)}/complete`, {
      method: 'POST',
      body: JSON.stringify(completionData)
    })
  },
  cancelTrip: (tripId, cancelData) => {
    if (!tripId) throw new Error('tripId is required')
    return httpClient.request(`/trips/${encodeURIComponent(tripId)}/cancel`, {
      method: 'POST',
      body: JSON.stringify(cancelData)
    })
  },
  trackTrip: (tripId) => {
    if (!tripId) throw new Error('tripId is required')
    return httpClient.request(`/trips/${encodeURIComponent(tripId)}/track`)
  },
  getTripTimeline: (tripId) => {
    if (!tripId) throw new Error('tripId is required')
    return httpClient.request(`/trips/${encodeURIComponent(tripId)}/timeline`)
  },
  uploadTripDocument: (tripId, formData) => {
    if (!tripId) throw new Error('tripId is required')
    return httpClient.request(`/trips/${encodeURIComponent(tripId)}/documents`, {
      method: 'POST',
      body: formData,
      headers: {}
    })
  },
  getTripAnalytics: (params = {}) => httpClient.request('/trips/analytics', {}, params)
}
