import httpClient from './httpClient'

export default {
  getSummary: (params = {}) => httpClient.request('/dashboard/summary', {}, params),
  getRealtime: () => httpClient.request('/dashboard/realtime')
}
