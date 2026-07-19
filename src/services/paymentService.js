import httpClient from './httpClient'

/**
 * Payment Service
 *
 * Backend only exposes three payment endpoints (all under /api/v1/payment/):
 *   GET  /payment/initialize/:bookingId       — get Paystack authorization URL
 *   GET  /payment/booking/verify/:bookingId   — verify payment status for a booking
 *   POST /payment/webhook                     — Paystack webhook (internal, not called by frontend)
 *
 * All other payment features (wallet, bank transfer, cash, receipts, invoices,
 * refunds, payment history) are NOT implemented on the backend.
 */
const paymentService = {
  // GET /payment/initialize/:bookingId
  // Returns { authorizationUrl, reference } to redirect user to Paystack
  initializePayment: (bookingId) =>
    httpClient.request(`/payment/initialize/${encodeURIComponent(bookingId)}`, {
      method: 'GET'
    }),

  // GET /payment/booking/verify/:bookingId
  // Returns payment status for a booking
  verifyPayment: (bookingId) =>
    httpClient.request(`/payment/booking/verify/${encodeURIComponent(bookingId)}`, {
      method: 'GET'
    }),
}

export default paymentService
