import httpClient from '@/services/httpClient'

export default {
  // GET /trips/admins — fetch all trips (admin/manager)
  getTrips: (params = {}) => httpClient.request('/trips/admins', {}, params),

  // GET /trips/admins/:tripId — fetch single trip (admin/manager)
  getTrip: (tripId) => {
    if (!tripId) throw new Error('tripId is required')
    return httpClient.request(`/trips/admins/${encodeURIComponent(tripId)}`)
  },

  // POST /trips/ — create a trip (admin/manager only)
  // Body: { bookingId, driverId?, origin?: { lat, lng } }
  createTrip: (tripData) => httpClient.request('/trips/', {
    method: 'POST',
    body: JSON.stringify(tripData)
  }),

  // PATCH /trips/assign/:tripId — assign/reassign driver to existing trip (admin/manager)
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

  // NOTE: Trip start/end are DRIVER-initiated endpoints only.
  // Backend routes PATCH /trips/start/:tripId and PATCH /trips/end/:tripId
  // are protected by verifyJWT(["DRIVER"]) — admin cannot call them.
  // Admin syncs booking status by patching /admin/bookings/:id after trip events.
}
