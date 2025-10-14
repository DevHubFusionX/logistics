import httpClient from './httpClient'

class AuthService {
  async register(userData) {
    return httpClient.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async login(credentials) {
    return httpClient.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }

  async getProfile() {
    return httpClient.request('/auth/me')
  }

  async forgotPassword(email) {
    return httpClient.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }

  async resetPassword(token, password) {
    return httpClient.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    })
  }
}

export default new AuthService()