import httpClient from './httpClient'

export default {
  initiatePayment: (paymentData) => httpClient.request('/payments/initiate', {
    method: 'POST',
    body: JSON.stringify(paymentData)
  }),

  verifyPayment: (reference) => httpClient.request('/payments/verify', {
    method: 'POST',
    body: JSON.stringify({ reference })
  }),

  payWithWallet: (bookingId) => httpClient.request('/payments/wallet', {
    method: 'POST',
    body: JSON.stringify({ bookingId })
  }),

  getWalletBalance: () => httpClient.request('/user/wallet')
}
