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

  // NOTE: The following endpoints exist on the backend but are DRIVER-only:
  //   PATCH /trips/start/:tripId  — verifyJWT(["DRIVER"])
  //   PATCH /trips/end/:tripId    — verifyJWT(["DRIVER"])
  // They cannot be called from the admin frontend.
  //
  // The following features have no backend implementation yet:
  //   updateTrip, cancelTrip, trackTrip, getTripTimeline,
  //   uploadTripDocument, getTripAnalytics
}
