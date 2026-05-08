import httpClient from './httpClient'

const validationService = {
  // Address validation
  validateAddress: (address) =>
    httpClient.request('/validation/address', {
      method: 'POST',
      body: JSON.stringify({ address })
    }),

  // Geocode address
  geocodeAddress: (address) =>
    httpClient.request('/validation/geocode', {
      method: 'POST',
      body: JSON.stringify({ address })
    }),

  // Calculate distance
  calculateDistance: (origin, destination) =>
    httpClient.request('/validation/distance', {
      method: 'POST',
      body: JSON.stringify({ origin, destination })
    }),

  // Phone number validation
  validatePhone: (phone, country = 'NG') =>
    httpClient.request('/validation/phone', {
      method: 'POST',
      body: JSON.stringify({ phone, country })
    }),

  // Email validation
  validateEmail: (email) =>
    httpClient.request('/validation/email', {
      method: 'POST',
      body: JSON.stringify({ email })
    })
}

export default validationService
