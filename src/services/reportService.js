/**
 * reportService — STUB
 *
 * The backend does NOT have any /reports/ routes.
 * All report/analytics data must be fetched from the three real endpoints:
 *
 *   GET /admin/analytics/money-analytics  → dashboardService.getMoneyAnalytics()
 *   GET /admin/analytics/order-analytics  → dashboardService.getOrderAnalytics()
 *   GET /admin/analytics/truck-analytics  → dashboardService.getTruckAnalytics()
 *
 * Use dashboardService from @/features/dashboard instead.
 *
 * All methods below are stubs that log a warning and resolve with empty data.
 */
const noOp = (name) => (...args) => {
  console.warn(`reportService.${name}() called — no backend endpoint exists. Use dashboardService instead.`)
  return Promise.resolve({ data: [], message: 'Not implemented' })
}

export default {
  getFleetReport: noOp('getFleetReport'),
  getDriverReport: noOp('getDriverReport'),
  getTemperatureReport: noOp('getTemperatureReport'),
  getFinancialReport: noOp('getFinancialReport'),
  getTripReport: noOp('getTripReport'),
  getCustomerReport: noOp('getCustomerReport'),
  getBookingReport: noOp('getBookingReport'),
  exportReport: noOp('exportReport'),
  getExportStatus: noOp('getExportStatus'),
  getDashboardAnalytics: noOp('getDashboardAnalytics'),
}
