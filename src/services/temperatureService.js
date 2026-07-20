/**
 * temperatureService — STUB
 *
 * The backend does NOT have any /temperature/ routes.
 * All methods below are stubs that log a warning and resolve with empty data.
 */
const noOp = (name) => (...args) => {
  console.warn(`temperatureService.${name}() called — no backend endpoint exists.`)
  return Promise.resolve({ data: [], message: 'Not implemented' })
}

export default {
  getMonitoring: noOp('getMonitoring'),
  getHistory: noOp('getHistory'),
  getAlerts: noOp('getAlerts'),
  acknowledgeAlert: noOp('acknowledgeAlert'),
  resolveAlert: noOp('resolveAlert'),
  getComplianceReport: noOp('getComplianceReport'),
  updateThresholds: noOp('updateThresholds'),
  getAnalytics: noOp('getAnalytics'),
}
