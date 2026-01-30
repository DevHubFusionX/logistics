import httpClient from './httpClient'
import { sanitizeObject } from '../utils/sanitize'

export default {
  register: async (userData) => {
    localStorage.clear()
    const response = await httpClient.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    })

    console.log('[DEBUG] Register Response:', JSON.stringify(response.data, null, 2))

    if (response.data?.token) {
      const sanitizedToken = String(response.data.token).replace(/[<>"'&]/g, '')
      localStorage.setItem('token', sanitizedToken)
      const sanitizedUser = sanitizeObject(response.data.user)
      localStorage.setItem('user', JSON.stringify(sanitizedUser))
    }
    return response
  },

  login: async (credentials) => {
    localStorage.clear()
    const response = await httpClient.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })

    console.log('[DEBUG] Login Response Body Keys:', Object.keys(response.data || {}))
    console.log('[DEBUG] Token Present:', !!response.data?.token)

    if (response.data?.token) {
      const sanitizedToken = String(response.data.token).replace(/[<>"'&]/g, '')
      localStorage.setItem('token', sanitizedToken)
      const sanitizedUser = sanitizeObject(response.data.user)
      localStorage.setItem('user', JSON.stringify(sanitizedUser))
    }
    return response
  },

  getProfile: () => httpClient.request('/users/profile'),

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