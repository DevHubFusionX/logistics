import httpClient from './httpClient'

export default {
  getMonitoring: (params = {}) => httpClient.request('/temperature/monitoring', {}, params),
  getHistory: (truckId, params = {}) => {
    if (!truckId) throw new Error('truckId is required')
    return httpClient.request(`/temperature/history/${encodeURIComponent(truckId)}`, {}, params)
  },
  getAlerts: (params = {}) => httpClient.request('/temperature/alerts', {}, params),
  acknowledgeAlert: (alertId, acknowledgeData) => {
    if (!alertId) throw new Error('alertId is required')
    return httpClient.request(`/temperature/alerts/${encodeURIComponent(alertId)}/acknowledge`, {
      method: 'POST',
      body: JSON.stringify(acknowledgeData)
    })
  },
  resolveAlert: (alertId, resolutionData) => {
    if (!alertId) throw new Error('alertId is required')
    return httpClient.request(`/temperature/alerts/${encodeURIComponent(alertId)}/resolve`, {
      method: 'POST',
      body: JSON.stringify(resolutionData)
    })
  },
  getComplianceReport: (params = {}) => httpClient.request('/temperature/compliance', {}, params),
  updateThresholds: (thresholdData) => httpClient.request('/temperature/thresholds', {
    method: 'PUT',
    body: JSON.stringify(thresholdData)
  }),
  getAnalytics: (params = {}) => httpClient.request('/temperature/analytics', {}, params)
}
