import httpClient from '@/services/httpClient'

export default {
  getMoneyAnalytics: (params = {}) => httpClient.request('/admin/analytics/money-analytics', {}, params),
  getOrderAnalytics: (params = {}) => httpClient.request('/admin/analytics/order-analytics', {}, params),
  getTruckAnalytics: (params = {}) => httpClient.request('/admin/analytics/truck-analytics', {}, params),

  // NOTE: getRealtime (GET /analytics/live-tracking) was removed — no backend endpoint exists.
}
