import httpClient from './httpClient'

/**
 * Admin Service for managing administrative tasks, users, and system configurations.
 */
const adminService = {
    /**
     * Create a new manager.
     * @param {Object} managerData - { firstName, lastName, email, phone, password, address, companyName, clientCategory, verified }
     * @returns {Promise} API Response
     */
    createManager: (managerData) => httpClient.request('/admin/managers', {
        method: 'POST',
        body: JSON.stringify(managerData)
    }),

    /**
     * Fetch all managers.
     * @param {Object} params - Pagination and filter parameters.
     * @returns {Promise} API Response
     */
    getManagers: (params = {}) => httpClient.request('/admin/managers', {
        method: 'GET'
    }, params),

    /**
     * Update an existing manager.
     * @param {string} id - Manager ID.
     * @param {Object} data - Update data.
     */
    updateManager: (id, data) => httpClient.request(`/admin/managers/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    }),

    /**
     * Delete a manager.
     * @param {string} id - Manager ID.
     */
    deleteManager: (id) => httpClient.request(`/admin/managers/${id}`, {
        method: 'DELETE'
    })
}

export default adminService
