import httpClient from './httpClient'

export default {
  getRealtime: () => httpClient.request('/analytics/live-tracking'),
  getMoneyAnalytics: (params = {}) => httpClient.request('/admin/analytics/money-analytics', {}, params),
  getOrderAnalytics: (params = {}) => httpClient.request('/admin/analytics/order-analytics', {}, params),
  getTruckAnalytics: (params = {}) => httpClient.request('/admin/analytics/truck-analytics', {}, params)
}
