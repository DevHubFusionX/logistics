import httpClient from './httpClient'

/**
 * Admin Service
 *
 * Backend admin manager endpoints:
 *   POST /admin/managers  — create a manager
 *   GET  /admin/managers  — fetch all managers
 *
 * NOTE: There is no PUT/DELETE /admin/managers/:id endpoint on the backend.
 */
const adminService = {
  /**
   * Create a new manager.
   * @param {Object} managerData - { firstName, lastName, email, phone, password }
   */
  createManager: (managerData) => httpClient.request('/admin/managers', {
    method: 'POST',
    body: JSON.stringify(managerData)
  }),

  /**
   * Fetch all managers.
   * @param {Object} params - Pagination and filter parameters.
   */
  getManagers: (params = {}) => httpClient.request('/admin/managers', {
    method: 'GET'
  }, params),
}

export default adminService
