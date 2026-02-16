import httpClient from './httpClient'
import { sanitizeObject } from '../utils/sanitize'

export default {
  register: async (userData) => {
    localStorage.clear()
    const response = await httpClient.request('/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify(userData)
    })

    console.log('[DEBUG] Register Response:', JSON.stringify(response.data, null, 2))

    // API returns { error, message, data: { user, token } }
    const payload = response.data?.data
    if (payload?.token) {
      const sanitizedToken = String(payload.token).replace(/[<>"'&]/g, '')
      localStorage.setItem('token', sanitizedToken)
      const sanitizedUser = sanitizeObject(payload.user)
      if (sanitizedUser) {
        localStorage.setItem('user', JSON.stringify(sanitizedUser))
      }
    }
    return response
  },

  login: async (credentials) => {
    localStorage.clear()
    const response = await httpClient.request('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })

    console.log('[DEBUG] Login Response Body Keys:', Object.keys(response.data || {}))
    console.log('[DEBUG] Token Present:', !!response.data?.data?.token)

    // API returns { error, message, data: { user, token } }
    const payload = response.data?.data
    if (payload?.token) {
      const sanitizedToken = String(payload.token).replace(/[<>"'&]/g, '')
      localStorage.setItem('token', sanitizedToken)
      const userObj = payload.user || payload.admin
      const sanitizedUser = sanitizeObject(userObj)
      if (sanitizedUser) {
        localStorage.setItem('user', JSON.stringify(sanitizedUser))
      }
    }
    return response
  },

  adminLogin: async (credentials) => {
    localStorage.clear()
    const response = await httpClient.request('/auth/admin/login/', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })

    const payload = response.data?.data
    if (payload?.token) {
      const sanitizedToken = String(payload.token).replace(/[<>"'&]/g, '')
      localStorage.setItem('token', sanitizedToken)
      const userObj = payload.user || payload.admin
      const sanitizedUser = sanitizeObject(userObj)
      if (sanitizedUser) {
        localStorage.setItem('user', JSON.stringify(sanitizedUser))
      }
    }
    return response
  },

  getProfile: () => httpClient.request('/user/'),

  getAdminProfile: () => httpClient.request('/admin/'),

  updateProfile: (profileData) => httpClient.request('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData)
  }),

  forgotPassword: (email) => httpClient.request('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email })
  }),

  resetPassword: (token_hash, password) => httpClient.request('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token_hash, password })
  })
}