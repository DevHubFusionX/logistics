import httpClient from './httpClient'

export default {
  // --- Admin Endpoints ---
  // GET /tripsV2/admins — fetch all trips (admin/manager)
  getTrips: (params = {}) => httpClient.request('/tripsV2/admins', {}, params),

  // GET /tripsV2/admins/:id — fetch single trip (admin/manager)
  getTrip: (tripId) => {
    if (!tripId) throw new Error('tripId is required')
    return httpClient.request(`/tripsV2/admins/${encodeURIComponent(tripId)}`)
  },

  // POST /tripsV2/ — create a trip (admin only)
  // Body: { bookingId, driverId?, origin?: { lat, lng } }
  createTrip: (tripData) => httpClient.request('/tripsV2/', {
    method: 'POST',
    body: JSON.stringify(tripData)
  }),

  // PATCH /tripsV2/assign/:id — assign/reassign driver to existing trip (admin only)
  // Body: { driverId, origin?: { lat, lng } }
  assignDriver: (tripId, data) => {
    if (!tripId) throw new Error('tripId is required')
    return httpClient.request(`/tripsV2/assign/${encodeURIComponent(tripId)}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    })
  },

  // PATCH /tripsV2/tracking/:id — update telematics / GPS tracking link (admin only)
  // Body: { trackingLink }
  updateTrackingLink: (tripId, trackingLink) => {
    if (!tripId) throw new Error('tripId is required')
    return httpClient.request(`/tripsV2/tracking/${encodeURIComponent(tripId)}`, {
      method: 'PATCH',
      body: JSON.stringify({ trackingLink })
    })
  },

  // --- User / Driver / Public Endpoints ---
  // GET /tripsV2/ — fetch user's or driver's own trips
  getUserTrips: (params = {}) => httpClient.request('/tripsV2/', {}, params),

  // GET /tripsV2/:id — fetch single user/driver trip
  getUserTrip: (tripId) => {
    if (!tripId) throw new Error('tripId is required')
    return httpClient.request(`/tripsV2/${encodeURIComponent(tripId)}`)
  },

  // GET /tripsV2/tracking/:id — get trip tracking info and tracking link
  getTrackingLink: (tripId) => {
    if (!tripId) throw new Error('tripId is required')
    return httpClient.request(`/tripsV2/tracking/${encodeURIComponent(tripId)}`)
  },

  // PATCH /tripsV2/start/:id — start trip (Driver only)
  startTrip: (tripId) => {
    if (!tripId) throw new Error('tripId is required')
    return httpClient.request(`/tripsV2/start/${encodeURIComponent(tripId)}`, {
      method: 'PATCH'
    })
  },

  // PATCH /tripsV2/end/:id — end trip (Driver only)
  endTrip: (tripId) => {
    if (!tripId) throw new Error('tripId is required')
    return httpClient.request(`/tripsV2/end/${encodeURIComponent(tripId)}`, {
      method: 'PATCH'
    })
  }
}
