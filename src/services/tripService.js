import httpClient from './httpClient'

export default {
  // GET /trips/admins — fetch all trips (admin)
  getTrips: (params = {}) => httpClient.request('/trips/admins', {}, params),

  // GET /trips/admins/:id — fetch single trip
  getTrip: (tripId) => {
    if (!tripId) throw new Error('tripId is required')
    return httpClient.request(`/trips/admins/${encodeURIComponent(tripId)}`)
  },

  // POST /trips/ — create a trip (admin only)
  // Body: { bookingId, driverId?, origin?: { lat, lng } }
  createTrip: (tripData) => httpClient.request('/trips/', {
    method: 'POST',
    body: JSON.stringify(tripData)
  }),

  // PATCH /trips/assign/:id — assign/reassign driver to existing trip (admin only)
  // Body: { driverId, origin?: { lat, lng } }
  assignDriver: (tripId, data) => {
    if (!tripId) throw new Error('tripId is required')
    return httpClient.request(`/trips/assign/${encodeURIComponent(tripId)}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    })
  },

  // GET /trips/token/admins — get admin streaming token for real-time trip updates
  getAdminToken: () => httpClient.request('/trips/token/admins'),

  // PUT /trips/:id — update trip
  updateTrip: (tripId, tripData) => {
    if (!tripId) throw new Error('tripId is required')
    return httpClient.request(`/trips/${encodeURIComponent(tripId)}/`, {
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
