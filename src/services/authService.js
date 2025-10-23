import httpClient from './httpClient'

class AuthService {
  async register(userData) {
    localStorage.clear();
    
    const response = await httpClient.request('/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
    
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    
    return response
  }

  async login(credentials) {
    localStorage.clear();
    
    const response = await httpClient.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
    
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    
    return response
  }

  async getProfile() {
    return httpClient.request('/user/')
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