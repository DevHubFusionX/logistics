const BASE_URL = 'https://dera-api.onrender.com/api/v1'

class HttpClient {
  async request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`
    const token = localStorage.getItem('token')
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.msg || 'Request failed')
      }
      
      return data
    } catch (error) {
      throw error
    }
  }
}

export default new HttpClient()