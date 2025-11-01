import httpClient from './httpClient'
import { sanitizeObject } from '../utils/sanitize'

export default {
  register: async (userData) => {
    localStorage.clear()
    const response = await httpClient.request('/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token)
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
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token)
      const sanitizedUser = sanitizeObject(response.data.user)
      localStorage.setItem('user', JSON.stringify(sanitizedUser))
    }
    return response
  },

  getProfile: () => httpClient.request('/user/'),

  forgotPassword: (email) => httpClient.request('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email })
  }),

  resetPassword: (token, password) => httpClient.request('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, password })
  })
}