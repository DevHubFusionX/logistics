import httpClient from './httpClient'

const paymentService = {
  // Initialize payment with backend - returns Paystack authorization URL
  initializePayment: (bookingId) => {
    console.log('Initializing payment for booking:', bookingId)
    return httpClient.request(`/payment/initialize/${bookingId}`, {
      method: 'GET'
    })
  },

  initiatePayment: (paymentData) => 
    httpClient.request('/payments/initiate', {
      method: 'POST',
      body: JSON.stringify(paymentData)
    }),


  verifyPayment: (bookingId) => 
    httpClient.request(`/payment/booking/verify/${bookingId}`, {
      method: 'GET'
    }),

  submitBankTransfer: (transferData) => 
    httpClient.request('/payments/bank-transfer', {
      method: 'POST',
      body: JSON.stringify(transferData)
    }),

  confirmCashPayment: (bookingId) => 
    httpClient.request('/payments/cash', {
      method: 'POST',
      body: JSON.stringify({ bookingId })
    }),

  payWithWallet: (bookingId, amount) => 
    httpClient.request('/payments/wallet', {
      method: 'POST',
      body: JSON.stringify({ bookingId, amount })
    }),

  getWalletBalance: () => 
    httpClient.request('/user/wallet'),

  // Receipt & Invoice
  downloadReceipt: (paymentId) => 
    httpClient.request(`/payments/${paymentId}/receipt`, {
      responseType: 'blob'
    }),

  emailReceipt: (paymentId, email) => 
    httpClient.request(`/payments/${paymentId}/receipt/email`, {
      method: 'POST',
      body: JSON.stringify({ email })
    }),

  generateInvoice: (bookingId) => 
    httpClient.request(`/payments/invoice/${bookingId}`, {
      responseType: 'blob'
    }),

  emailInvoice: (bookingId, email) => 
    httpClient.request(`/payments/invoice/${bookingId}/email`, {
      method: 'POST',
      body: JSON.stringify({ email })
    }),

  // Refunds
  requestRefund: (paymentId, reason) => 
    httpClient.request('/payments/refund/request', {
      method: 'POST',
      body: JSON.stringify({ paymentId, reason })
    }),

  getRefundStatus: (refundId) => 
    httpClient.request(`/payments/refund/${refundId}`),

  // Payment History
  getPaymentHistory: (params = { limit: 50, page: 1 }) => 
    httpClient.request('/payments/history', {}, params),

  getPaymentDetails: (paymentId) => 
    httpClient.request(`/payments/${paymentId}`)
}

export default paymentService
