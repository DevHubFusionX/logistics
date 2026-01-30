import httpClient from './httpClient'

export default {
  getSummary: (params = {}) => httpClient.request('/analytics/dashboard', {}, params),
  getRealtime: () => httpClient.request('/analytics/live-tracking')
}
