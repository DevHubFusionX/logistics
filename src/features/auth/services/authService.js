import httpClient from '../../../services/httpClient'

/**
 * Authentication Service
 * Pure API layer for auth-related requests
 *
 * Backend endpoints:
 *   POST /auth/sign-up                — user registration
 *   POST /auth/login                  — user login
 *   POST /auth/admin/login            — admin login
 *   POST /auth/admin/managers/login   — manager login
 *   GET  /user/                       — get user profile (USER JWT)
 *   GET  /admin/                      — get admin profile (ADMIN|MANAGER JWT)
 *   POST /auth/send-verification-email — resend verification link
 *
 * NOT implemented on backend (coming soon):
 *   PUT  /users/profile               — update profile
 *   POST /auth/forgot-password        — password reset
 *   POST /auth/reset-password         — password reset
 *   POST /auth/verify-otp             — generic OTP (only driver OTP exists)
 *   POST /auth/resend-otp             — generic OTP resend
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

  managerLogin: (credentials) => httpClient.request('/auth/admin/managers/login/', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),

  getProfile: () => httpClient.request('/user/'),

  getAdminProfile: () => httpClient.request('/admin/'),

  resendVerificationLink: (email) => httpClient.request('/auth/send-verification-email', {
    method: 'POST',
    body: JSON.stringify({ email })
  }),

  // ─── Coming Soon (no backend endpoint yet) ───────────────────────

  updateProfile: () => {
    throw new Error('updateProfile is not implemented — no backend endpoint exists yet.')
  },

  forgotPassword: () => {
    throw new Error('forgotPassword is not implemented — no backend endpoint exists yet.')
  },

  resetPassword: () => {
    throw new Error('resetPassword is not implemented — no backend endpoint exists yet.')
  },

  verifyOTP: () => {
    throw new Error('verifyOTP is not implemented — backend only has driver-specific OTP via POST /auth/drivers/verify-otp.')
  },

  resendOTP: () => {
    throw new Error('resendOTP is not implemented — backend only has driver-specific OTP via POST /auth/drivers/resend-otp.')
  },
}