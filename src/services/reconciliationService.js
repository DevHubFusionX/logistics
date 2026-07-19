/**
 * reconciliationService — STUB
 *
 * The backend does NOT have any /reconciliation/ routes.
 * All methods below are not implemented and will throw if called.
 */
const notImplemented = (name) => () => {
  throw new Error(`reconciliationService.${name} is not implemented — no backend endpoint exists.`)
}

export default {
  getDashboard: notImplemented('getDashboard'),
  getRecords: notImplemented('getRecords'),
  getMismatches: notImplemented('getMismatches'),
  resolveMismatch: notImplemented('resolveMismatch'),
  runReconciliation: notImplemented('runReconciliation'),
  getJobStatus: notImplemented('getJobStatus'),
  exportReport: notImplemented('exportReport'),
  getAnalytics: notImplemented('getAnalytics'),
  getUnreconciledRevenue: notImplemented('getUnreconciledRevenue'),
  bulkResolveMismatches: notImplemented('bulkResolveMismatches'),
}
