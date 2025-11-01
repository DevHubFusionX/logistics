import httpClient from './httpClient'

export default {
  getVehicles: (params = {}) => httpClient.request('/fleet/vehicles', {}, params),
  getVehicle: (vehicleId) => {
    if (!vehicleId) throw new Error('vehicleId is required')
    return httpClient.request(`/fleet/vehicles/${encodeURIComponent(vehicleId)}`)
  },
  addVehicle: (vehicleData) => httpClient.request('/fleet/vehicles', {
    method: 'POST',
    body: JSON.stringify(vehicleData)
  }),
  updateVehicle: (vehicleId, vehicleData) => {
    if (!vehicleId) throw new Error('vehicleId is required')
    return httpClient.request(`/fleet/vehicles/${encodeURIComponent(vehicleId)}`, {
      method: 'PUT',
      body: JSON.stringify(vehicleData)
    })
  },
  deleteVehicle: (vehicleId) => {
    if (!vehicleId) throw new Error('vehicleId is required')
    return httpClient.request(`/fleet/vehicles/${encodeURIComponent(vehicleId)}`, {
      method: 'DELETE'
    })
  },
  getVehicleTelemetry: (vehicleId, params = {}) => {
    if (!vehicleId) throw new Error('vehicleId is required')
    return httpClient.request(`/fleet/vehicles/${encodeURIComponent(vehicleId)}/telemetry`, {}, params)
  },
  getMaintenanceAlerts: (params = {}) => httpClient.request('/fleet/maintenance/alerts', {}, params),
  scheduleMaintenance: (maintenanceData) => httpClient.request('/fleet/maintenance', {
    method: 'POST',
    body: JSON.stringify(maintenanceData)
  }),
  getVehicleTrips: (vehicleId, params = {}) => {
    if (!vehicleId) throw new Error('vehicleId is required')
    return httpClient.request(`/fleet/vehicles/${encodeURIComponent(vehicleId)}/trips`, {}, params)
  }
}
