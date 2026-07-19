import httpClient from '@/services/httpClient'

export default {
  // GET /admin/drivers/?page=&limit=
  getDrivers: (params = {}) =>
    httpClient.request('/admin/drivers/', {}, params),

  // GET /admin/drivers/:id
  getDriver: (driverId) =>
    httpClient.request(`/admin/drivers/${encodeURIComponent(driverId)}`),

  // GET /admin/drivers/unverified
  getUnverifiedDrivers: (params = {}) =>
    httpClient.request('/admin/drivers/unverified', {}, params),

  // POST /admin/drivers/ — multipart/form-data
  createDriver: (formData) =>
    httpClient.request('/admin/drivers/', { method: 'POST', body: formData }),

  // PATCH /admin/drivers/:id — multipart/form-data
  updateDriver: (driverId, formData) =>
    httpClient.request(`/admin/drivers/${encodeURIComponent(driverId)}`, {
      method: 'PATCH',
      body: formData,
    }),

  // PATCH /admin/drivers/verify/:driverId
  verifyDriver: (driverId) =>
    httpClient.request(`/admin/drivers/verify/${encodeURIComponent(driverId)}`, {
      method: 'PATCH',
    }),

  // PATCH /admin/drivers/reject/:driverId
  rejectDriver: (driverId, reason) =>
    httpClient.request(`/admin/drivers/reject/${encodeURIComponent(driverId)}`, {
      method: 'PATCH',
      body: JSON.stringify({ reason }),
    }),
}
