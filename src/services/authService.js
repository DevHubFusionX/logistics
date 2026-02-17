import httpClient from './httpClient'

/**
 * Authentication Service
 * Pure API layer for auth-related requests
 */
export default {
  register: (userData) => httpClient.request('/auth/sign-up', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),

  login: (credentials) => httpClient.request('/auth/login/', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),

  adminLogin: (credentials) => httpClient.request('/auth/admin/login/', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),

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
  }),

  verifyOTP: (otp) => httpClient.request('/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify({ otp })
  }),

  resendOTP: (email) => httpClient.request('/auth/resend-otp', {
    method: 'POST',
    body: JSON.stringify({ email })
  })
}