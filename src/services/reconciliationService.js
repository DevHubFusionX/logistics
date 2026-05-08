import httpClient from './httpClient'

export default {
  getDashboard: (params = {}) => httpClient.request('/reconciliation/dashboard', {}, params),
  getRecords: (params = {}) => httpClient.request('/reconciliation/records', {}, params),
  getMismatches: (params = {}) => httpClient.request('/reconciliation/mismatches', {}, params),
  resolveMismatch: (recordId, resolutionData) => {
    if (!recordId) throw new Error('recordId is required')
    return httpClient.request(`/reconciliation/mismatches/${encodeURIComponent(recordId)}/resolve`, {
      method: 'POST',
      body: JSON.stringify(resolutionData)
    })
  },
  runReconciliation: (reconciliationData) => httpClient.request('/reconciliation/run', {
    method: 'POST',
    body: JSON.stringify(reconciliationData)
  }),
  getJobStatus: (jobId) => {
    if (!jobId) throw new Error('jobId is required')
    return httpClient.request(`/reconciliation/jobs/${encodeURIComponent(jobId)}`)
  },
  exportReport: (params = {}) => httpClient.request('/reconciliation/export', {}, params),
  getAnalytics: (params = {}) => httpClient.request('/reconciliation/analytics', {}, params),
  getUnreconciledRevenue: (params = {}) => httpClient.request('/reconciliation/unreconciled-revenue', {}, params),
  bulkResolveMismatches: (bulkData) => httpClient.request('/reconciliation/mismatches/bulk-resolve', {
    method: 'POST',
    body: JSON.stringify(bulkData)
  })
}
