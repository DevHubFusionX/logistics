import httpClient from './httpClient'

export default {
  getFleetReport: (params = {}) => httpClient.request('/reports/fleet', {}, params),
  getDriverReport: (params = {}) => httpClient.request('/reports/drivers', {}, params),
  getTemperatureReport: (params = {}) => httpClient.request('/reports/temperature', {}, params),
  getFinancialReport: (params = {}) => httpClient.request('/reports/financial', {}, params),
  getTripReport: (params = {}) => httpClient.request('/reports/trips', {}, params),
  getCustomerReport: (params = {}) => httpClient.request('/reports/customers', {}, params),
  getBookingReport: (params = {}) => httpClient.request('/reports/bookings', {}, params),
  exportReport: (exportData) => httpClient.request('/reports/export', {
    method: 'POST',
    body: JSON.stringify(exportData)
  }),
  getExportStatus: (jobId) => httpClient.request(`/reports/exports/${jobId}`),
  getDashboardAnalytics: (params = {}) => httpClient.request('/reports/dashboard', {}, params)
}
